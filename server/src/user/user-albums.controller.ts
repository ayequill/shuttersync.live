import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserAlbumsService } from './user-albums.service';
import { CreateUserAlbumDto } from './dto/create-user-album.dto';
import { Album } from '@prisma/client';

@Controller('users/:userId/albums')
export class UserAlbumsController {
  constructor(private userAlbumService: UserAlbumsService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createAlbumDto: CreateUserAlbumDto,
  ): Promise<Album> {
    return this.userAlbumService.create(createAlbumDto, userId);
  }

  @Get()
  findAll(@Param('userId') userId: string): Promise<Album[] | []> {
    return this.userAlbumService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param() param: { id: string; userId: string },
  ): Promise<Album> {
    return this.userAlbumService.findOne(param.userId, param.id);
  }
  @Put(':id')
  update(
    @Param() param: { id: string; userId: string },
    @Body() updateAlbumDto: CreateUserAlbumDto,
  ): Promise<Album> {
    return this.userAlbumService.update(param.userId, updateAlbumDto, param.id);
  }

  @Delete(':id')
  delete(
    @Param() param: { id: string; userId: string },
  ): Promise<Album> {
    return this.userAlbumService.delete(param.userId, param.id);
  }
}
