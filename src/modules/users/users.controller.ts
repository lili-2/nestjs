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
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() _user,@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  async register(@Body() body){
    return await this.usersService.register(body);
  }
}
