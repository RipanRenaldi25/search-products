import Products from "../model/Products.js";
import { Op, fn } from "sequelize";
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
        let { title="", orderBy="price", sort='asc', maxPrice=99999999999, minPrice=0, category=['all'] } = req.query;
        if(category[0] !== 'all'){
            category = req.query.category.split(",");
        }else{
            // Set Default Value of Categories equal To All Categories in Database
            category = await Products.findAll({attributes: ['category']});
            category = category.map(value=>value.category);
            category = [...new Set(category)];
        }
        const products = await Products.findAll({
            where: {
                [Op.and]: [
                    {
                        title: {
                            [Op.like]: `%${title}%`
                        }
                    },
                    {
                        category: {
                            [Op.in]: [...category]
                        }
                    },
                    {
                        price: {
                            [Op.between]: [minPrice, maxPrice]
                        }
                    }
                ]
            },
            order:[
                [orderBy, sort]
            ]
            
        })
        if( !products.length ){
            return res.status(404).json({message: 'Data Not Found', data: products});
        }
        res.status(200).json({message: 'Data Founded', products});
    }catch(e){
        return res.status(400).json({message: e.message});
    }
}