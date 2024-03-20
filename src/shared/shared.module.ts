import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HelperService } from './helper/helper.service';
import { GuardService } from './guard/guard.service';

@Module({
  providers: [PrismaService, HelperService, GuardService],
  exports: [PrismaService, HelperService],
})
export class SharedModule {}
