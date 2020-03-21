import { Component, Input, OnInit } from '@angular/core';

export interface Q {

    letter: string;
    
    answers: string[]
};

@Component({
    selector: 'app-interrogation',
    templateUrl: './interrogation.component.html',
    styleUrls: ['./interrogation.component.css']
})
export class InterrogationComponent implements OnInit {

    public fileLocation: string = "assets/images/";

    @Input() public isFile: boolean;

    @Input() public quizzName: string;

    @Input() public urls: string[];

    @Input() public questions: Q[] = null;

    /*
     * Names of the letters should be like so:
     *     if the letter is writtable in latin as "a" "ae" or "e",
     *     then its name should be "a_ae_e.***"
     */

    public currentQuestionIndex: number;

    public userAnswer: string = "write here";

    public actualAnswer: string;

    public errors: number = 0;

    public attempts: number = 0;

    public remainingQuestions: Q[];

    public finished: boolean = false;

    public ngOnInit() {
        if (this.isFile === true) {
            if (this.urls == null) throw new Error("If isFile=true, you must provide urls");
            this.remainingQuestions = this.mapLettersUrlToDico(this.urls);
        } else if (this.isFile === false) {
            if (this.questions == null) throw new Error("If isFile=false, you must provide questions");
            this.remainingQuestions = this.questions;
        } else {
            throw new Error("Missing input 'isFile'");
        }
        this.tryChangeQuestion(-1);
    }
    public mapLettersUrlToDico(lettersUrl: string[]): Q[] {
        const result: Q[] = [];
        for (let letter of lettersUrl) {
            let answers: string[] = letter.split('.')[0].split('_');
            result.push({letter, answers});
        }
        return result;
    }
    public submitAnswer() {
        if (this.userAnswer == null || this.userAnswer == "") {
            throw new Error("there should be an answer");
        } else {
            this.attempts++;
            if (this.isCorrectAnswer()) {
                this.removeCurrentQuestion()
                this.tryChangeQuestion(-1);
            } else {
                this.errors++;
                this.showAnswer();
            }
        }
    }
    public isCorrectAnswer() {
        const answers: string[] = this.remainingQuestions[this.currentQuestionIndex].answers;
        return answers.includes(this.userAnswer);
    }
    public tryChangeQuestion(excluding: number) {
        if (this.remainingQuestions.length === 0) {
            this.finished = true;
        } else {
            this.currentQuestionIndex = this.getNewIndex(excluding);
            this.userAnswer = "";
        }
    }
    public getNewIndex(excluding: number): number {
        if (this.remainingQuestions.length === 1) return 0;
        const index = Math.floor(Math.random() * this.remainingQuestions.length);
        if (index === excluding) return this.getNewIndex(excluding);
        else return index;
    }
    public showAnswer() {
        const answers: string[] = this.remainingQuestions[this.currentQuestionIndex].answers;
        this.actualAnswer = "The answer was: " + answers.join(" or ");
    }
    public seeAnswer() {
        this.actualAnswer = "";
        this.tryChangeQuestion(this.currentQuestionIndex);
    }
    public removeCurrentQuestion() {
        this.remainingQuestions = this.removeQuestion(this.remainingQuestions, this.currentQuestionIndex);
    }
    public removeQuestion(questions: Q[], index: number): Q[] {
        const before: Q[] = questions.slice(0, index);
        const after: Q[] = questions.slice(index + 1);
        return before.concat(after);
    }
}