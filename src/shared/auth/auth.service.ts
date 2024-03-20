import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma.service';
import { HelperService } from 'src/shared/helper/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly helper: HelperService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      const result = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!result) {
        console.log(result);

        throw new NotFoundException('user not found ');
      }
      const checkPass = await this.helper.verifyPassword(
        password,
        result.password,
      );
      if (!checkPass) {
        console.log(checkPass);

        throw new UnauthorizedException('incorrent username or password');
      }
      const payload = {
        email: result.email,
        name: result.name,
      };
      const accessToken = await this.jwt.sign(payload);
      console.log('AccessToken', accessToken);

      return {
        result,
        accessToken,
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
