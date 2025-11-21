/* Enum imports */
import { ClassValidatorDecoratorsNamesEnum } from "src/common/utils/messages/enums/class-validator-decorators-names.enum";
import { DisposalPointEntityPropertiesPtBrNamesEnum } from "../enums/dp-entity-properties-ptbr-names.enum";
import { LocalitiesTypesEnum } from "../enums/localities-types.enum";
import { WastesCategoriesEnum } from "src/modules/wastes/enums/wastes-categories.enum";
/* Other libraries imports */
import { IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
/* Util imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* CreateDisposalPointDto */
export class CreateDisposalPointDto {
  @IsEnum(WastesCategoriesEnum, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      DisposalPointEntityPropertiesPtBrNamesEnum.ACCEPTED_WASTE_CATEGORY,
      ClassValidatorDecoratorsNamesEnum.IS_ENUM,
      { enumValues: WastesCategoriesEnum },
    ),
  })
  dpAcceptedWasteCategory: WastesCategoriesEnum;
  @IsNumberString(
    { locale: "en-US" },
    {
      message: MessagesUtilsClass.generateClassValidatorErrorMessage(
        DisposalPointEntityPropertiesPtBrNamesEnum.LATITUDE,
        ClassValidatorDecoratorsNamesEnum.IS_NUMBER,
      ),
    },
  )
  dpLatitude: number;
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      DisposalPointEntityPropertiesPtBrNamesEnum.LOCALITY_NAME,
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  dpLocalityName: string;
  @IsEnum(LocalitiesTypesEnum, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      DisposalPointEntityPropertiesPtBrNamesEnum.LOCALITY_TYPE,
      ClassValidatorDecoratorsNamesEnum.IS_ENUM,
      { enumValues: LocalitiesTypesEnum },
    ),
  })
  dpLocalityType: LocalitiesTypesEnum;
  @IsNumberString(
    { locale: "en-US" },
    {
      message: MessagesUtilsClass.generateClassValidatorErrorMessage(
        DisposalPointEntityPropertiesPtBrNamesEnum.LONGITUDE,
        ClassValidatorDecoratorsNamesEnum.IS_NUMBER,
      ),
    },
  )
  dpLongitude: number;
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      DisposalPointEntityPropertiesPtBrNamesEnum.NEIGHBORHOOD,
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  dpNeighborhood: string;
}
