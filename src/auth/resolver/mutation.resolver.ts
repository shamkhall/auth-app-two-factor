import {AuthService} from "../auth.service";

export class MutationResolver {
    public static mutation = {
        async create(_, args): Promise<{
            id: string,
            secret: string,
            qrCodeUrl: string
        }> {
            return await AuthService.create(args);
        },
        async changePassword(_, args) {
            return AuthService.changePassword(args);
        }
    }
}
