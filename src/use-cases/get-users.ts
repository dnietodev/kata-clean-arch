import type { User } from "../domain/user.js";
import type { UserRepository } from "../domain/user.repository.js";
import type { UseCase } from "./use-case.js";

export class GetUsers implements UseCase<User[]> {
    private readonly repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    execute(): Promise<User[]> {
        return this.repository.findAll();
    }
}