import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query, Req, Res, Session
} from "@nestjs/common";
import {MarcaService} from "./marca.service";
import {MarcaCreate} from "./dto/marca.create";
import {validate, ValidationError} from "class-validator";
import {MarcaEntity} from "./marca.entity";

@Controller('marca')

export class MarcaController {
    constructor(
        private readonly _marcaService: MarcaService,
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._marcaService.buscarTodos()
            return respuesta
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }

    }

    @Post()
    async crearUno(
        @Body() parametroscuerpo
    ) {
        try {
            //validacion del CREATE DTO
            const respuesta = await this._marcaService.crearUno(parametroscuerpo)
            return respuesta

        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }
    }

    @Get(':id')
    async verUno(
        @Param() paramentrosRuta
    ) {
        let respuesta
        try {
            const respuesta = await this._marcaService.buscarUno(paramentrosRuta.id)

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }
        if (respuesta) {
            return respuesta
        } else {
            throw new NotFoundException(
                {
                    mensaje: 'No existen registros'
                }
            )
        }

    }

    @Put(':id')
    async editarUno(
        @Param() parametroRuta,
        @Body() paramentroCuerpo
    ) {
        const id = Number(parametroRuta.id);
        const marcaEdit = paramentroCuerpo
        marcaEdit.id = id;
        try {
            console.log('Marca Editada', marcaEdit)
            const respuesta = await this._marcaService.editarUno(marcaEdit)
            return respuesta;

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametroRuta
    ) {
        const id = Number(parametroRuta.id)
        try {

            const respuesta = await this._marcaService.eliminarUno(id)
            return {
                mensaje: 'Registro con id' + id + 'eliminado'
            }

        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {
                    mensaje: "Error del servidor"
                }
            )
        }

    }

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosconsulta,
        @Session() session
    ) {

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._marcaService.buscarTodos(parametrosconsulta.busqueda);
            } catch (error) {
                throw new InternalServerErrorException('Error buscando marcas')
            }
            if (resultadoEncontrado) {
                res.render(
                    'marca/inicio',
                    {
                        usuario: session.usuario,
                        arregloMarcas: resultadoEncontrado,
                        parametrosConsulta: parametrosconsulta
                    });
            } else {
                throw new NotFoundException('No se encontraron cartas')
            }

        } else {
            return res.redirect('/marca/login')
        }
    }


    @Get('vista/crear')
    crear(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        return res.render(
            'marca/crear', {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                color: parametrosConsulta.color,
                anios: parametrosConsulta.anios,
                origen: parametrosConsulta.origen,
                empresa: parametrosConsulta.empresa,
            }
        )

    }


    @Get('vista/editar/:id')
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let marcaExiste;
        try {
            marcaExiste = await this._marcaService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/marca/vista/inicio?mensaje=Error buscando carta');
        }
        if (marcaExiste) {
            return res.render(
                'marca/crear',
                {
                    error: parametrosConsulta.error,
                    marca: marcaExiste
                }
            )
        } else {
            return res.redirect('/marca/vista/inicio?mensaje=Usuario no encontrado');
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un DTO
        const nombre = parametrosCuerpo.nombre;
        const color = parametrosCuerpo.color;
        const anios = parametrosCuerpo.anios;
        const origen = parametrosCuerpo.origen;
        const empresa = parametrosCuerpo.empresa;

        const marca = new MarcaCreate()
        marca.nombre = nombre
        marca.color = color
        marca.anios = Number(anios)
        marca.origen = origen
        marca.empresa = empresa

        try {
            const errores: ValidationError[] = await validate(marca)
            if (errores.length > 0) {
                console.error("error de try ", errores)
                const mensajeError = 'ERROR EN VALIDACIÓN despues de try'
                return res.redirect('/vuelo/vista/adminViajes?error=' + mensajeError)

            } else {
                let respuestaCreacionUsuario;
                try {
                    respuestaCreacionUsuario = await this._marcaService.crearUno(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error creando marca'
                    return res.redirect('/marca/vista/crear?error=' + mensajeError)
                }
                if (respuestaCreacionUsuario) {
                    return res.redirect('/marca/vista/inicio');
                } else {
                    const mensajeError = 'Error creando usuario'
                    return res.redirect('/usuario/vista/crear?error=' + mensajeError);
                }
            }
        } catch (e) {
            console.error('Error', e)
            const mensajeError = 'ERROR EN VALIDACIÓN en catch'
            return res.redirect('marca/vista/crear?error=' + mensajeError)
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const marcaEdit = {
            id: Number(parametrosRuta.id),
            color: parametrosCuerpo.color,
            origen: parametrosCuerpo.origen,
            empresa: parametrosCuerpo.empresa

        } as MarcaEntity;
        try {
            await this._marcaService.editarUno(marcaEdit);
            return res.redirect('/marca/vista/inicio?mensaje=Marca editada correctamente');
        } catch (error) {
            console.error(error);
            return res.redirect('/marca/vista/inicio?mensaje=Error editando marca');
        }

    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._marcaService.eliminarUno(id);
            return res.redirect('/marca/vista/inicio?mensaje=Marca eliminada correctamente');
        } catch (error) {
            console.log(error);
            return res.redirect('/marca/vista/inicio?error=Error eliminando marca');
        }
    }

    @Get('vista/login')
    login(
        @Res() response
    ) {
        response.render('login/login')
    }


    @Post('login')
    loginPost(
        @Body() parametrosConsulta,
        @Res() response,
        @Session() session
    ) {

        const usuario = parametrosConsulta.usuario
        const password = parametrosConsulta.password
        if (usuario == 'Adrian' && password == '1234') {
            session.usuario = usuario
            return response.redirect('/marca/vista/inicio')
        } else {
            return response.redirect('/marca/vista/login?error=Permiso denegado')
        }
    }

    @Get('/vista/logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req
    ){
        session.username=undefined
        req.session.destroy();
        return res.redirect('/marca/login')
    }




}