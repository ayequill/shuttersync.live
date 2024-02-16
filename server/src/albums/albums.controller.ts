import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AlbumsService } from './albums.service';
import { PhotosService } from '@/photos/photos.service';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';

@Controller('albums')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private photo: PhotosService,
    private cloud: CloudinaryService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }

  // @Post(':id/photo')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     dest: 'public/photos',
  //     storage: diskStorage({
  //       destination: 'public/photos',
  //       filename: (req, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async addPhoto(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  //       fileIsRequired: true,
  //       validators: [
  //         new FileTypeValidator({
  //           fileType: 'image',
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Param('id') id: string,
  // ) {
  //   await this.albumsService.findOne(id);
  //   const cloudFile = await this.cloud.upload(file, id);
  //   return this.photo.create(id);
  // }

  @Post(':id/photos')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'public/photos',
      storage: diskStorage({
        destination: 'public/photos',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadPhotos(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const cloudfiles = await this.cloud.uploadFiles(files, id);
    cloudfiles.forEach(async (file) => {
      await this.photo.create(id, file);
    })
    
    return {
      message: 'Photos uploaded successfully',
      status: HttpStatus.OK,
    };
  }
}
