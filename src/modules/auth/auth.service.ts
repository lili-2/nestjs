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

  // 判断账号密码是否输入正确
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const hashPassword = encryptPassword(password, 'userSalt');
      if (hashPassword === user.password) {
          return user
      } 
    }
    return null
  }

  // 登录返回token
  async login(user:{username: string,password: string}):Promise<any>{
    const payload = {username: user.username};
    const token = this.jwtService.sign(payload)
    return {
      code: 200,
      token,
      msg: '登录成功'
    }
  }

  // jwt验证-step 3：处理jwt签证
  // async certificate(user: any) {
  //   const payload = {
  //     username: user.username,
  //   }
  //   console.log('JWT验证 - Step 3: 处理 jwt 签证');
  //   try {
  //     const token = this.jwtService.sign(payload);
  //     return {
  //       code: 200,
  //       data: {
  //         token
  //       },
  //       msg: '登录成功'
  //     }
  //   } catch (error) {
  //     return {
  //       code: 600,
  //       msg: '账号或者密码错误'
  //     }
  //   }
  // }
}
