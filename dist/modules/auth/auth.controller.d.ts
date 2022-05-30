import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    getDoctorList(req: any): Promise<any>;
}
