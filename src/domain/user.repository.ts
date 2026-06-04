import type { User } from "./user.js";
import type { Email } from "./value-objects/email.js";

export interface UserRepository {
    add(user: User): Promise<void>;
    findAll(): Promise<User[]>;
    findByEmail(email: Email): Promise<User | null>;
}