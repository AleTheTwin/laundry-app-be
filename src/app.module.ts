import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';
import { UserService } from './user.service.js';
@Module({
	imports: [
		ConfigModule.forRoot({
		  isGlobal: true
	  })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
