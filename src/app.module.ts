import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaModule } from './sala/sala.module.js';
import { PeliculaModule } from './pelicula/pelicula.module.js';
import { GeneroModule } from './genero/genero.module.js';
import { FuncionModule } from './funcion/funcion.module.js';
import { ClienteModule } from './cliente/cliente.module.js';
import { BoletoModule } from './boleto/boleto.module.js';
@Module({imports:[ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRootAsync({inject:[ConfigService],useFactory:(config:ConfigService)=>({type:'postgres',host:config.get('DB_HOST'),port:Number(config.get('DB_PORT')||5432),username:config.get('DB_USER'),password:config.get('DB_PASSWORD'),database:config.get('DB_NAME'),autoLoadEntities:true,synchronize:true})}),SalaModule,
PeliculaModule,
GeneroModule,
FuncionModule,
ClienteModule,
BoletoModule,]})
export class AppModule {}