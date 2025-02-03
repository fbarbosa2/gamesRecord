import { getAuth } from 'firebase-admin/auth';
import bycrypt from 'bcryptjs';

const createUser = async (email, password, confirmPassword) => {
    try {
        if (!validateEmail(email)) {
            throw new Error('Invalid email');
        }
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        const hash = encryptPassword(password);
        const auth = getAuth();
        const user = await auth.createUser({
            email,
            hash,
        });
        return user;
    } catch (error) {
        throw error;
    }
};

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function encryptPassword(password) {
    const salt = bycrypt.genSalt(process.env.SALT_ROUNDS);
    bcrypt.genSalt(saltRounds, (err) => {
        if (err) {
            throw new Error('Error generating salt');
        }
    });
    bcrypt.hash(password, salt, (err) => {
        if (err) {
            throw new Error('Error hashing password');
        }
    });

    return hash;
}

export default createUser;