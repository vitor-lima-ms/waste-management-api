/* Nest.js imports */
import { HttpException, HttpStatus, ParseUUIDPipe } from "@nestjs/common";
/* CustomParseUuidPipe */
export const CustomParseUuidPipe = new ParseUUIDPipe({
  exceptionFactory: () => {
    return new HttpException(
      "O parâmetro recebido não é um UUID válido",
      HttpStatus.BAD_REQUEST,
    );
  },
});
