import { IsBoolean, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsBoolean()
  published: boolean;
}
