import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  constructor() {}

  async passwordHash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const check = await bcrypt.compare(password, hashedPassword);
    return check;
  }
}
