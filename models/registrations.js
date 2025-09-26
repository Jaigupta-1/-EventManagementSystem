import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Event from "./Event.js";

const Registration = sequelize.define("Registration", {
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    event_id: { type: DataTypes.INTEGER, references: { model: Event, key: "id" } },
    status: { type: DataTypes.ENUM("booked", "cancelled"), defaultValue: "booked" },
}, {
    tableName: "registrations",
    timestamps: true,
});

Registration.belongsTo(User, { foreignKey: "user_id" });
Registration.belongsTo(Event, { foreignKey: "event_id" });

export default Registration;
