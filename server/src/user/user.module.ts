import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { UserAlbumsController } from './user-albums.controller';
import { UserAlbumsService } from './user-albums.service';

@Module({
  controllers: [UserController, UserAlbumsController],
  providers: [UserService, PrismaService, UserAlbumsService],
  exports: [UserService],
})
export class UserModule {}
