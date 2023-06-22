export class User {
    constructor(
        public name: string,
        public email: string,
        public mobile: string,
        public roleId: number,
        private token: string
        ) {}

        get _token() {
            return this.token;
        }
}
