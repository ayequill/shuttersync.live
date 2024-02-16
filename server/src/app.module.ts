import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth-guard';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [UserModule, AuthModule, AlbumsModule, PhotosModule, CloudinaryModule],
  controllers: [],
  providers: [PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  exports: [PrismaService],
})
export class AppModule {}
