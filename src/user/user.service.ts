import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { HelperService } from 'src/shared/helper/helper.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, name, password } = createUserDto;
      const check = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (check) {
        throw new ConflictException('user already exist');
      }
      const hashedPassword = await this.helperService.passwordHash(password);

      const result = await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async createPost(createPostDto: CreatePostDto, file: any) {
    try {
      const img = Buffer.from(file.buffer).toString('base64');
      console.log('IMG', img);

      const { content, title } = createPostDto;
      const result = await this.prisma.post.create({
        data: {
          title,
          published: true,
          content,
          img,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
