import { describe, it, expect } from 'vitest';

import { Password } from './password.js';

describe('Password', () => {
    it('creates a valid password', () => {
        const password = new Password('Valid123');

        expect(password.getValue()).toBe('Valid123');
    });

    const wrongPasswords = [
        'short',
        'nouppercase1',
        'NOLOWERCASE1',
        'NoNumber',
        '',
    ];

    it.each(wrongPasswords)('rejects invalid password: %s', (password) => {
        expect(() => new Password(password)).toThrow(
            'Invalid password.',
        );
    });
});
