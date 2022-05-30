import { Module } from '@nestjs/common';
import { PicController } from './pic.controller';
import { PicService } from './pic.service';

@Module({
    providers: [PicService],
    controllers: [PicController]
})
export class PicModule {}
