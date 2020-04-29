import { SERVICIO_ENDPOINT } from './constants';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { Request } from './request';

const request = new Request(SERVICIO_ENDPOINT);

export class Auth {
    static async login(login: LoginDto) {
        localStorage.removeItem("session");
        return await request.post('/auth/login', login);
    }

    static async register(user: UserDto) {
        return await request.post('/auth/register', user);
    }
}