const router = require("express").Router()
const favoriteHelper = require("../helperFunctions/favoriteHelpers");

router.get('/', async (req,res)=>{
    try{
        let favRecipeList = await favoriteHelper.find();

        res.status(200).json(favRecipeList);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry but something went wrong retrieving all favorited recipes"
        })
        throw new Error(error);
    }
})

router.get("/:id", async (req,res)=>{
    try{
        let id = req.params.id;
        let findFavRecipeById = await favoriteHelper.findById(id);

        res.status(200).json(findFavRecipeById);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry but something went wrong retrieving favorited recipe"
        })
        throw new Error(error);
    }
})

router.post("/",async (req,res)=>{
    try{
        let newFavoritedRecipe = req.body;
        let addFavRecipe = await favoriteHelper.add(newFavoritedRecipe);

        res.status(201).json(addFavRecipe);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry but something went wrong with adding new favorited recipe"
        })
        throw new Error(error)
    }
})

router.delete("/:id",(req,res)=>{
    try{
        let id = req.params.id;
        let deleteFavRecipe = favoriteHelper.remove(id);

        res.status(200).json(deleteFavRecipe);
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong with deleting favorited recipe"
        })
        throw new Error(error);
    }
})

module.exports = router;