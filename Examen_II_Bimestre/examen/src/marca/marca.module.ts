import {Module} from "@nestjs/common";
import {MarcaEntity} from "./marca.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MarcaController} from "./marca.controller";
import {MarcaService} from "./marca.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature( [MarcaEntity], 'default')
        ],
        controllers:[
            MarcaController
        ],
        providers:[
            MarcaService
        ]
    }
)
export class MarcaModule {

}