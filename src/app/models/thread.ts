export class Thread {
    Id: number;
    Title: string;
    Content: string;
    DateCreated: Date;
    Creator: string;

    constructor(title: string, content: string) {
        this.Title = title;
        this.Content = content;
    }
}
