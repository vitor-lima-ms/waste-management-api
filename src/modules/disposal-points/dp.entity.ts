/* Entity imports */
import { AbstractEntity } from "src/common/entities/abstract.entity";
/* Enum imports */
import { DbConstraintsEnum } from "src/common/enums/db-constraints.enum";
import { DisposalPointEntityPropertiesDbNamesEnum } from "./enums/dp-entity-properties-db-names.enum";
import { DisposalPointEntityPropertiesNamesEnum } from "./enums/dp-entity-properties-names.enum";
import { LocalitiesTypesEnum } from "./enums/localities-types.enum";
import { WastesCategoriesEnum } from "../wastes/enums/wastes-categories.enum";
/* Utils imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* Other libraries imports */
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
/* DisposalPointEntity */
@Entity({ name: "Disposal_Point" })
@Unique(
  MessagesUtilsClass.generateDbConstraintsNames(DbConstraintsEnum.UNIQUE, [
    DisposalPointEntityPropertiesDbNamesEnum.LATITUDE,
    DisposalPointEntityPropertiesDbNamesEnum.LONGITUDE,
  ]),
  [
    DisposalPointEntityPropertiesNamesEnum.LATITUDE,
    DisposalPointEntityPropertiesNamesEnum.LONGITUDE,
  ],
)
export class DisposalPointEntity extends AbstractEntity {
  @Column({
    name: DisposalPointEntityPropertiesDbNamesEnum.ACCEPTED_WASTE_CATEGORY,
    enum: WastesCategoriesEnum,
  })
  dpAcceptedWasteCategory: WastesCategoriesEnum;
  @PrimaryGeneratedColumn("uuid", {
    name: DisposalPointEntityPropertiesDbNamesEnum.ID,
    primaryKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.PK,
      [DisposalPointEntityPropertiesDbNamesEnum.ID],
    ),
  })
  dpId: string;
  @Column({
    name: DisposalPointEntityPropertiesDbNamesEnum.LATITUDE,
    scale: 6,
    type: "decimal",
  })
  /**
   * Considerei como tipo string na classe pois esse valor é retornado como string nas consultas
   */
  dpLatitude: string;
  @Column({ name: DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_NAME })
  dpLocalityName: string;
  @Column({
    name: DisposalPointEntityPropertiesDbNamesEnum.LOCALITY_TYPE,
    enum: LocalitiesTypesEnum,
  })
  dpLocalityType: LocalitiesTypesEnum;
  @Column({
    name: DisposalPointEntityPropertiesDbNamesEnum.LONGITUDE,
    scale: 6,
    type: "decimal",
  })
  /**
   * Considerei como tipo string na classe pois esse valor é retornado como string nas consultas
   */
  dpLongitude: string;
  @Column({ name: DisposalPointEntityPropertiesDbNamesEnum.NEIGHBORHOOD })
  dpNeighborhood: string;
}
