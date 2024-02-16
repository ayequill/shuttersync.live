import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
