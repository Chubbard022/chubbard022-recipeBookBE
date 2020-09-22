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

    }catch(error){
        res.status(500).json({
            errorMessage:
            ""
        })
        throw new Error(error)
    }
})

router.delete("/:id", async (req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            errorMessage:
            ""
        })
        throw new Error(error)
    }
})

module.exports = router;