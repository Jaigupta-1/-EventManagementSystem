import { DataType } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Admin = sequelize.define("Admin", {
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    employee_id: { type: DataTypes.STRING, unique: true },
    designation: DataTypes.STRING,
    permissions: { type: DataTypes.JSONB, defaultValue: {} },
}, {
    tableName: "admins",
    timestamps: true,
});

Admin.belongsTo(User, { foreignKey: "user_id" });

export default Admin;
