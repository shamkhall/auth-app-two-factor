import User from "./entities/user.entity";
import {compare, hash} from 'bcrypt';
import {sign, verify} from "jsonwebtoken";
import {config} from "../config/config";

export class AuthService {
    public static async getAll() {
        return User.find();
    }

    public static async getUser (token: string) {
        if (!token || token === '') {
            return null;
        }
        let decodedToken;
        try {
            decodedToken = verify(token, config.JWT_SECRET_KEY);
        } catch {
            return null;
        }
        if (!decodedToken) {
            return null;
        }
        return decodedToken;
    }

    public static async create({user}) {
        try {
            const existingUser = await User.findOne({email: user.email});
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await this.hashPass(user.password);

            const newUser = new User({
                email: user.email,
                password: hashedPassword
            });

            await newUser.save();

            return true;
        } catch (err) {
            throw err;
        }
    }

    public static async changePassword({user}): Promise<boolean> {
        try {
            const hashedPassword = await this.hashPass(user.newPassword);

            await User.updateOne({id: user.userId}, {
                password: hashedPassword
            });
            return true;
        }
        catch (err){
            console.log('error update', err)
        }
    }

    public static async hashPass (password) {
        return await hash(password, 12)
    }

    public static async login ({user}) {
        const userByEmail: any = await User.findOne({ email: user.email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await compare(user.password, userByEmail.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = sign(
            { userId: userByEmail.id, email: userByEmail.email },
            config.JWT_SECRET_KEY,
            {
                expiresIn: config.JWT_EXPIRE
            }
        );
        return { userId: userByEmail.id, token: token };
    }
}
