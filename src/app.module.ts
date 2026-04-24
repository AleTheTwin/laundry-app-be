import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';
import { CrudModule } from './modules/crud/crud.module.js';
import { LogsModule } from './modules/logger/logger.module.js';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        LogsModule,
        CrudModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
