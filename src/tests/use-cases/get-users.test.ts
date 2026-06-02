
import { User } from "../../domain/user.js";
import type { UserRepository } from "../../domain/user.repository.js";

import { describe, expect, it, beforeEach, vi } from 'vitest';
import { GetUsers } from "../../use-cases/get-users.js";

describe("GetUsersUseCase", () => {
    const mockRepository: UserRepository = {
        add: vi.fn(),
        findAll: vi.fn(),
        findByEmail: vi.fn(),
    };
    const user1 = new User("John Doe", "john.doe@example.com", "Password123");
    const user2 = new User("Jane Doe", "jane.doe@example.com", "Password123");
    const getUsersUseCase = new GetUsers(mockRepository);

    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("should not return any users if the repository is empty", async () => {
        mockRepository.findAll = vi.fn().mockResolvedValue([]);
        const users = await getUsersUseCase.execute();
        expect(users).toEqual([]);
    });

    it("should return all users from the repository", async () => {
        mockRepository.findAll = vi.fn().mockResolvedValue([user1, user2]);
        const users = await getUsersUseCase.execute();
        expect(users).toEqual([user1, user2]);
    });
})