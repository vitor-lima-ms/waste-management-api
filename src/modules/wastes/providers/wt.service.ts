/* DTO imports */
import { CreateWasteDto } from "../dtos/create-wt.dto";
import { FilterWastesDto } from "../dtos/filter-wt.dto";
/* Entity imports */
import { WasteEntity } from "../wt.entity";
/* Enum imports */
import { CreateUpdateAndDeleteEnum } from "src/modules/common/utils/messages/enums/cud.enum";
import { EntitiesAliasesEnum } from "src/common/enums/entities-aliases.enum";
import { EntitiesPtBrNamesEnum } from "src/common/enums/entities-ptbr-names.enum";
import { HttpExceptionMessageContextsEnum } from "src/modules/common/utils/messages/enums/http-exception-message-contexts.enum";
import { SqlAggregateFunctionsEnum } from "src/modules/common/utils/db/enums/sql-aggregate-functions.enum";
import { SqlDataTypesEnum } from "src/modules/common/utils/db/enums/sql-data-types.enum";
/* Helper imports */
import { WastesHelper } from "./wt.helper";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
/* Other libraries imports */
import { Repository } from "typeorm";
/* Response imports */
import { DpWithHighestNumberOfRecordsResponse } from "../responses/dp-with-highest-number-of-records.response";
import { FindAllWastesResponse } from "../responses/find-all-wt.response";
import { FindOneDisposalPointResponse } from "src/modules/disposal-points/responses/find-one-dp.response";
/* Service imports */
import { DbUtilsService } from "src/modules/common/utils/db/providers/db-utils.service";
import { DisposalPointsService } from "src/modules/disposal-points/providers/dp.service";
import { MessagesUtilsService } from "src/modules/common/utils/messages/providers/messages-utils.service";
import { WasteEntityPropertiesDbNamesEnum } from "../enums/wt-entity-properties-db-names.enum";
import { WasteEntityPropertiesNamesEnum } from "../enums/wt-entity-properties-names.enum";
/* WastesService */
@Injectable()
export class WastesService {
  constructor(
    private dbUtils: DbUtilsService,
    private disposalPointsService: DisposalPointsService,
    private messagesUtils: MessagesUtilsService,
    private wastesHelper: WastesHelper,
    @InjectRepository(WasteEntity)
    private wastesRepository: Repository<WasteEntity>,
  ) {}
  async create(createWasteDto: CreateWasteDto): Promise<string | undefined> {
    const existingDisposalPoint =
      await this.disposalPointsService.internalFindOneById(
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
  async findByFilter(
    filterWastesDto: FilterWastesDto,
  ): Promise<FindAllWastesResponse[]> {
    const notUndefinedDtoPropsMap =
      this.wastesHelper.getFilterDtoProps(filterWastesDto);
    const queryBuilder = this.wastesRepository
      .createQueryBuilder(EntitiesAliasesEnum.WASTE)
      .select(this.wastesHelper.generateFindAllOrOneSelectColumns())
      .innerJoin(
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().entity,
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().alias,
        this.wastesHelper.generateInnerJoinWithDisposalPointEntity().condition,
      );
    let counter = 0;
    notUndefinedDtoPropsMap.forEach((value, key) => {
      const valueIsDate = isNaN(new Date(value).getTime()) ? false : true;
      let whereClause = "";
      const parameterKey = `value${counter}`;
      if (valueIsDate) {
        whereClause = `${EntitiesAliasesEnum.WASTE}.${key}${this.dbUtils.generatePostgreSqlDoubleColonOperator(SqlDataTypesEnum.DATE)} = :${parameterKey}`;
      } else {
        whereClause = `${EntitiesAliasesEnum.WASTE}.${key} = :${parameterKey}`;
      }
      if (counter === 0) {
        queryBuilder.where(whereClause).setParameter(`${parameterKey}`, value);
      } else {
        queryBuilder
          .andWhere(whereClause)
          .setParameter(`${parameterKey}`, value);
      }
      counter++;
    });
    return queryBuilder.getRawMany<FindAllWastesResponse>();
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
  async internalDpWithHighestNumberOfRecords(): Promise<FindOneDisposalPointResponse> {
    const dpIdOrderedByCount = await this.wastesRepository
      .createQueryBuilder(EntitiesAliasesEnum.WASTE)
      .select(
        `${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID} as ${this.dbUtils.generateColumnAliasForSelectQuery(WasteEntityPropertiesNamesEnum.DISPOSAL_POINT_ID)},
        ${this.dbUtils.generateAggregateFunction(SqlAggregateFunctionsEnum.COUNT, WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID)}${this.dbUtils.generatePostgreSqlDoubleColonOperator(SqlDataTypesEnum.INT)}`,
      )
      .groupBy(`${WasteEntityPropertiesDbNamesEnum.DISPOSAL_POINT_ID}`)
      .orderBy(SqlAggregateFunctionsEnum.COUNT, "DESC")
      .getRawMany<DpWithHighestNumberOfRecordsResponse>();
    const dpIdWithHighestNumberOfRecords = dpIdOrderedByCount[0].wtDpId;
    const dpWithHighestNumberOfRecords =
      await this.disposalPointsService.internalFindOneById(
        dpIdWithHighestNumberOfRecords,
      );
    return dpWithHighestNumberOfRecords!;
  }
}
