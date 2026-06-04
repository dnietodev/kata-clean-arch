import { createInterface } from "node:readline/promises";
import type { UserData, View } from "./users-presenter.js";
import type { User } from "../domain/user.js";
import { stdin as input, stdout as output } from "node:process";

export class UsersView implements View {

    private readonly rl = createInterface({ input, output });

    constructor() {

    }

    async showAllUsers(users: User[]): Promise<void> {
        console.log("Users:");
        if (users.length === 0) {
            console.log("No users found.");
            return;
        }
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email.value})`);
        });
    }

    async askForUserData(): Promise<UserData> {
        console.log("Enter user data:");
        const name = await this.rl.question("Name: ");
        const email = await this.rl.question("Email: ");
        const password = await this.rl.question("Password: ");
        return { name, email, password };
    }
}