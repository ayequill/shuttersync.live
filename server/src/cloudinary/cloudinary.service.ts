import { HttpException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
// import * as streamifier from 'streamifier';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }


  upload(
    file: Express.Multer.File,
    album: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          transformation: {
            width: 800,
            fetch_format: 'auto',
          },
          folder: album,
          public_id: file.originalname,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as CloudinaryResponse);
        },
      );
    });
  }

  async deleteFile(publicId: string): Promise<CloudinaryResponse> {
    return await cloudinary.uploader.destroy(publicId);
  }

  async uploadFiles(
    files: Express.Multer.File[],
    id: string,
  ): Promise<CloudinaryResponse[]> {
    try {
      const promises = files.map(async (file) => {
        return await this.upload(file, id);
      });

      return await Promise.all(promises);
    } catch (error) {
      throw new HttpException('Error uploading files', 500, {
        cause: error,
      });
    }
  }

  async deleteAlbum (ids: string[], folder: string): Promise<CloudinaryResponse> {
    await cloudinary.api.delete_resources(ids as string[], { resource_type: 'image' });
    return await cloudinary.api.delete_folder(folder)
  }

  async deletePhoto (publicId: string): Promise<CloudinaryResponse> {
    return await cloudinary.uploader.destroy(publicId);
  }
}
