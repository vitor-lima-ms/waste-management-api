/* DTO imports */
import { CreateUserDto } from "./create-us.dto";
/* Enum imports */
import { UserEntityPropertiesNamesEnum } from "../enums/us-entity-properties-names.enum";
/* Nest.js imports */
import { PickType } from "@nestjs/swagger";
/* UpdateUserEmailNameAndRoleDto */
export class UpdateUserEmailNameAndRoleDto extends PickType(CreateUserDto, [
  UserEntityPropertiesNamesEnum.EMAIL,
  UserEntityPropertiesNamesEnum.NAME,
  UserEntityPropertiesNamesEnum.ROLE,
] as const) {}
