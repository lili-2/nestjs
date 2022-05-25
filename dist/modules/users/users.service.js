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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const cryptogram_1 = require("../../utils/cryptogram");
let UsersService = class UsersService {
    constructor(usersRepository, connection) {
        this.usersRepository = usersRepository;
        this.connection = connection;
    }
    async findAll() {
        return await this.usersRepository.find({ relations: ['articles'] });
    }
    async findOne(username) {
        const u = await (0, typeorm_1.getRepository)(users_entity_1.UsersEntity).findOne({ where: { username } });
        return u;
    }
    async create(user) {
        const { username } = user;
        const u = await this.findOne(username);
        if (u) {
            throw new common_1.HttpException({
                message: '创建失败',
                error: 'name必须唯一',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        console.log(user);
        return await this.usersRepository.save(user);
    }
    async register(requestBody) {
        console.log('user service register');
        let { username, password } = requestBody;
        const u = await this.findOne(username);
        if (u) {
            return {
                code: 400,
                msg: '用户名已被使用'
            };
        }
        password = (0, cryptogram_1.encryptPassword)(password, 'userSalt');
        try {
            await this.usersRepository.save({ username, password });
            return {
                code: 200,
                msg: 'Success'
            };
        }
        catch (e) {
            return {
                code: 500,
                msg: `Server error : ${e};
        }`
            };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map