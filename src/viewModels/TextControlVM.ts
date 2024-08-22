import {action, computed, makeObservable, observable} from "mobx";
import {ButtonProps} from "../components/Button";

class TextControlVM {

    constructor() {
        makeObservable(this);
    }

    /** Текст первого инпута */
    @observable public text: string = '';

    /** сеттер для текста инпута */
    @action.bound
    onTextChange(value: string) {
        this.text = value;
    }

    /** Очистка текста */
    @action.bound
    onClearText() {
        this.text = '';
    }

    /** Замена текста на 'Hello world!' */
    @action.bound
    onHelloWorld() {
        this.text = 'Hello world!';
    }

    /** Alert с текстом */
    @action.bound
    onAlertText() {
        alert(this.text);
    }

    /** Если текст число, выводим его в alert */
    @action.bound
    onAlertIfNumber() {
        Number(this.text) && alert(+this.text);
    }
}

export default TextControlVM