export class User {

    _id?: any;
    name?: string;
    cellphone?: number;
    email: string;
    password: string;

    constructor(
        name: string,
        cellphone: number,
        email: string,
        password: string
    ) {
        this.name = name;
        this.cellphone = cellphone;
        this.email = email;
        this.password = password;
    }

}