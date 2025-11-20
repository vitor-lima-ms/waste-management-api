/* Nest.js imports */
import { HttpException, HttpStatus, ParseEnumPipe } from "@nestjs/common";
/* customParseEnumPipeGenerator */
export const customParseEnumPipeGenerator = (
  enum_: Record<string, number | string>,
) => {
  const enumValues = Object.values(enum_);

  let acceptableValue = "";

  let acceptableValues = "";

  let httpExceptionMessage = "";

  if (enumValues.length === 1) {
    acceptableValue = `${enumValues[0].toString()}`;

    httpExceptionMessage = `O parâmetro enviado deve ser igual ao seguinte valor: ${acceptableValue}`;
  } else {
    const lastEnumValue = enumValues.pop();

    const enumValuesWithoutLastValue = enumValues.filter(
      (value) => value !== lastEnumValue,
    );

    acceptableValues = `${enumValuesWithoutLastValue.join(", ")} ou ${lastEnumValue}`;

    httpExceptionMessage = `O parâmetro enviado deve ser igual à um dos seguintes valores: ${acceptableValues}`;
  }
  return new ParseEnumPipe(enum_, {
    exceptionFactory: () => {
      return new HttpException(httpExceptionMessage, HttpStatus.BAD_REQUEST);
    },
  });
};
