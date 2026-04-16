import { Controller, Get, Post, Body, Param, HttpException } from '@nestjs/common';
import { UserService } from './user.service.js';
import { Prisma, User as UserModel } from './generated/prisma/client.js';

@Controller()
export class AppController {
  constructor(private readonly UserService: UserService) {}

  @Get('user')
  async getUsers(): Promise<UserModel[]> {
    return this.UserService.users({});
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<Prisma.UserModel> {
    const user = await this.UserService.user({ 'id': id	});
	  if (!user) {
		  throw new HttpException('User not found', 404);
	  }
	  return user;
  }

  @Post('user')
  async registerUser(
    @Body()
    userData: {
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<UserModel> {
    return this.UserService.createUser(userData);
  }
}
