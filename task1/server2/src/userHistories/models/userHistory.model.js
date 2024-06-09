import { DataTypes } from "sequelize";
import { sequelize } from "../../core/database/db.js";

export const UserHistoryModel = sequelize.define('user_histories', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON
        }
    }, 
    {
    timestamps: true
    }
)