import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";
import {NumeroCreateDto} from "./dto/numero.create-dto";
import {validate} from "class-validator";

@Controller('inicio')

//1:14:07

export class DeberController {

    @Get ('suma/:segundo')
    @HttpCode(200)
    async suma(
        @Query() num1,
        @Param() num2,
        @Req() req
    ){
        const nombreUsuario = req.cookies
        const nombreComprobar = String(nombreUsuario.persona)
        console.log(nombreComprobar)
        if (nombreComprobar){
            console.log("INICIA LA SUMA")
            const primero = Number(num1.primero)
            //console.log(typeof(primero))
            const segundo = Number(num2.segundo)

            const numeroValido = new NumeroCreateDto();
            numeroValido.numero1 = primero;
            numeroValido.numero2 = segundo;

            try {
                const existenErrores = await validate(numeroValido) //con el await siempre se utiliza el bloque try y catch
                if(existenErrores.length > 0){
                    console.log('Errores: ',existenErrores);
                    throw new BadRequestException('Error validando');
                } else {
                    const numero1 = Number(num1.primero);
                    const numero2 = Number(num2.segundo);
                    console.log(numero1)
                    console.log(numero2)
                    return "La suma de los dos números es: " + (numero1 + numero2);
                }

            }catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error validando');
            }
        }else {
            console.log("No existe el nombre")
        }

        //console.log(nombreComprobar)
        //console.log(nombreUsuario)


        //if (nombreUsuario.persona)
        //    console.log(nombreUsuario.persona)


        //console.log('primero',num1);
        //console.log('segundo',num2);
        //return 'Bienvenido, todo salió bien';
    }

    @Put('resta')
    @HttpCode(201)
    async resta(
        @Body() num1,
        @Query() num2,
        @Req() req
    ){

        const nombreUsuario = req.cookies
        const nombreComprobar = String(nombreUsuario.persona)
        if (nombreComprobar){
            console.log("INICIA LA RESTA")
            const primero = Number(num1.primero)
            //console.log(typeof(primero))
            const segundo = Number(num2.segundo)

            const numeroValido = new NumeroCreateDto();
            numeroValido.numero1 = primero;
            numeroValido.numero2 = segundo;

            try {
                const existenErrores = await validate(numeroValido) //con el await siempre se utiliza el bloque try y catch
                if(existenErrores.length > 0){
                    console.log('Errores: ',existenErrores);
                    throw new BadRequestException('Error validando');
                } else {
                    const numero1 = Number(num1.primero);
                    const numero2 = Number(num2.segundo);
                    console.log(numero1)
                    console.log(numero2)
                    return "La resta de los dos números es: " + (numero1 - numero2);
                }

            }catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error validando');
            }
        }else{
            console.log("No existe el nombre")
        }



        //console.log('primero',num1.primero);
        //console.log('segundo',num2);
        //return 'Bienvenido resta, todo salió bien';
    }

    @Delete('multiplicacion/:segundo')
    @HttpCode(200)
    //@Header('primero', 'none')
    async multiplicacion(
        @Headers() num1,
        @Param() num2,
        @Req() req
    ){

        const nombreUsuario = req.cookies
        const nombreComprobar = String(nombreUsuario.persona)
        if (nombreComprobar){

            console.log("INICIA LA MULTIPLICACION")
            const primero = Number(num1.primero)
            //console.log(typeof(primero))
            const segundo = Number(num2.segundo)

            const numeroValido = new NumeroCreateDto();
            numeroValido.numero1 = primero;
            numeroValido.numero2 = segundo;

            try {
                const existenErrores = await validate(numeroValido) //con el await siempre se utiliza el bloque try y catch
                if(existenErrores.length > 0){
                    console.log('Errores: ',existenErrores);
                    throw new BadRequestException('Error validando');
                } else {
                    const numero1 = Number(num1.primero);
                    const numero2 = Number(num2.segundo);
                    console.log(numero1)
                    console.log(numero2)
                    return "La multiplicacion de los dos números es: " + (numero1 * numero2);
                }

            }catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error validando');
            }
        }else{
            console.log("No existe el nombre")
        }

        //console.log('num2',num1);
        //console.log('num2',num2);
        //return 'Bienvenido multiplicacion, todo salió bien';
    }

    @Post('division/:primero')
    @HttpCode(201)
    async division(
        @Param() num1,
        @Query() num2,
        @Req() req
    ) {

        const nombreUsuario = req.cookies
        const nombreComprobar = String(nombreUsuario.persona)
        if (nombreComprobar) {

            console.log("INICIA LA DIVISION")
            const primero = Number(num1.primero)
            //console.log(typeof(primero))
            const segundo = Number(num2.segundo)
            if (segundo == 0)
                throw new BadRequestException('No se puede realizar división para cero');

            const numeroValido = new NumeroCreateDto();
            numeroValido.numero1 = primero;
            numeroValido.numero2 = segundo;

            try {
                const existenErrores = await validate(numeroValido) //con el await siempre se utiliza el bloque try y catch
                if (existenErrores.length > 0) {
                    console.log('Errores: ', existenErrores);
                    throw new BadRequestException('Error validando');
                } else {
                    const numero1 = Number(num1.primero);
                    const numero2 = Number(num2.segundo);
                    console.log(numero1)
                    console.log(numero2)
                    return "La division de los dos números es: " + (numero1 / numero2);
                }

            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error validando');
            }
        } else {
            console.log("No existe el nombre")
        }

        //console.log('num1',num1);
        //console.log('num2',num2);
        //return 'Bienvenido division, todo salió bien';
    }


    @Get('nombreUsuarioCookie')
    guardarNombre(
        @Query() parametrosConsulta,
        @Res() res
    ){
        const nombre = String(parametrosConsulta.persona);

        if(nombre){
            res.cookie(
                'persona',
                String(parametrosConsulta.persona));
        }

        const mensaje = {
            mensaje: 'Bienvenido ' + (nombre)
        };
        res.send(mensaje);
    }


    @Get ('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        req.cookies

        const mensaje = {
            sinFirmar : req.cookie
        };

        return mensaje;
    }


}