import {
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserAlbumDto } from './dto/create-user-album.dto';
import { Album } from '@prisma/client';

@Injectable()
export class UserAlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAlbumDto: CreateUserAlbumDto,
    userId: string,
  ): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: {
        name: createAlbumDto.name,
        userId,
      },
    });
    if (album) {
      throw new HttpException('Album already exists', HttpStatus.BAD_REQUEST);
    }
    const createdAlbum = await this.prisma.album.create({
      data: { name: createAlbumDto.name, user: { connect: { id: userId } } },
      include: {
        photos: true,
      },
    });
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        albums: {
          connect: [{ id: createdAlbum.id}]
        }
      }
    })

    return createdAlbum;
  }
  async findAll(userId: string): Promise<Album[]> {
    return await this.prisma.album.findMany({
      where: {
        userId,
      },
      include: {
        photos: true,
      },
    });
  }

  async findOne(userId: string, albumId: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: { userId, id: albumId },
      include: {
        photos: true,
      },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(
    userId: string,
    updateAlbumDto: CreateUserAlbumDto,
    albumId: string,
  ): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: { userId, id: albumId },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.album.update({
      where: { userId, id: albumId },
      data: { ...updateAlbumDto },
    });
  }

  async delete(userId: string, albumId: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: { userId, id: albumId },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.album.delete({
      where: { userId, id: albumId },
    });
  }
}
