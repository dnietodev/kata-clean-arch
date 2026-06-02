import type { User } from "../domain/user.js";
import type { UserRepository } from "../domain/user.repository.js";
import type { Email } from "../domain/value-objects/email.js";

export class InMemoryUserRepository implements UserRepository {

    private users: User[] = [];

    async add(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: Email): Promise<User | null> {
        const user = this.users.find(user => user.email.equals(email));
        return Promise.resolve(user || null);
    }
}