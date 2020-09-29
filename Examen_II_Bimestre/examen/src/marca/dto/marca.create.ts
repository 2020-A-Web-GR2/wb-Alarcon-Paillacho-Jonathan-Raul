import {isInt, IsInt, IsPositive, IsString} from "class-validator";

export class MarcaCreate {
    @IsString()
    nombre:string;

    @IsString()
    color:string;

    @IsInt()
    @IsPositive()
    anios:number;

    @IsString()
    origen:string;

    @IsString()
    empresa:string;
}