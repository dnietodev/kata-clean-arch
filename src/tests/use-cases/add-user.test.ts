
import { User } from "../../domain/user.js";
import type { UserRepository } from "../../domain/user.repository.js";
import { AddUser } from "../../use-cases/add-user.js";
import { describe, expect, it, beforeEach, vi } from 'vitest';

describe("AddUserUseCase", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    const mockRepository: UserRepository = {
        add: vi.fn(),
        findAll: vi.fn(),
        findByEmail: vi.fn(),
    };
    const user = new User("John Doe", "john.doe@example.com", "Password123");
    const addUserUseCase = new AddUser(mockRepository);

    it("should add a user to the repository when the email does not exist", async () => {
        mockRepository.findByEmail = vi.fn().mockResolvedValue(null);
        mockRepository.add = vi.fn().mockResolvedValue(user);
        await addUserUseCase.execute(user);

        expect(mockRepository.add).toHaveBeenCalledWith(user);
    })

    it("should not add a user to the repository if the email is already in use", async () => {
        mockRepository.findByEmail = vi.fn().mockResolvedValue(user);
        await expect(addUserUseCase.execute(user)).rejects.toThrow("Email already in use");
    })
})