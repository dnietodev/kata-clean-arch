import type { UserRepository } from "../domain/user.repository.js";
import { Email } from "../domain/value-objects/email.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { User } from "../domain/user.js";
import { Password } from "../domain/value-objects/password.js";

type StoredUser = {
    id: string;
    name: string;
    email: string;
    password: string;
};

type UsersDatabase = {
    users?: StoredUser[] | Record<string, StoredUser>;
};

export class DBJSONUserRepository implements UserRepository {
    private readonly filePath: string;

    constructor() {
        this.filePath = "users.json"
    }

    async add(user: User): Promise<void> {
        const database = await this.readDatabase();
        database.users.push(this.toStoredUser(user));
        await this.writeDatabase(database);
    }

    async findAll(): Promise<User[]> {
        const database = await this.readDatabase();
        return database.users.map((user) => this.toDomainUser(user));
    }

    async findByEmail(email: Email): Promise<User | null> {
        const database = await this.readDatabase();
        const user = database.users.find((user) => user.email === email.value);
        return user ? this.toDomainUser(user) : null;
    }

    private async readDatabase(): Promise<{ users: StoredUser[] }> {
        try {
            const content = await readFile(this.filePath, "utf-8");
            const database = JSON.parse(content) as UsersDatabase;
            const users = database.users ?? [];

            return {
                users: Array.isArray(users) ? users : Object.values(users),
            };
        } catch (error) {
            if (this.isFileNotFoundError(error)) {
                return { users: [] };
            }

            throw error;
        }
    }

    private async writeDatabase(database: { users: StoredUser[] }): Promise<void> {
        await mkdir(dirname(resolve(this.filePath)), { recursive: true });
        await writeFile(this.filePath, JSON.stringify(database, null, 2), "utf-8");
    }

    private toStoredUser(user: User): StoredUser {
        return {
            id: user.id,
            name: user.name,
            email: user.email.value,
            password: user.password.value,
        };
    }

    private toDomainUser(user: StoredUser): User {
        const domainUser = new User({
            id: user.id,
            name: user.name,
            email: new Email(user.email),
            password: new Password(user.password),
        });
        return domainUser;
    }

    private isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
        return error instanceof Error && "code" in error && error.code === "ENOENT";
    }
}
