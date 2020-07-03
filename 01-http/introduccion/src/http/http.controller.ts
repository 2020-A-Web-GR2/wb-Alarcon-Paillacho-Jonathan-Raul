
import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode, Param,
    Post,
    UnauthorizedException
} from "@nestjs/common";

// /juegos-http ya es un segmento de la url
// http://localhost:3001/juegos-http
@Controller('juegos-http')


export class HttpJuegoController {
    @Get('inicio')
    @HttpCode(201)
    holaGet(){
        //throw new BadRequestException('no envia nada')
        throw new UnauthorizedException('Prohibido el acceso') //códigos de estado de errores
        //return 'Hola GET!';
    }
    @Post('inicio')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST!';
    }
    @Delete('inicio')
    @HttpCode(204)
    @Header('Cache-control','none')
    @Header('EPN','probando las cosas')
    @Header('Jonathan','Prueba de Jonathan')
    holaDelete(){
        return 'Hola DELETE!';
    }

    //http://localhost:3001/juegos-http/parametros-ruta/:edad/gestion/:altura


    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
    }
    //Todos los parámetros nos llegan como string
    //Los parametros de ruta y de consulta viajan
    //los dos llegan como String
}