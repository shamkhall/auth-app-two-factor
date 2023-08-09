import {AuthService} from "../auth.service";
import {isLoggedInMiddleware} from "../../middleware/is-logged-in.middleware";

export class MutationResolver {
    public static mutation = {
        async create(_, args): Promise<{
            id: string,
            secret: string,
            qrCodeUrl: string
        }> {
            return await AuthService.create(args);
        },
        async changePassword(_, args, { req, authUserMiddleware }) {
            await isLoggedInMiddleware(req, authUserMiddleware);
            return AuthService.changePassword(args);
        }
    }
}
