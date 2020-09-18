const router = require("express").Router()
const socialHelper = require("../helperFunctions/socialHelper")

const knex = require("knex")
const knexConfig = require("../../knexfile")
const db = knex(knexConfig.development)

router.get("/",async (req,res)=>{
    try{
        let getUsers =  await socialHelper.find();

        res.status(200).json(getUsers);
    }
    catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong with getting all users"
        })
        throw new Error(error)
    }
})

router.get("/:username", async (req,res)=>{
    try{
        let findUserRecipe = req.params.username;
        let getRecipesFromUser = await socialHelper.findByUsername(findUserRecipe);

        res.status(200).json(getRecipesFromUser);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong getting recipes from user"
        })
        throw new Error(error);
    }
})

module.exports = router