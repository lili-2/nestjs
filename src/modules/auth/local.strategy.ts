import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // throw new HttpException(
      //   { errcode: 40010,message: '验证失败', error: '请检查信息后重新登录' },
      //   HttpStatus.BAD_REQUEST);
      throw new HttpException(
        {code: 0,msg: '账号或密码错误'},200
      )
    }
    return user;
  }
}
