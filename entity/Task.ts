import "reflect-metadata";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryColumn("character varying")
  id: string;

  @Column("character varying")
  status: string;

  @Column({ type: "character varying", nullable: true })
  result: string;
}
