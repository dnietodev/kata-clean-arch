import { InMemoryUserRepository } from "./data/in-memory-user.repository.js";
import { AddUser } from "./use-cases/add-user.js";
import { GetUsers } from "./use-cases/get-users.js";

export class CompositionRoot {
    private instances = new Map<string, any>();
    private repository = new InMemoryUserRepository();

    constructor() {
        this.instances.set('getUsersUseCase', new GetUsers(this.repository));
        this.instances.set('addUserUseCase', new AddUser(this.repository));
    }

    get<T>(key: string): T {
        const instance = this.instances.get(key);
        if (!instance) {
            throw new Error(`No instance found for key: ${key}`);
        }
        return instance as T
    }

}