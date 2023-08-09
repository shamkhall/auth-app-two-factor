import { ForbiddenError } from 'apollo-server-core';
import {AuthService} from "../auth/auth.service";
import {errorHandler} from "../error/handle.error";

export const authUserMiddleware = async (req) => {
    try {
        let access_token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[1];
        }

        if (!access_token) return false;

        const user = await AuthService.getUser(access_token);

        if (!user) {
            throw new ForbiddenError(
                'The user belonging to this token no logger exist'
            );
        }
        return user;
    } catch (error) {
        errorHandler(error);
    }
};
