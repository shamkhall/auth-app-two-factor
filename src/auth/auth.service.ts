import UserSchema from "./entities/user.entity";
import * as crypto from 'crypto';

export class AuthService {
    public static async getAll () {
        return UserSchema.find();
    }

    public static async create (): Promise<boolean> {
        await UserSchema.create({email: crypto.randomUUID(), password: 'pass'});
        return true;
    }
}
