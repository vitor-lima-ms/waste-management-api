/* Entity imports */
import { UserEntity } from "../us.entity";
/* Enum imports */
import { UserEntityPropertiesNamesEnum } from "../enums/us-entity-properties-names.enum";
/* Nest.js imports */
import { PickType } from "@nestjs/swagger";
/* FindAllUsersResponse */
export class FindAllUsersResponse extends PickType(UserEntity, [
  UserEntityPropertiesNamesEnum.EMAIL,
  UserEntityPropertiesNamesEnum.ID,
  UserEntityPropertiesNamesEnum.NAME,
  UserEntityPropertiesNamesEnum.ROLE,
] as const) {}
