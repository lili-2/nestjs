import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  // 登录 一个守卫
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  login(@Request() req) {

    // return this.authService.login(req.user);
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  // getProfile(@Request() req) {
  async getDoctorList(@Request() req){
    console.log('jwt ')
    console.log(req.user)
    return req.user;
  }
}
