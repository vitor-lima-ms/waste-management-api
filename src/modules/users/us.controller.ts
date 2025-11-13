/* DTO imports */
import { CreateUserDto } from "./dtos/create-us.dto";
import { UpdateUserEmailNameAndRoleDto } from "./dtos/update-us-email-name-and-role.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/common/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
/* Pipe imports */
import { CustomParseUUIDPipe } from "src/common/pipes/custom-parse-uuid.pipe";
import { CustomValidationPipe } from "src/common/pipes/custom-validation.pipe";
/* Response imports */
import { FindAllUsersResponse } from "./responses/find-all-us.response";
/* Service imports */
import { UsersService } from "./providers/us.service";
import { FindOneUserResponse } from "./responses/find-one-us.response";
/* UsersController */
@Controller(`${ControllersRoutePathPrefixesEnum.USER}`)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  create(
    @Body(CustomValidationPipe)
    createUserDto: CreateUserDto,
  ): Promise<string | undefined> {
    return this.usersService.create(createUserDto);
  }
  @Delete(":id")
  delete(
    @Param("id", CustomParseUUIDPipe) id: string,
  ): Promise<string | undefined> {
    return this.usersService.delete(id);
  }
  @Get()
  findAll(): Promise<FindAllUsersResponse[]> {
    return this.usersService.findAll();
  }
  @Get(":id")
  findOneById(
    @Param("id", CustomParseUUIDPipe) id: string,
  ): Promise<FindOneUserResponse | undefined> {
    return this.usersService.findOneById(id);
  }
  @Patch(":id")
  updateEmailNameAndRole(
    @Param("id", CustomParseUUIDPipe) id: string,
    @Body(CustomValidationPipe) updateUserDto: UpdateUserEmailNameAndRoleDto,
  ): Promise<string | undefined> {
    return this.usersService.updateEmailNameAndRole(id, updateUserDto);
  }
}
