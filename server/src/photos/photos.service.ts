import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Photo } from '@prisma/client';
import { CloudinaryResponse } from '@/cloudinary/cloudinary-response';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(albumId: string, data: CloudinaryResponse): Promise<Photo> {
    const photo = await this.prisma.photo.create({
      data: {
        imgUrl: data.secure_url,
        size: data.bytes.toString(),
        publicId: data.public_id,
        storageUrl: data.secure_url,
        name: data.original_filename,
        album: {
          connect: {
            id: albumId,
          },
        },
      }
    });
    return photo;
  }

  findAll() {
    return `This action returns all photos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
