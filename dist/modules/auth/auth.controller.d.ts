import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): void;
    getDoctorList(req: any): Promise<any>;
}
