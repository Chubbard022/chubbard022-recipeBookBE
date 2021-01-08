const router = require("express").Router();
const {authenticate} = require("../auth/authenticate");
const socialHelper = require("../helpers/User/social");

router.get("/", authenticate, async (req,res)=>{
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

router.get("/:username", authenticate, async (req,res)=>{
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