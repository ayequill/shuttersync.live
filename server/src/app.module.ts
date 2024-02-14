import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth-guard';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  exports: [PrismaService],
})
export class AppModule {}
