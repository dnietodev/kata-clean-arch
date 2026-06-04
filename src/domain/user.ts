import { Email } from "./value-objects/email.js";
import { Password } from "./value-objects/password.js";


export interface UserProps {
    id?: string;
    name: string;
    email: Email;
    password: Password;
}

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: Email;
    public readonly password: Password;

    constructor(userProps: UserProps) {
        this.id = userProps.id || Date.now().toString() + Math.random().toString(36).substring(2);
        this.name = userProps.name;
        this.email = userProps.email;
        this.password = userProps.password;
    }


    public equals(other: User): boolean {
        return this.id === other.id;
    }

}