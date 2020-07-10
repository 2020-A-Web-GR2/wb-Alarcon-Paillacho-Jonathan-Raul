//@IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()
//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsOptinonal()
//@IsNumber()

//Librería class validator

import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto{
    //podemos poner el tipo de datos pero no validan si se se guarda es tipo de dato
    //solo estamos tipando los datos más no estamos haciendo la validación de los datos


    //para hacer las validaciones
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(30)
    @MinLength(6)
    nombre: String;
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad: number; //enteros
    @IsNotEmpty()
    @IsBoolean()
    vivo: boolean;
    @IsOptional()
    @IsBoolean()
    hijos?: boolean; //este es una variables opcional, existe o no existe
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso: number; //decimales





}