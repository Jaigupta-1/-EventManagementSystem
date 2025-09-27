import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Organizer from "./organizer";

@Table({
  tableName: "events",
  timestamps: true,
})
class Event extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title:string;

  @Column(DataType.TEXT)
  description:string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date:string;

  @Column(DataType.STRING)
  venue:string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity:number;

  @ForeignKey(() => Organizer)
  @Column({
    type: DataType.INTEGER,
  })
  organizer_id:number;

  @Column({
    type: DataType.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  })
  status:string;

  @BelongsTo(() => Organizer)
  organizer:Organizer;
}

export default Event;
