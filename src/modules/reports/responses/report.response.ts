/* Enum imports */
import { WastesTypesEnum } from "src/modules/wastes/enums/wastes-types.enum";
/* Response imports */
import { FindOneDisposalPointResponse } from "src/modules/disposal-points/responses/find-one-dp.response";
/* ReportResponse */
export class ReportResponse {
  discardAverageOverPast30Days?: number;
  disposalVariationComparedToLastMonth?: number;
  dpWithHighestNumberOfRecords?: FindOneDisposalPointResponse;
  mostDiscardedWtType?: WastesTypesEnum;
  totalDp?: number;
  totalUs?: number;
}
