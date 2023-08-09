import User from "./entities/user.entity";
import {compare, hash} from 'bcrypt';
import {sign, verify} from "jsonwebtoken";
import {config} from "../config/config";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import {ForbiddenError, AuthenticationError} from "apollo-server-core";
import {errorHandler} from "../error/handle.error";

export class AuthService {
    public static async getAll() {
        return User.find();
    }

    public static async getUser (token: string) {
        let user = null;
        try {
            user = verify(token, config.JWT_SECRET_KEY);
        } catch {
            throw new ForbiddenError(
                'The user belonging to this token no logger exist'
            );
        }

        return user;
    }

    public static async create({user}) {
        try {
            const existingUser = await User.findOne({email: user.email});
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await this.hashPass(user.password);

            const temp_secret = speakeasy.generateSecret();

            const qrcode = await QRCode.toDataURL(temp_secret.otpauth_url);

            const newUser = new User({
                email: user.email,
                password: hashedPassword,
                secretKey: temp_secret.base32
            });

            await newUser.save();

            return {
                id: newUser._id.toString(),
                secret: temp_secret.base32,
                qrCodeUrl: qrcode,
            };
        } catch (err) {
            throw errorHandler(err);
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
            throw errorHandler(err);
        }
    }

    public static async hashPass (password) {
        return await hash(password, 12)
    }

    public static async login ({user}) {
        const userByEmail: any = await User.findOne({ email: user.email });
        if (!userByEmail) {
            throw new AuthenticationError('User does not exist!');
        }

        const isValidCode = speakeasy.totp.verify({
            secret: userByEmail.secretKey,
            encoding: 'base32',
            token: user.secretKey
        });

        if (!isValidCode) {
            throw new AuthenticationError('Secret is incorrect!');
        }
        const isEqual = await compare(user.password, userByEmail.password);
        if (!isEqual) {
            throw new AuthenticationError('Password is incorrect!');
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
