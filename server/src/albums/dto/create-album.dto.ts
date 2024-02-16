import { IsString, IsNotEmpty } from 'class-validator'



export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
