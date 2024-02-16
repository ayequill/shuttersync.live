import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { PhotosService } from '@/photos/photos.service';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, PrismaService, PhotosService],
})
export class AlbumsModule {}
