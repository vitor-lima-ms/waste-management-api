/* Enum imports */
import { MonthsEnum } from "../enums/months.enum";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
/* Response imports */
import { ReportResponse } from "../responses/report.response";
/* Service imports */
import { DisposalPointsService } from "src/modules/disposal-points/providers/dp.service";
import { WastesService } from "src/modules/wastes/providers/wt.service";
/* ReportsService */
@Injectable()
export class ReportsService {
  constructor(
    private disposalPointsService: DisposalPointsService,
    private wastesService: WastesService,
  ) {}
  async getReport(month: MonthsEnum): Promise<ReportResponse> {
    const dpWithHighestNumberOfRecords =
      await this.wastesService.internalDpWithHighestNumberOfRecords();
    return {
      dpWithHighestNumberOfRecords: dpWithHighestNumberOfRecords,
    };
  }
}
