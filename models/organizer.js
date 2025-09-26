import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Organizer = sequelize.define(
    "Organizer",
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
        },
        organization_name: { type: DataTypes.STRING, allowNull: false },
        contact_number: DataTypes.STRING,
        website: DataTypes.STRING,
        bio: DataTypes.TEXT,
        verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: "Organizers",
        timestamps: true,
    }
);

Organizer.belongsTo(User, { foreignKey: "user_id" });

export default Organizer;
