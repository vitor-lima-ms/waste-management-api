/* Controller imports */
import { UsersController } from "./us.controller";
/* Entity imports */
import { UserEntity } from "./us.entity";
/* Helper imports */
import { UsersHelper } from "./providers/us.helper";
/* Nest.js imports */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
/* Service imports */
import { UsersService } from "./providers/us.service";
/* UsersModule */
@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersHelper, UsersService],
})
export class UsersModule {}
