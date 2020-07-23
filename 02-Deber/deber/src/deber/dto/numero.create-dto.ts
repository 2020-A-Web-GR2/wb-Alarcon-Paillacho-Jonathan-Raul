//@IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()
//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsOptinonal()
//@IsNumber()

import {
    IsNumber,
    IsNotEmpty,
    IsInt
} from "class-validator";

export class NumeroCreateDto {
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    numero1 : number;
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    numero2: number;
}