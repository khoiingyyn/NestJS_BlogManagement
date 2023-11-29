/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './dto/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    AuthModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
