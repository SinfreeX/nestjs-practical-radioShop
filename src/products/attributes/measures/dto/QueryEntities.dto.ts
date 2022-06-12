import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class QueryEntities {
  readonly in?: 'attr'
  readonly word?: string
}