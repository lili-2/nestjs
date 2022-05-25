import { Controller, Get, Post, Body, UseGuards ,Request} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor
    (private readonly usersService: UsersService,
      private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Post()
  // async create(@Body() param) {
  //   const newParam = { ...param, status: true };
  //   await this.usersService.create(newParam);
  //   return true;
  // }

  // @Post('/many')
  // async createMany(@Body() users) {
  //   const newUsers = users.map(user => ({ ...user, status: true }));
  //   await this.usersService.createMany(newUsers);
  //   return true
  // }

  // @Post('login')
  // async login(@Body() body){
  //   const {username , password} = body

  //   console.log(username , password)

  //   const authResult = await this.authService.validateUser(username , password);

  //   console.log(authResult)
  // }
  
  @Post('login')
  async login(@Body() loginParmas) {
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password)
    console.log(authResult)
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确'
        }
      default:
        return {
          code: 600,
          msg: '查无此人'
        }
    }

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Body() user,@Request() req) {
  //   console.log('hello')
  //   console.log(req.user)
    // const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password)
    // console.log(authResult)
    // switch (authResult.code) {
    //   case 1:
    //     return this.authService.certificate(authResult.user);
    //   case 2:
    //     return {
    //       code: 600,
    //       msg: '账号或密码不正确'
    //     }
    //   default:
    //     return {
    //       code: 600,
    //       msg: '查无此人'
    //     }
    // }
  }


  @Post('register')
  async register(@Body() body){
    return await this.usersService.register(body);
  }
}
