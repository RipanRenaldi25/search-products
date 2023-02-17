import Products from "../model/Products.js";
import { QueryTypes } from "sequelize";
export const getAllData = async ( req, res ) => {
    try{
        const products = await Products.findAll();
        if(!products){
            return res.status(404).json({message: 'Data Not Found', data: products});
        }
        res.status(200).json({message: 'Data Founded', products});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}
export const getProductById = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Products.findOne({where: {id}});
        res.status(200).json({message: 'Data Founded', data: product});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}
export const getProductsByTitle = async (req,res) => {
    try{
        const { title } = req.query;
        const products = await Products.sequelize.query(`SELECT * FROM products WHERE title like '%iphone%'`, {type: QueryTypes.SELECT});
        if( !products ){
            return res.status(404).json({message: 'Data Not Found', data: products});
        }
        res.status(200).json({message: 'Data Founded', products});
    }catch(e){
        return res.status(400).json({message: e.message});
    }
}