import {AuthService} from "../auth.service";
import {isLoggedInMiddleware} from "../../middleware/is-logged-in.middleware";

export class QueryResolver {
    public static query = {
        async getAll(_, args, { req, authUserMiddleware }) {
            await isLoggedInMiddleware(req, authUserMiddleware);
            return await AuthService.getAll();
        },
        async login(_, args) {
            return await AuthService.login(args);
        }
    }
}
