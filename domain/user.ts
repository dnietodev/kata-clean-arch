import { Email } from "./value-objects/email.js";
import { Password } from "./value-objects/password.js";

class User {
    private name: string;
    private email: Email;
    private password: Password;

    constructor(name: string, email: string, password: string) {
        this.id = ;
        this.name = name;
        this.email = new Email(email);
        this.password = new Password(password);
    }
}