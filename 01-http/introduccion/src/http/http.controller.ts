
import {
    BadRequestException, Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode, Param,
    Post, Query, Req, Res,
    UnauthorizedException
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate} from "class-validator";

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
        isNaN(parametrosRuta.edad)
        isNaN(parametrosRuta.altura)
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
    }
    //Todos los parámetros nos llegan como string
    //Los parametros de ruta y de consulta viajan
    //los dos llegan como String

    //clase 09/07/2020
    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        const nombre = String(parametrosDeConsulta.nombre)
        const apellido = String(parametrosDeConsulta.apellido)
        if (isNaN(parametrosDeConsulta.nombre) == true && isNaN(parametrosDeConsulta.apellido)){
            return nombre + ' ' + apellido;
        }else{
            return ':)';
        }

    }



    @Post ('parametros-cuerpo')
    @HttpCode(200)
    //Clase 10-07-2020
    async parametrosCuerpo( //async sirve para utilizar promesas
        @Body() parametrosDeCuerpo
    ){
        //promesas
        //guardar los datos dentro dentro de una instancia de la nueva clase
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.hijos = parametrosDeCuerpo.hijos;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.vivo = parametrosDeCuerpo.vivo;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        //siempre con el sync tenemos que usar try catch
        try {
            const existenErrores = await validate(mascotaValida) //con el await siempre se utiliza el bloque try y catch
            if(existenErrores.length > 0){
                console.log('Errores: ',existenErrores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }

        }catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }

        //validaciones
        //Es lo más importante

        //console.log('Parametros de cuerpo', parametrosDeCuerpo);
        //return 'Registro creado';
    }

    //COOKIES
    //1 Guardar una cookie Insegura
    //2 Guardar una cookie Segura
    //3 Mostrar cookies

    @Get('guardarCookieInsegura')
    guardarCookieInsegura( //vamos a usar un framework
        @Query() parametrosConsulta,
        @Req() req,  //request - PETICIÓN
        @Res() res  //response - RESPUESTA
    ){
        //guardar las cookies
        res.cookie(
            'galletaInsegura',
            'Tengo hambre'
        );
        const mensaje = {
            mensaje: 'ok-Insegura'
        };
        res.send(mensaje);
    }


    @Get('guardarCookieSegura')
    guardarCookieSegura( //vamos a usar un framework
        @Query() parametrosConsulta,
        @Req() req,  //request - PETICIÓN
        @Res() res  //response - RESPUESTA
    ){
        //guardar las cookies
        res.cookie(
            'galletaSegura',
            'Aplicaciones Web',
            {
                secure: true //Con esto se guarda una cookie segura
            }
        );
        const mensaje = {
            mensaje: 'ok-Segura'
        };
        res.send(mensaje);
    }


    //Para mostrar las cookies
    @Get ('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje = {
            sinFirmar : req.cookies,
            firmadas : req.signedCookies
        };

        return mensaje;
    }


    @Get ('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res
    ){
        res.cookie('firmada','policia',{signed: true});
        const mensaje = {
            mensaje: 'ok-firmada'
        };
        res.send(mensaje);
    }









}