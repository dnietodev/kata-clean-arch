import { User } from "../domain/user.js";
import { Email } from "../domain/value-objects/email.js";
import { Password } from "../domain/value-objects/password.js";
import type { AddUser } from "../use-cases/add-user.js";
import type { GetUsers } from "../use-cases/get-users.js";

export interface UserData {
    name: string;
    email: string;
    password: string;
}

export class UsersPresenter {

    private readonly addUserUseCase: AddUser;
    private readonly getUsersUseCase: GetUsers;
    private readonly view: View;

    constructor(view: View, addUserUseCase: AddUser, getUsersUseCase: GetUsers) {
        this.view = view;
        this.addUserUseCase = addUserUseCase;
        this.getUsersUseCase = getUsersUseCase;
    }

    public async initialize(): Promise<void> {
        await this.getAllUsers();
        while (true) {
            await this.createUser();
            await this.getAllUsers();
        }
    }

    private async createUser(): Promise<void> {
        const userData = await this.view.askForUserData();
        await this.addUserUseCase.execute(new User({
            name: userData.name,
            email: new Email(userData.email),
            password: new Password(userData.password),
        }));
    }

    private async getAllUsers(): Promise<void> {
        const users = await this.getUsersUseCase.execute();
        await this.view.showAllUsers(users);
    }

}

export interface View {
    showAllUsers(users: User[]): Promise<void>;
    askForUserData(): Promise<UserData>;
}