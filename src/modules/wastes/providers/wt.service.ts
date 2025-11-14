/* DTO imports */
import { CreateWasteDto } from "../dtos/create-wt.dto";
/* Entity imports */
import { WasteEntity } from "../wt.entity";
/* Enum imports */
import { CreateUpdateAndDeleteEnum } from "src/modules/common/utils/messages/enums/cud.enum";
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { EntitiesPtBrNamesEnum } from "src/common/enums/entities-ptbr-names.enum";
import { HttpExceptionMessageContextsEnum } from "src/modules/common/utils/messages/enums/http-exception-message-contexts.enum";
import { WasteEntityPropertiesDbNamesEnum } from "../enums/wt-entity-properties-db-names.enum";
import { WasteEntityPropertiesPtBrNamesEnum } from "../enums/wt-entity-properties-ptbr-names.enum";
/* Helper imports */
import { WastesHelper } from "./wt.helper";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
/* Other libraries imports */
import { Repository } from "typeorm";
/* Response imports */
import { FindAllWastesResponse } from "../responses/find-all-wt.response";
/* Service imports */
import { DisposalPointsService } from "src/modules/disposal-points/providers/dp.service";
import { MessagesUtilsService } from "src/modules/common/utils/messages/providers/messages-utils.service";
import { StringUtilsService } from "src/modules/common/utils/string/providers/string-utils.service";
/* WastesService */
@Injectable()
export class WastesService {
  constructor(
    private disposalPointsService: DisposalPointsService,
    private messagesUtils: MessagesUtilsService,
    private stringUtils: StringUtilsService,
    private wastesHelper: WastesHelper,
    @InjectRepository(WasteEntity)
    private wastesRepository: Repository<WasteEntity>,
  ) {}
  async create(createWasteDto: CreateWasteDto): Promise<string | undefined> {
    const existingDisposalPoint = await this.disposalPointsService.findOneById(
      createWasteDto.wtDpId,
    );
    if (!existingDisposalPoint) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.DISPOSAL_POINT,
          HttpExceptionMessageContextsEnum.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.wastesRepository
      .createQueryBuilder(EntitiesAliasesEnum.WASTE)
      .insert()
      .values({
        wtDatetime: createWasteDto.wtDatetime,
        wtDpId: createWasteDto.wtDpId,
        wtType: createWasteDto.wtType,
        wtUserName: createWasteDto.wtUserName,
      })
      .execute();
    return this.messagesUtils.generateCudSuccessMessage(
      CreateUpdateAndDeleteEnum.CREATE,
      EntitiesPtBrNamesEnum.WASTE,
    );
  }
  async findAll(): Promise<FindAllWastesResponse[]> {
    return await this.wastesRepository
      .createQueryBuilder(EntitiesAliasesEnum.WASTE)
      .select(this.wastesHelper.generateFindAllOrOneSelectColumns())
      .innerJoin(
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().entity,
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().alias,
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().condition,
      )
      .getRawMany<FindAllWastesResponse>();
  }
}
