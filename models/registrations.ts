import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user";
import Event from "./event";

@Table({
  tableName: "registrations",
  timestamps: true,
})
class Registration extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id:number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  event_id:number;

  @Column({
    type: DataType.ENUM("booked", "cancelled"),
    defaultValue: "booked",
  })
  status:string;

  @BelongsTo(() => User)
  user:User;

  @BelongsTo(() => Event)
  event:Event;
}

export default Registration;
