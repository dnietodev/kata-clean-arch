export class Password {
    public readonly value: string;
    private valueRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid password.');
        }
        this.value = value;
    }

    private isValid(password: string): boolean {
        return this.valueRegex.test(password);
    }


    public getValue(): string {
        return this.value;
    }

    public equals(other: Password): boolean {
        return this.value === other.value;
    }
}
