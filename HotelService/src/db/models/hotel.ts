import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import sequelize from "./sequelize";
import { CreateContextOptions } from "vm";

class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
  declare rating?: number;
  declare rating_count?: number;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "STRING",
      allowNull: false,
    },
    address: {
      type: "STRING",
      allowNull: false,
    },
    location: {
      type: "STRING",
      allowNull: false,
    },
    createdAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    deleted_at: {
      type: "DATE",
      defaultValue: null,
    },
    rating: {
      type: "FLOAT",
      defaultValue: null,
    },
    rating_count: {
      type: "INTEGER",
      defaultValue: null,
    },
  },
  {
    tableName: "hotels",
    sequelize: sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default Hotel;
