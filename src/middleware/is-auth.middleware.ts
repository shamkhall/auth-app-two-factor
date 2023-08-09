import {verify} from 'jsonwebtoken';
import {config} from "../config/config";

export class IsAuthMiddleware {
    public static isAuth (req, res, next) {
        const authHeader = req.get('Authorization');
        console.log(authHeader);
        console.log(req.originalUrl)
        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            req.isAuth = false;
            return next();
        }
        let decodedToken;
        try {
            decodedToken = verify(token, config.JWT_SECRET_KEY);
        } catch {
            req.isAuth = false;
            return next();
        }
        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    }
}
