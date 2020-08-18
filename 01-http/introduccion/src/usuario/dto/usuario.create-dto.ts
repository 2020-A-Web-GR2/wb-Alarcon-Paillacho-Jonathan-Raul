
import {
    IsAlpha, IsDate,
    IsNotEmpty,
    IsNumber, IsPositive, MaxLength, MinLength
} from "class-validator";

export class UsuarioCreateDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id: number;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(12)
    cedula: string;

    @IsAlpha()
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(3)
    nombre: string

    @IsAlpha()
    @MaxLength(20)
    @MinLength(3)
    apellido: string

    @IsDate()
    fechaNacimiento: string
}