const router = require("express").Router();
const categoryHelper = require("../helperFunctions/categoryHelper")

router.get("/", async (req,res)=>{
        try{
            let getCategories = categoryHelper.find();
            res.status(200).json(getCategories);
        }catch(error){
            res.status(500).json({
                errorMessage:
                "Sorry something went wrong getting all categories"
            })
            throw new Error(error)
        }
})

router.get("/:id", async (req,res)=>{
    try{
        let categoryId = req.params.id;
        let findCategory = categoryHelper.findById(categoryId);

        res.status(200).json(findCategory);
    }catch(error){
        res.status(500),json({
            errorMessage:
            "Sorry something went wrong finding category"
        })
    }
})

router.get("/:name", async (req,res)=>{
    try{
        let categoryName = req.params.name;
        let getCategoryByName = categoryHelper.findByname(categoryName);

        res.status(200).json(getCategoryByName);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong getting category"
        })
        throw new Error(error)
    }
})

router.get("/recipes/:name", async (req,res)=>{
    try{
        let categoryName = req.params.name;
        let getRecipesInCategory = categoryHelper.findAllRecipesInCategory(categoryName);
        
        res.status(200).json(getRecipesInCategory);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong getting all recipes in category"
        })
        throw new Error(error)
    }
})

router.post("/", async (req,res)=>{
    try{
        let newCategory = req.body;
        let addCategory = categoryHelper.add(newCategory);

        res.status(201).json(addCategory);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong adding category"
        })
        throw new Error(error)
    }
})

router.put("/:name", async (req,res)=>{
    try{
        let categoryName = req.params.name;
        let updatedCategory = req.body;
        let getCategoryName = categoryHelper.update(categoryName,updatedCategory);

        res.status(200).json(getCategoryName);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong getting category"
        })
        throw new Error(error)
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        let categoryId = req.params.id;
        let deleteCategory = categoryHelper.remove(categoryId);

        res.status(200).json(deleteCategory);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong deleting category"
        })
        throw new Error(error)
    }
})

module.exports = router;