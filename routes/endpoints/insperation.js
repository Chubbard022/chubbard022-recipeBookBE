require("dotenv").config()
const router = require("express").Router();
const inspirationHelper = require("../helperFunctions/insperationHelper");

router.post(`/newrecipe`, async (req,res)=>{
    try{    
        let newRecipe = req.body;
        let addRecipeToInspiration = await inspirationHelper.add(newRecipe);

        res.status(200).json(addRecipeToInspiration);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong adding recipe to insperation"
        })
        throw new Error(error)
    }
})

router.get("/", async (req,res)=>{
    try{
        let inspirationList = inspirationHelper.find();
        res.status(200).json(inspirationList)
    }
    catch(error){
        res.status(500).json({
            errorMessage: "Sorry, something went wrong getting insperation recipes"
        })
        throw new Error(error);
    }
})

router.get("/:id", async (req,res)=>{
    try{
        let insprirationId = req.params.id;
        let getInspirationById = inspirationHelper.findById(insprirationId);

        res.status(200).json(getInspirationById);
    }
    catch(error){
        res.status(500).json({
            errorMessage : 
            "Sorry something went wrong getting recipe"
        })
        throw new Error(error);
    }
})

router.put("/:id",async (req,res)=>{
    try{
        let recipeId = req.params.id;
        let updatedInspo = req.body;
        let updateInspo = inspirationHelper.update(recipeId,updatedInspo)

        res.status(200).json(updateInspo);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong with udating recipe"
        })
        throw new Error(error);
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        let recipeId = req.params.id;
        let deleteInspo = inspirationHelper.remove(recipeId);

        res.status(200).json(deleteInspo);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong deleting recipe"
        })
        throw new Error(error);
    }
})
module.exports = router;
