/* Controllers */
import { ReportsController } from "./rep.controller";
/* Module imports */
import { DisposalPointsModule } from "../disposal-points/dp.module";
import { WastesModule } from "../wastes/wt.module";
/* Nest.js imports */
import { Module } from "@nestjs/common";
/* Service imports */
import { ReportsService } from "./providers/rep.service";
/* ReportsModule */
@Module({
  controllers: [ReportsController],
  imports: [DisposalPointsModule, WastesModule],
  providers: [ReportsService],
})
export class ReportsModule {}
