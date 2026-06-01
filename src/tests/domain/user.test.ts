import { describe, expect, it } from 'vitest';

import { User } from '../../domain/user.js';

describe('User', () => {
	it('creates a user with valid email and password', () => {
		expect(() => new User('Pablo', 'user@example.com', 'Valid123')).not.toThrow();
	});

	it('rejects user creation with an invalid email', () => {
		expect(() => new User('Pablo', 'invalid-email', 'Valid123')).toThrow('Invalid email address');
	});

	it('rejects user creation with an invalid password', () => {
		expect(() => new User('Pablo', 'user@example.com', 'weak')).toThrow('Invalid password.');
	});

	it('compares the same instance as equal', () => {
		const user = new User('Pablo', 'user@example.com', 'Valid123');

		expect(user.equals(user)).toBe(true);
	});

	it('compares different users as not equal even with same input data', () => {
		const first = new User('Pablo', 'user@example.com', 'Valid123');
		const second = new User('Pablo', 'user@example.com', 'Valid123');

		expect(first.equals(second)).toBe(false);
	});
});
