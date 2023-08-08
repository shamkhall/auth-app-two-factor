export class AuthService {
    private static users = [{
        name: 'sham'
    },{
        name: 'sham 1'
    },{
        name: 'sham 2'
    }];

    public static getAll () {
        return this.users;
    }
}
