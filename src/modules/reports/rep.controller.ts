/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/common/enums/controllers-route-path-prefixes.enum";
import { MonthsEnum } from "./enums/months.enum";
/* Nest.js imports */
import { Controller, Get, Param } from "@nestjs/common";
/* Pipe imports */
import { customParseEnumPipeGenerator } from "src/common/pipes/custom-parse-enum.pipe";
/* Response imports */
import { ReportResponse } from "./responses/report.response";
/* Service imports */
import { ReportsService } from "./providers/rep.service";
/* ReportsController */
@Controller(`${ControllersRoutePathPrefixesEnum.REPORT}`)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Get(":month")
  getReports(
    @Param("month", customParseEnumPipeGenerator(MonthsEnum)) month: MonthsEnum,
  ): Promise<ReportResponse> {
    return this.reportsService.getReport(month);
  }
}
