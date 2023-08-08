import {AuthService} from "./auth.service";

export class AuthResolver {
    public static resolver = {
        Query: {
            getAll() {
                return AuthService.getAll();
            }
        }
    }
}
