import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from 'src/utils/cryptogram';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {

      const hashPassword = encryptPassword(password, 'userSalt');
      if (hashPassword === user.password) {
        return {
          code: 1,
          user,
          msg: '密码正确'
        }
      } else {
        return {
          code: 2,
          user: null,
          msg: '密码错误'
        }
      }
    } else {
      return {
        code: 3,
        user: null,
        msg: '找不到该用户'
      }
    }
  }

  async login(user:{username: string,password: string}):Promise<any>{
    const payload = {username: user.username};
    const token = this.jwtService.sign(payload)
    return {
      code: 200,
      data: {
        token
      },
      msg: '登录成功'
    }
  }

  // jwt验证-step 3：处理jwt签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
    }
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token
        },
        msg: '登录成功'
      }
    } catch (error) {
      return {
        code: 600,
        msg: '账号或者密码错误'
      }
    }
  }
}
