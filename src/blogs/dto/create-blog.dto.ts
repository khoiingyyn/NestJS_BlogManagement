/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
export class CreateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    author: string;

    date: Date;
}