import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: {
        username: string;
        password: string;
    }): Promise<any>;
    certificate(user: any): Promise<{
        code: number;
        data: {
            token: string;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    }>;
}
