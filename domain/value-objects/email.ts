export class Email {
    private readonly email: string;
    private static emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    constructor(email: string) {
        if (!Email.emailRegex.test(email)) {
            throw new Error('Invalid email address');
        }
        this.email = email;
    }

    public getValue(): string {
        return this.email;
    }

    public equals(other: Email): boolean {
        return this.email === other.getValue();
    }
}
