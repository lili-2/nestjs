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
    console.log('本地策略')
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        { message: '验证失败', error: '请重新登录' },
        HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
