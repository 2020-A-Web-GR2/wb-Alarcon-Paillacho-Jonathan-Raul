import {Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query} from "@nestjs/common";

@Controller('inicio')

//1:14:07

export class DeberController {
    @Get ('suma/:segundo')
    @HttpCode(200)
    suma(
        @Query() num1,
        @Param() num2
    ){
        console.log('primero',num1);
        console.log('segundo',num2);
        return 'Bienvenido, todo salió bien';
    }

    @Put('resta')
    @HttpCode(201)
    resta(
        @Body() num1,
        @Query() num2
    ){
        console.log('primero',num1.primero);
        console.log('segundo',num2);
        return 'Bienvenido resta, todo salió bien';
    }

    @Delete('multiplicacion/:num2')
    @HttpCode(200)
    //@Header('primero', 'none')
    multiplicacion(
        @Headers() num1,
        @Param() num2
    ){
        console.log('num2',num1);
        console.log('num2',num2);
        return 'Bienvenido multiplicacion, todo salió bien';
    }

    @Post('division/:num1')
    @HttpCode(201)
    division(
        @Param() num1,
        @Query() num2,
    ){
        console.log('num1',num1);
        console.log('num2',num2);
        return 'Bienvenido division, todo salió bien';
    }




}