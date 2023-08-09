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

        return await AuthService.getUser(access_token);
    } catch (error) {
        errorHandler(error);
    }
};
