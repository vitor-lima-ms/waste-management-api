/* DTO imports */
import { CreateDisposalPointDto } from "./dtos/create-dp.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/common/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Body, Controller, Get, Post } from "@nestjs/common";
/* Pipe imports */
import { CustomValidationPipe } from "src/common/pipes/custom-validation.pipe";
/* Response imports */
import { FindAllDisposalPointsResponse } from "./responses/find-all-dp.response";
/* Service imports */
import { DisposalPointsService } from "./providers/dp.service";
/* DisposalPointsController */
@Controller(`${ControllersRoutePathPrefixesEnum.DISPOSAL_POINT}`)
export class DisposalPointsController {
  constructor(private disposalPointsService: DisposalPointsService) {}
  @Post()
  create(
    @Body(CustomValidationPipe) createDisposalPointDto: CreateDisposalPointDto,
  ): Promise<string | undefined> {
    return this.disposalPointsService.create(createDisposalPointDto);
  }
  @Get()
  findAll(): Promise<FindAllDisposalPointsResponse[]> {
    return this.disposalPointsService.findAll();
  }
}
