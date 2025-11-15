/* Nest.js imports */
import { HttpException, HttpStatus, ParseIntPipe } from "@nestjs/common";
/* CustomParseIntPipe */
export const CustomParseIntPipe = new ParseIntPipe({
  exceptionFactory: () => {
    return new HttpException(
      "Falha na transformação! O parâmetro recebido não pode ser convertido para um número inteiro",
      HttpStatus.BAD_REQUEST,
    );
  },
});
