/* Controller imports */
import { WastesController } from "./wt.controller";
/* Entity imports */
import { WasteEntity } from "./wt.entity";
/* Helper imports */
import { WastesHelper } from "./providers/wt.helper";
/* Module imports */
import { DisposalPointsModule } from "../disposal-points/dp.module";
/* Nest.js imports */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
/* Service imports */
import { WastesService } from "./providers/wt.service";
/* WastesModule */
@Module({
  controllers: [WastesController],
  exports: [WastesService],
  imports: [DisposalPointsModule, TypeOrmModule.forFeature([WasteEntity])],
  providers: [WastesHelper, WastesService],
})
export class WastesModule {}
