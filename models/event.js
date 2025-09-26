import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Organizer from "./Organizer.js";

const Event = sequelize.define("Event", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    date: { type: DataTypes.DATE, allowNull: false },
    venue: DataTypes.STRING,
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    organizer_id: { type: DataTypes.INTEGER, references: { model: Organizer, key: "id" } },
    status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
}, {
    tableName: "events",
    timestamps: true,
});

Event.belongsTo(Organizer, { foreignKey: "organizer_id" });

export default Event;
