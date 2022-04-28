const Catelog = require('../models/catelogModel')
const Products = require('../models/productModel')

const catelogController = {
    getCategories: async(req, res) =>{
        try {
            const catelogs = await Catelog.find()
            res.json(catelogs)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCatelog: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update catelog
            const {name} = req.body;
            const catelog = await Catelog.findOne({name})
            if(catelog) return res.status(400).json({msg: "This catelog already exists."})

            const newCatelog = new Catelog({name})

            await newCatelog.save()
            res.json({msg: "Created a catelog"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCatelog: async(req, res) =>{
        try {
            const products = await Products.findOne({catelog: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Catelog.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Catelog"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCatelog: async(req, res) =>{
        try {
            const {name} = req.body;
            await Catelog.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a catelog"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = catelogController;