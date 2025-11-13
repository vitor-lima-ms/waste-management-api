/* Enum imports */
import { ClassValidatorDecoratorsNamesEnum } from "src/common/utils/messages/enums/class-validator-decorators-names.enum";
import { RolesEnum } from "src/common/enums/roles.enum";
import { UserEntityPropertiesPtBrNamesEnum } from "../enums/us-entity-properties-ptbr-names.enum";
/* Other libraries imports */
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  IsStrongPasswordOptions,
} from "class-validator";
/* Util imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* IsStrongPassword options*/
const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  minUppercase: 1,
};
/* CreateUserDto */
export class CreateUserDto {
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      "confirmação de senha",
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  usConfirmPassword: string;
  @IsEmail(
    { domain_specific_validation: true },
    {
      message: MessagesUtilsClass.generateClassValidatorErrorMessage(
        UserEntityPropertiesPtBrNamesEnum.EMAIL,
        ClassValidatorDecoratorsNamesEnum.IS_EMAIL,
      ),
    },
  )
  usEmail: string;
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      UserEntityPropertiesPtBrNamesEnum.NAME,
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  usName: string;
  @IsNotEmpty({
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      UserEntityPropertiesPtBrNamesEnum.PASSWORD,
      ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY,
    ),
  })
  @IsStrongPassword(strongPasswordOptions, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      UserEntityPropertiesPtBrNamesEnum.PASSWORD,
      ClassValidatorDecoratorsNamesEnum.IS_STRONG_PASSWORD,
      { strongPasswordOptions: strongPasswordOptions },
    ),
  })
  usPassword: string;
  @IsEnum(RolesEnum, {
    message: MessagesUtilsClass.generateClassValidatorErrorMessage(
      UserEntityPropertiesPtBrNamesEnum.ROLE,
      ClassValidatorDecoratorsNamesEnum.IS_ENUM,
      { enumValues: RolesEnum },
    ),
  })
  usRole: RolesEnum;
}
