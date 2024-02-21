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
import { Express } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  albumsService: any;
  cloud: any;
  photo: any;
  constructor(private readonly photosService: PhotosService) {}


@Post(':id/photo')
@UseInterceptors(
FileInterceptor('file', {
      dest: 'public/photos',
      storage: diskStorage({
        destination: 'public/photos',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async addPhoto(
    @UploadedFile(
      new ParseFilePipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({
            fileType: 'image',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ) {

    const cloudFile = await this.cloud.upload(file, id);
    return this.photo.create(id);
  }

  @Get()
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
// function UploadedFile(arg0: any): (target: PhotosController, propertyKey: "addPhoto", parameterIndex: 0) => void {
//   throw new Error('Function not implemented.');
// }

// function UseInterceptors(arg0: any): (target: PhotosController, propertyKey: "addPhoto", descriptor: TypedPropertyDescriptor<(file: Express.Multer.File, id: string) => Promise<any>>) => void | TypedPropertyDescriptor<...> {
//   throw new Error('Function not implemented.');
// }

// function FileInterceptor(arg0: string, arg1: { dest: string; storage: any; }): any {
//   throw new Error('Function not implemented.');
// }

// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, cb: any) => void; }) {
//   throw new Error('Function not implemented.');
// }

