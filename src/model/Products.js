import db from "../../config/db.js";
import { DataTypes } from "sequelize";
import { v4 } from "uuid";


const Products = db.define('products', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: v4()
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    category: {
        type: DataTypes.STRING,
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    images0: {
        type: DataTypes.STRING,
    },
    images1: {
        type: DataTypes.STRING,
    },
    images2: {
        type: DataTypes.STRING,
    },
    images3: {
        type: DataTypes.STRING,
    },
    images4: {
        type: DataTypes.STRING,
    },
}, {timestamps: false, freezeTableName: true})

export default Products;