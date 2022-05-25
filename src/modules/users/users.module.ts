import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  //   user module 要不然user 和 auth会造成 循环 
  //   如果在user.module   中 引入 AuthService 
  //   将要将其他策略又引入一次 直接用app来统一管理
    //  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
