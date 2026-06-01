import { describe, expect, it } from 'vitest';

import { Email } from './email.js';

describe('Email', () => {
    it('creates a valid email', () => {
        const email = new Email('user@example.com');

        expect(email.getValue()).toBe('user@example.com');
    });

    it('rejects an invalid email', () => {
        expect(() => new Email('invalid-email')).toThrow('Invalid email address');
    });

    it('compares emails by value', () => {
        const email = new Email('user@example.com');
        const sameEmail = new Email('user@example.com');
        const otherEmail = new Email('other@example.com');

        expect(email.equals(sameEmail)).toBe(true);
        expect(email.equals(otherEmail)).toBe(false);
    });
});
