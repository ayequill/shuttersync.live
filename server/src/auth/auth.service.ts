import { Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserWithoutPassword } from '@/user/user.interface';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    const match: boolean = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null > {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(
    userDto: SignInDto,
  ): Promise<{ access_token: string; id: string }> {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}
