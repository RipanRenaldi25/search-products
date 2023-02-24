import Products from "../model/Products.js";
import { Op } from "sequelize";
import { getCategoryFromSearchParams, uniqCategory } from "../utils/utils.js";
export const getAllProducts = async ( req, res ) => {
    try{
        const products = await Products.findAll(); 
        if( !products ) {
            return res.status(404).json({message: 'Data Not Found', products});
        }
        res.status(200).json({message: 'Products Founded', products});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const getProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Products.findOne({where: {id}});
        if (!product) {
            res.status(404).json({message: "Product Not Found", product: []});
        }
        res.status(200).json({message: 'Product Founded', product});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}

export const getProductsByTitle = async (req, res) => {
    try {
        let { title="", orderBy="price", sort='asc', maxPrice=99999999999, minPrice=0, category=['all'] } = req.query;
        if ( category[0] !== 'all' ) {
            category = getCategoryFromSearchParams(req.query.category);
        } else {
            category = await Products.findAll({attributes: ['category']});
            category = uniqCategory(category);
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
        if( !products.length ) {
            return res.status(404).json({message: 'Data Not Found', data: products});
        }
        res.status(200).json({message: 'Data Founded', products});
    } catch(e) {
        return res.status(400).json({message: e.message});
    }
}

export const getProductCategories =  async (req, res) => {
    try{
        const categories = await Products.findAll({attributes: ['category']});
        res.status(200).json({message: 'Found Categories', categories: uniqCategory(categories)});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const getProductsByCategory = async (req,res) => {
    try{
        const { category } = req.params;
        const products = await Products.findAll({where: {category}});
        if( !products.length ){
            res.status(404).json({message: 'Product Not Found', products})
        }
        res.status(200).json({message: 'Product Founded', products});
    }catch(e){
        res.status(400).json({message: e.message});
    }
}