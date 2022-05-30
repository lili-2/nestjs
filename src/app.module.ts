import { resolve } from 'path';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { PicModule } from './modules/pic/pic.module';
import { PicController } from './modules/pic/pic.controller';
import { PicService } from './modules/pic/pic.service';


@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,  
    UsersModule,
   PicModule,
  ],
  controllers: [UsersController, AppController],
  providers: [AppService],
})
export class AppModule {}