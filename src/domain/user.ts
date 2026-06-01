import { Email } from "./value-objects/email.js";
import { Password } from "./value-objects/password.js";

export class User {
    private id: string;
    private name: string;
    private email: Email;
    private password: Password;

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