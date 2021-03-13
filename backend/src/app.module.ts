import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { MongooseModule } from '@nestjs/mongoose'

import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { LeaguesModule } from './leagues/leagues.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: 'football',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'], ignoreEnvFile: false }),
    ServeStaticModule.forRoot({ rootPath: join(process.cwd(), 'public') }),
    AuthModule,
    LeaguesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
