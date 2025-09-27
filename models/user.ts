import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Admin from "./admin";
import Organizer from "./organizer";
import Registration from "./registrations";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: "AUTO102"
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM("user", "organizer", "admin"),
    defaultValue: "user",
  })
  role: string;

  @HasMany(() => Admin)
  admins: Admin[];

  @HasMany(() => Organizer)
  organizers: Organizer[];

  @HasMany(() => Registration)
  registrations: Registration[];
}

export default User;
