import {AuthService} from "./auth.service";

export class AuthResolver {
    public static resolver = {
        Query: {
            async getAll() {
                return await AuthService.getAll();
            }
        },
        Mutation: {
            async create() {
                return AuthService.create();
            }
        }
    }
}
