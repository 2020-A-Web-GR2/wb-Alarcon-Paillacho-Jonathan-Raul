import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

@Controller('usuario')

export class UsuarioController {

    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Jonathan'
        },
        {
            id: 2,
            nombre: 'Dayana'
        },
        {
            id: 3,
            nombre: 'EPN'
        }
    ]

    public idActual = 3


    @Get()
    mostrarTodo(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario
    }

    @Get('id')
    verUno(
        @Param() parametrosRuta
    ){
        /*const indice = this.arregloUsuarios.findIndex(
            //pred
        )*/
    }


    //clase 24/07/2020
    //Método para actualizar

    @Put (':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice]
    }

    @Delete (':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice,1)
        return this.arregloUsuarios[indice]
    }





}

//Estándar Rest full
//Utiliza JSON para las respuestas

//Ver todos
//Ver uno
//Crear uno
//Editar uno
//Eliminar uno