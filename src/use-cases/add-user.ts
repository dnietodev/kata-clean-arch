import type { User } from "../domain/user.js";
import type { UserRepository } from "../domain/user.repository.js";
import type { UseCase } from "./use-case.js";


export class AddUser implements UseCase<User> {
    private readonly repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }
    async execute(user: User): Promise<User> {
        const existingUser = await this.repository.findByEmail(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        return this.repository.add(user);
    }

}