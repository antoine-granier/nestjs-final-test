import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from '../configuration/configuration.service';
import { User } from '../../user/user.entity';
import { Task } from '../../task/task.entity';

@Module({
    imports: [
        ConfigurationModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: (configService: ConfigurationService) => ({
                type: 'postgres',
                host: 'localhost',
                port: parseInt(configService.databaseConfig.DATABASE_PORT, 10),
                database: configService.databaseConfig.DATABASE_NAME,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                synchronize: true,
                autoLoadEntities: true,
                entities: [User,Task],
            }),
        }),
    ],
})
export class DatabaseModule {}
