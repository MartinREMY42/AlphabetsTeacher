import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogationComponent, Q } from './interrogation.component';
import { Component, ViewChild } from '@angular/core';

describe('InterrogationComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [InterrogationComponent, TestHostComponent ],
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });
    it('Urls passed should finish mapped', () => {
        testHostComponent.interrogationComponent.isFile = true;
        testHostComponent.interrogationComponent.urls = ["a_e_i.svg", "l.phpLOL"];
        testHostFixture.detectChanges()

        const result: Q[] = testHostComponent.interrogationComponent.remainingQuestions;

        let expectedResult: Q[] = [
            { letter: "a_e_i.svg", answers: ["a", "e", "i"] },
            { letter: "l.phpLOL", answers: ["l"] }
        ];
        expect(result).toEqual(expectedResult);
    });
    it('Questions passed should just be transfered', () => {
        testHostComponent.interrogationComponent.isFile = false;
        testHostComponent.interrogationComponent.questions = [
            { letter: "a_e_i.svg", answers: ["a", "e", "i"] },
            { letter: "l.phpLOL", answers: ["l"] }
        ];
        testHostFixture.detectChanges()

        expect(testHostComponent.interrogationComponent.questions)
            .toEqual(testHostComponent.interrogationComponent.remainingQuestions);
    });
    it("Should remove correctly succeed questions", () => {
        const questions: Q[] = [
            { letter: "a", answers: [] },
            { letter: "b", answers: [] },
            { letter: "c", answers: [] }
        ];

        const result: Q[] = testHostComponent.interrogationComponent.removeQuestion(questions, 1);

        let expectedResult: Q[] = [
            { letter: "a", answers: [] },
            { letter: "c", answers: [] }
        ];
        expect(result).toEqual(expectedResult);
    });
    it("Not providing isFile should throw an error", () => {
        testHostComponent.interrogationComponent.isFile = null;
        expect(() => testHostFixture.detectChanges()).toThrowError("Missing input 'isFile'");
    });
    it("Not providing urls when isFile is true should throw an error", () => {
        testHostComponent.interrogationComponent.isFile = true;
        testHostComponent.interrogationComponent.urls = null;
        expect(() => testHostFixture.detectChanges()).toThrowError("If isFile=true, you must provide urls");
    });
    it("Not providing questions when isFile is false should throw an error", () => {
        testHostComponent.interrogationComponent.isFile = false;
        testHostComponent.interrogationComponent.urls = null;
        expect(() => testHostFixture.detectChanges()).toThrowError("If isFile=false, you must provide questions");
    });
    @Component({
        selector: `host-component`,
        template: `<app-interrogation></app-interrogation>`
    })
    class TestHostComponent {

        @ViewChild(InterrogationComponent, {static: true})
        public interrogationComponent: InterrogationComponent;
    }
});