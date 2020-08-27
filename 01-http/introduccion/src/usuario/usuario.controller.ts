import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import {MascotaService} from "../mascota/mascota.service";

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

    // clase 13/08/2020
    constructor(
      // Aquí se inyectan las dependencias
      private readonly _usuarioService: UsuarioService,
      // Aquí estamos inyectando las dependencias que queremos en el archivo

      private readonly _mascotaService: MascotaService

    ) {
    }


    @Get()
    async mostrarTodo(){
        try {
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })

        }
        //return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try{
            const respuesta = await this._usuarioService.creaUno(parametrosCuerpo);
            return respuesta
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })

        }

        //const nuevoUsuario = {
        //    id: this.idActual + 1,
        //    nombre: parametrosCuerpo.nombre
        //};
        //this.arregloUsuarios.push(nuevoUsuario);
        //this.idActual = this.idActual + 1;
        //return nuevoUsuario
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        try {
            const respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })

        }

        /*const indice = this.arregloUsuarios.findIndex(
            //pred
        )*/
    }


    //clase 24/07/2020
    //Método para actualizar

    // Clase 14/08/2020

    @Put (':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;

        usuarioEditado.id = id;
        try{
            const respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }



        //const indice = this.arregloUsuarios.findIndex(
        //    (usuario) => usuario.id === Number(parametrosRuta.id)
        //)
        //this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        //return this.arregloUsuarios[indice]
    }

    @Delete (':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try{
            const respuesta = await this._usuarioService.eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + 'eliminado'
            }
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

        //const indice = this.arregloUsuarios.findIndex(
        //    (usuario) => usuario.id === Number(parametrosRuta.id)
        //)
        //this.arregloUsuarios.splice(indice,1)
        //return this.arregloUsuarios[indice]
    }

    //Vamos a definir un metodo para crear un mascota Servicio


    // ESTE ES UN METODO CUSTOMIZADO POR NOSOTROS
    @Post('crearUsuarioyCrearMascota')
    async crearUsuarioyCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;

        //Validar Usuario
        //Validar Mascota
        // CREAMOS LOS DOS
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.creaUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando Usuario'
            })
        }

        if (usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try{
                mascotaCreada = await this._mascotaService.creaNuevaMascota(mascota);
            }catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando Mascota'
                })
            }
            if (mascotaCreada){
                return{
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'error creando usuario'
            })
        }
    }



    // npm install ejs para instalar el ejs
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Jonathan'
        res.render( // con esto se puede renderizar una vista
            'usuario/ejemplo', // Nombre de la vista (Archivo)
            { // Parametros de la vista
                nombre: nombreControlador
            }
        )
    }

    @Get('vista/faq')
    faq(
        @Res() res
    ){

        res.render( // con esto se puede renderizar una vista
            'usuario/faq'
        )
    }

    @Get('vista/inicio')
    inicio(
        @Res() res
    ){

        res.render( // con esto se puede renderizar una vista
            'usuario/inicio'
        )
    }

    @Get('vista/login')
    login(
        @Res() res
    ){

        res.render( // con esto se puede renderizar una vista
            'usuario/login'
        )
    }


}

//Estándar Rest full
//Utiliza JSON para las respuestas

//Ver todos
//Ver uno
//Crear uno
//Editar uno
//Eliminar uno