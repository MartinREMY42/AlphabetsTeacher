import { Component } from '@angular/core';
import { Q } from './interrogation/interrogation.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public userChosenAlphabet: string;

    public quizzName: string = "hangeul_as_alphabet/";

    public readonly hangeul_files: string[] = ["a.png", "ae.png", "b.png", "ch.png", "d.png", "eo.png", "eu.png", "g.png", "h.png", "i.png",
        "j.png", "k.png", "m.png", "n.png", "o.png", "p.png", "r.png", "s.png", "t.png", "u.png",
        "voyelle.png", "ya.png", "yeo.png", "yo.png", "yu.png"];
    public readonly russian_cyrillic_letters: Q[] = [
        this.Q('а', ['a', 'A']),
        this.Q('б', ['b', 'B']),
        this.Q('в', ['v', 'V']),
        this.Q('г', ['g', 'gu', 'G', 'GU']),
        this.Q('д', ['d', 'D']),
        this.Q('е', ['ié']),
        this.Q('ё', ['io']),
        this.Q('ж', ['j', 'J']),
        this.Q('з', ['z', 'Z']),
        this.Q('и', ['i', 'I']),
        this.Q('й', ['ï', 'Ï']),
        this.Q('к', ['k', 'K']),
        this.Q('л', ['l', 'L']),
        this.Q('м', ['m', 'M']),
        this.Q('н', ['n', 'N']),
        this.Q('о', ['o', 'O']),
        this.Q('п', ['p', 'P']),
        this.Q('р', ['r', 'R']),
        this.Q('с', ['s', 'S']),
        this.Q('т', ['t', 'T']),
        this.Q('у', ['ou']),
        this.Q('ф', ['f', 'F']),
        this.Q('х', ['g doux']),
        this.Q('ц', ['ts']),
        this.Q('ч', ['tch']),
        this.Q('ш', ['ch']),
        this.Q('щ', ['chtch']),
        this.Q('ъ', ['signe dur', 'vélarisation']),
        this.Q('ы', ['i tendu']),
        this.Q('ь', ['signe mou', 'palatalisation']),
        this.Q('э', ['è', 'È']),
        this.Q('ю', ['iou', 'you']),
        this.Q('я', ['ia', 'ya']),
    ];
    public readonly hangeul_letters: Q[] = [
        this.Q('ㅂ', ['b', 'B']),
        this.Q('ㅈ', ['j', 'J']),
        this.Q('ㄷ', ['d', 'D']),
        this.Q('ㄱ', ['g', 'G']),
        this.Q('ㅅ', ['s', 'S']),
        this.Q('ㅛ', ['yo', 'YO']),
        this.Q('ㅕ', ['yeo', 'YEO']),
        this.Q('ㅑ', ['ya', 'YA']),
        this.Q('ㅐ', ['ae', 'AE']),
        this.Q('ㅔ', ['e', 'E']),
        this.Q('ㅁ', ['m', 'M']),
        this.Q('ㄴ', ['n', 'N']),
        this.Q('ㅇ', ['voyelle', 'vowel']),
        this.Q('ㄹ', ['r', 'R', 'l', 'L']),
        this.Q('ㅎ', ['h', 'H']),
        this.Q('ㅗ', ['o', 'O']),
        this.Q('ㅓ', ['eo', 'EO']),
        this.Q('ㅏ', ['a', 'A']),
        this.Q('ㅣ', ['i', 'I']),
        this.Q('ㅋ', ['k', 'K']),
        this.Q('ㅌ', ['t', 'T']),
        this.Q('ㅊ', ['ch', 'CH']),
        this.Q('ㅍ', ['p', 'P']),
        this.Q('ㅠ', ['yu', 'YU']),
        this.Q('ㅜ', ['u', 'U']),
        this.Q('ㅡ', ['eu', 'EU']),
    ];
    public constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.userChosenAlphabet = params.alphabet;
            let result: string;
            switch (this.userChosenAlphabet) {
                case "hangeul_as_alphabet":
                case "hangeul":
                    result = "hangeul_as_alphabet";
                    break;
                case "cyrillic":
                case "russian":
                case "russian_cyrillic":
                    result = "russian_cyrillic"
                    break;
                default:
                    result = "hangeul";
                    break;
            }
            this.quizzName = result;
        });
    }
    private Q(letter: string, answers: string[]): Q {
        return { letter, answers };
    }
}