export class Email {
    private readonly email: string;
    private static emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    constructor(email: string) {
        if (!this.isValid(email)) {
            throw new Error('Invalid email address');
        }
        this.email = email;
    }

    private isValid(email: string): boolean {
        return Email.emailRegex.test(email);
    }

    public getValue(): string {
        return this.email;
    }

    public equals(other: Email): boolean {
        return this.email === other.getValue();
    }
}
