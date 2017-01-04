export class Message {
    text: string;
    isError: boolean;

    constructor(text: string, isError: boolean = false) {
        this.text = text;
        this.isError = isError
    }
}
