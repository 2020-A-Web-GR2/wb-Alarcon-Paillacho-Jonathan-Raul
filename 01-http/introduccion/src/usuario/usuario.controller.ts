import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import {MascotaService} from "../mascota/mascota.service";
import {UsuarioEntity} from "./usuario.entity";

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
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ){

        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }

    }

    @Get('vista/login')
    login(
        @Res() res
    ){

        res.render( // con esto se puede renderizar una vista
            'usuario/login'
        )
    }

    @Get('vista/crear')
    crear(
        @Res() res
    ){

        res.render( // con esto se puede renderizar una vista
            'usuario/crear'
        )
    }

    @Get('vista/crear')
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ){
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            })
    }



    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            if (parametrosCuerpo.cedula.length === 10) {

            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }

        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.creaUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError);
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario')
        }catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }

    @Get('vista/editar/:id')
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ){
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        }catch (error) {
            console.error('Error del sevidor');
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                })
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }

    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ){
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');

        }
    }

}

//Estándar Rest full
//Utiliza JSON para las respuestas

//Ver todos
//Ver uno
//Crear uno
//Editar uno
//Eliminar uno