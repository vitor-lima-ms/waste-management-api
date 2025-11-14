/* Entity imports */
import { DisposalPointEntity } from "../dp.entity";
/* Enum imports */
import { DisposalPointEntityPropertiesNamesEnum } from "../enums/dp-entity-properties-names.enum";
/* Nest.js imports */
import { PickType } from "@nestjs/swagger";
/* FindAllDisposalPointsResponse */
export class FindAllDisposalPointsResponse extends PickType(
  DisposalPointEntity,
  [
    DisposalPointEntityPropertiesNamesEnum.ACCEPTED_WASTE_CATEGORY,
    DisposalPointEntityPropertiesNamesEnum.ID,
    DisposalPointEntityPropertiesNamesEnum.LATITUDE,
    DisposalPointEntityPropertiesNamesEnum.LOCALITY_NAME,
    DisposalPointEntityPropertiesNamesEnum.LOCALITY_TYPE,
    DisposalPointEntityPropertiesNamesEnum.LONGITUDE,
    DisposalPointEntityPropertiesNamesEnum.NEIGHBORHOOD,
  ] as const,
) {}
