import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService, private readonly cloud: CloudinaryService) {}

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: {
        id: id,
      },
      include: {
        photos: true
      }
    })

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: id,
      },
      include: {
        photos: true
      }
    })

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.album.update({
      where: {
        id: id
      },
      data: {...updateAlbumDto}
    })
  }

  async remove(id: string) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: id,
      },
      include: {
        photos: true
      }
    })

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const publicIds = album.photos.map(photo => photo.publicId) as string[];
    await this.prisma.photo.deleteMany({
      where: {
        albumId: id
      }
    });

      await this.cloud.deleteAlbum(publicIds, id);
    return await this.prisma.album.delete({
      where: {
        id: id
      },
      include: {
        photos: true
      }
    });
  }
}
