/* Nest.js imports */
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
/* CustomValidationPipe */
export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory: (validationErrors) => {
    const validationException = validationErrors.map((validationError) => {
      return typeof validationError.constraints === "object"
        ? Object.values(validationError.constraints).join(", ")
        : validationError.constraints;
    });

    return new HttpException(
      validationException.join(", "),
      HttpStatus.BAD_REQUEST,
    );
  },
});
