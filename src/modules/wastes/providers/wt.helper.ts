/* Entity imports */
import { DisposalPointEntity } from "src/modules/disposal-points/dp.entity";
/* Enum imports */
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { DisposalPointEntityPropertiesDbNamesEnum } from "src/modules/disposal-points/enums/dp-entity-properties-db-names.enum";
import { DisposalPointEntityPropertiesNamesEnum } from "src/modules/disposal-points/enums/dp-entity-properties-names.enum";
import { WasteEntityPropertiesDbNamesEnum } from "../enums/wt-entity-properties-db-names.enum";
import { WasteEntityPropertiesNamesEnum } from "../enums/wt-entity-properties-names.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Response imports */
import { FindAllWastesResponse } from "../responses/find-all-wt.response";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
import { StringUtilsService } from "src/modules/common/utils/string/providers/string-utils.service";
/* Type imports */
import { TypeOrmInnerJoinParametersObjectType } from "src/common/types/typeorm-inner-join-parameters-object";
/* WastesHelper */
@Injectable()
export class WastesHelper {
  constructor(
    private dbUtils: DbUtilsService,
    private stringUtils: StringUtilsService,
  ) {}
  generateFindAllOrOneSelectColumns(): string {
    return `${EntitiesAliasesEnum.DISPOSAL_POINT}.${DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(DisposalPointEntityPropertiesNamesEnum.LOCALITY_NAME)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DATE} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.DATE)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.DISPOSAL_POINT_ID)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.ID)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.TYPE} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.TYPE)},
    \t\t${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.USER_NAME} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.USER_NAME)}`;
  }
  generateInnerJoinWithDisposalPointEntity(): TypeOrmInnerJoinParametersObjectType {
    return {
      alias: EntitiesAliasesEnum.DISPOSAL_POINT,
      condition: `${EntitiesAliasesEnum.DISPOSAL_POINT}.${DisposalPointEntityPropertiesDbNamesEnum.ID} = ${EntitiesAliasesEnum.WASTE}.${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID}`,
      entity:
        this.dbUtils.generateEntityToStringForInnerJoinQuery(
          DisposalPointEntity,
        ),
    };
  }
}
