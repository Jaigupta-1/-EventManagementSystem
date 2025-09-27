import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "admins",
  timestamps: true,
})
class Admin extends Model {
  // Relation with User
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id:number;

  // Employee ID (unique identifier, string)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  employee_id:number;

  // Designation
  @Column({
    type: DataType.STRING(100),
  })
  designation:string;

  // Permissions JSON
  @Column({
    type: DataType.JSONB,
    defaultValue: {},
  })
  permissions:object;

  // Belongs to User
  @BelongsTo(() => User)
  user:User;
}

export default Admin;
