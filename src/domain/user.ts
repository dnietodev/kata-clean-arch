import { Email } from "./value-objects/email.js";
import { Password } from "./value-objects/password.js";

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: Email;
    public readonly password: Password;

    constructor(name: string, email: string, password: string) {
        this.id = Date.now().toString() + Math.random().toString(36).substring(2);
        this.name = name;
        this.email = new Email(email);
        this.password = new Password(password);
    }

    public equals(other: User): boolean {
        return this.id === other.id;
    }

}