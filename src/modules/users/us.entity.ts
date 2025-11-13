/* Enum imports */
import { AbstractEntityPropertiesDbNamesEnum } from "src/common/enums/abstract-entity-properties-db-names.enum";
import { DbConstraintsEnum } from "src/common/enums/db-constraints.enum";
import { RolesEnum } from "src/common/enums/roles.enum";
import { UserEntityPropertiesDbNamesEnum } from "./enums/us-entity-properties-db-name.enum";
import { UserEntityPropertiesNamesEnum } from "./enums/us-entity-properties-names.enum";
/* Utils imports */
import { MessagesUtilsClass } from "src/common/utils/messages/messages-utils.class";
/* Other libraries imports */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
/* UserEntity */
@Entity({ name: "User" })
@Unique(
  MessagesUtilsClass.generateDbConstraintsNames(DbConstraintsEnum.UNIQUE, [
    UserEntityPropertiesDbNamesEnum.EMAIL,
  ]),
  [UserEntityPropertiesNamesEnum.EMAIL],
)
@Unique(
  MessagesUtilsClass.generateDbConstraintsNames(DbConstraintsEnum.UNIQUE, [
    UserEntityPropertiesDbNamesEnum.PASSWORD_RESET_TOKEN,
  ]),
  [UserEntityPropertiesNamesEnum.PASSWORD_RESET_TOKEN],
)
export class UserEntity {
  @CreateDateColumn({
    name: AbstractEntityPropertiesDbNamesEnum.CREATED_AT,
    type: "timestamp with time zone",
  })
  createdAt: Date;
  @JoinColumn({
    name: AbstractEntityPropertiesDbNamesEnum.CREATED_BY_ID,
    foreignKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.FK,
      [UserEntityPropertiesDbNamesEnum.ID, `${Math.random() * 100 + 1}`],
    ),
    referencedColumnName: UserEntityPropertiesNamesEnum.ID,
  })
  @OneToOne(() => UserEntity, { nullable: true })
  createdById: string;
  @UpdateDateColumn({
    name: AbstractEntityPropertiesDbNamesEnum.UPDATED_AT,
    type: "timestamp with time zone",
  })
  updatedAt: Date;
  @JoinColumn({
    name: AbstractEntityPropertiesDbNamesEnum.UPDATED_BY_ID,
    foreignKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.FK,
      [UserEntityPropertiesDbNamesEnum.ID, `${Math.random() * -100 - 1}`],
    ),
    referencedColumnName: UserEntityPropertiesNamesEnum.ID,
  })
  @OneToOne(() => UserEntity, { nullable: true })
  updatedById: string;
  @Column({ name: UserEntityPropertiesDbNamesEnum.EMAIL })
  usEmail: string;
  @PrimaryGeneratedColumn("uuid", {
    name: UserEntityPropertiesDbNamesEnum.ID,
    primaryKeyConstraintName: MessagesUtilsClass.generateDbConstraintsNames(
      DbConstraintsEnum.PK,
      [UserEntityPropertiesDbNamesEnum.ID],
    ),
  })
  usId: string;
  @Column({ name: UserEntityPropertiesDbNamesEnum.NAME })
  usName: string;
  @Column({ name: UserEntityPropertiesDbNamesEnum.PASSWORD })
  usPassword: string;
  @Column({
    name: UserEntityPropertiesDbNamesEnum.PASSWORD_RESET_EXPIRES,
    nullable: true,
  })
  usPasswordResetExpires: Date;
  @Column({
    name: UserEntityPropertiesDbNamesEnum.PASSWORD_RESET_TOKEN,
    nullable: true,
  })
  usPasswordResetToken: string;
  @Column({ name: UserEntityPropertiesDbNamesEnum.ROLE })
  usRole: RolesEnum;
}
