import { DBJSONUserRepository } from "./data/db-json-user.repository.js";
import { InMemoryUserRepository } from "./data/in-memory-user.repository.js";
import type { UserRepository } from "./domain/user.repository.js";
import { UsersPresenter } from "./presentation/users-presenter.js";
import { UsersView } from "./presentation/users-view.js";
import { AddUser } from "./use-cases/add-user.js";
import { GetUsers } from "./use-cases/get-users.js";

export type RepositoryType = 'InMemoryUserRepository' | 'DBJSONUserRepository';

export class CompositionRoot {
    private instances = new Map<string, any>();
    private repository: UserRepository;

    constructor(repositoryType: RepositoryType) {
        this.instances.set('InMemoryUserRepository', new InMemoryUserRepository());
        this.instances.set('DBJSONUserRepository', new DBJSONUserRepository());
        this.repository = this.instances.get(repositoryType) || (() => { throw new Error(`Repository type ${repositoryType} not found`) })();
        this.instances.set('getUsersUseCase', new GetUsers(this.repository));
        this.instances.set('addUserUseCase', new AddUser(this.repository));
    }


    buildPresenter(): UsersPresenter {
        const view = new UsersView();
        const presenter = new UsersPresenter(view, this.instances.get('addUserUseCase'), this.instances.get('getUsersUseCase'));
        return presenter;
    }

    get<T>(key: string): T {
        const instance = this.instances.get(key);
        if (!instance) {
            throw new Error(`No instance found for key: ${key}`);
        }
        return instance as T
    }

}