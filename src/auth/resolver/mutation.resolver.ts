import {AuthService} from "../auth.service";

export class MutationResolver {
    public static mutation = {
        async create(_, args) {
            return AuthService.create(args);
        },
        async changePassword(_, args) {
            return AuthService.changePassword(args);
        }
    }
}
