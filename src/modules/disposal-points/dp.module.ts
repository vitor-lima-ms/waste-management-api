/* Controller imports */
import { DisposalPointsController } from "./dp.controller";
/* Entity imports */
import { DisposalPointEntity } from "./dp.entity";
/* Helper imports */
import { DisposalPointsHelper } from "./providers/dp.helper";
/* Nest.js imports */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
/* Service imports */
import { DisposalPointsService } from "./providers/dp.service";
/* DisposalPointsModule */
@Module({
  controllers: [DisposalPointsController],
  exports: [DisposalPointsService],
  imports: [TypeOrmModule.forFeature([DisposalPointEntity])],
  providers: [DisposalPointsHelper, DisposalPointsService],
})
export class DisposalPointsModule {}
