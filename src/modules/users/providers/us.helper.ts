/* Enum imports */
import { UserEntityPropertiesDbNamesEnum } from "../enums/us-entity-properties-db-name.enum";
import { UserEntityPropertiesNamesEnum } from "../enums/us-entity-properties-names.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
/* UsersHelper */
@Injectable()
export class UsersHelper {
  constructor(private dbUtils: DbUtilsService) {}
  generateFindAllOrOneSelectColumns(): string {
    return `${UserEntityPropertiesDbNamesEnum.EMAIL} as ${this.dbUtils.generateColumnAliasForSelectQuery(UserEntityPropertiesNamesEnum.EMAIL)},
    \t\t${UserEntityPropertiesDbNamesEnum.ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(UserEntityPropertiesNamesEnum.ID)},
    \t\t${UserEntityPropertiesDbNamesEnum.NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(UserEntityPropertiesNamesEnum.NAME)},
    \t\t${UserEntityPropertiesDbNamesEnum.ROLE} as ${this.dbUtils.generateColumnAliasForSelectQuery(UserEntityPropertiesNamesEnum.ROLE)}`;
  }
  verifyIfConfirmPasswordEqualsToPassword(
    confirmPassword: string,
    password: string,
  ): boolean {
    if (confirmPassword === password) {
      return true;
    }
    return false;
  }
}
