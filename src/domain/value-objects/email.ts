export class Email {
    public readonly value: string;
    private static emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    constructor(email: string) {
        if (!this.isValid(email)) {
            throw new Error('Invalid email address');
        }
        this.value = email;
    }

    private isValid(email: string): boolean {
        return Email.emailRegex.test(email);
    }

    public equals(other: Email): boolean {
        return this.value === other.value;
    }
}
