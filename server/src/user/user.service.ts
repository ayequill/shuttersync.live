import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserWithoutPassword } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const { confirmPassword, ...createUserDtoWithoutPassword } = createUserDto;
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);


    const userCreated = await this.prisma.user.create({
      data: { ...createUserDtoWithoutPassword, password: hashedPassword },
      include: {
        albums: true,
      },
    });
    return userCreated;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: { albums: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const { password, ...res } = user;
    return res;
  }

  async remove(id: string): Promise<{}> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
