import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "organizers",
  timestamps: true,
})
class Organizer extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id:number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  organization_name;

  @Column(DataType.STRING)
  contact_number:string;

  @Column(DataType.STRING)
  website:string;

  @Column(DataType.TEXT)
  bio:string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified:boolean;

  @BelongsTo(() => User)
  user:User;
}

export default Organizer;
