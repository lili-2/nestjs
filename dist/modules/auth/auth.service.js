"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const cryptogram_1 = require("../../utils/cryptogram");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findOne(username);
        if (user) {
            const hashPassword = (0, cryptogram_1.encryptPassword)(password, 'userSalt');
            if (hashPassword === user.password) {
                return {
                    code: 1,
                    user,
                    msg: '密码正确'
                };
            }
            else {
                return {
                    code: 2,
                    user: null,
                    msg: '密码错误'
                };
            }
        }
        else {
            return {
                code: 3,
                user: null,
                msg: '找不到该用户'
            };
        }
    }
    async login(user) {
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);
        return {
            code: 200,
            data: {
                token
            },
            msg: '登录成功'
        };
    }
    async certificate(user) {
        const payload = {
            username: user.username,
        };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');
        try {
            const token = this.jwtService.sign(payload);
            return {
                code: 200,
                data: {
                    token
                },
                msg: '登录成功'
            };
        }
        catch (error) {
            return {
                code: 600,
                msg: '账号或者密码错误'
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map