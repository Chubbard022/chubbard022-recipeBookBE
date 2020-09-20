const router = require("express").Router()
const recipeHelper = require("../helperFunctions/recipeHelper")

router.get("/", async (req,res)=>{
    try{
        let recipeList = await recipeHelper.find();

        res.status(200).json(recipeList);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry but something went wrong while retrieving all recipes"
        })
        throw new Error(error)
    }
})

router.get("/:id", async (req,res)=>{
    try{
        let recipeId = req.params.id;
        let getRecipe = await recipeHelper.findById(recipeId);

        res.status(200).json(getRecipe);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "sorry something went wrong getting recipe"
        })
    }
})

router.post("/", async (req,res)=>{
    try{
        let newRecipe = req.body;
        let addRecipe = await recipeHelper.add(newRecipe);

        res.status(200).json(addRecipe)
    }
    catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry but something went wrong while adding new recipe"
        })
        throw new Error(error)
    }
})

router.put("/:id", async (req,res)=>{
    try{
        let recipeId = req.params.id;
        let recipeToUpdate = req.body;
        let updateRecipe = await recipeHelper.update(recipeId,recipeToUpdate);

        res.status(200).json(updateRecipe);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong with updating recipes"
        })
        throw new Error(error)
    }  
})

router.delete("/:id", async (req,res)=>{
    try{
        let recipId = req.params.id;
        let deleteRecipe = await recipeHelper.delete(recipId);
        res.status(200).json(deleteRecipe);
    }catch(error){
        res.status(500).json({
        errorMessage: 
        "Sorry something went wrong with deleting recipes"
        })
        throw new Error(error)
    }
})


module.exports = router

