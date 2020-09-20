const router = require("express").Router();
const pantryHelper = require("../helperFunctions/pantryHelper");

router.get("/", async (req,res)=>{
    try{
        let getPantryItems = await pantryHelper.find();

        res.status(200).json(getPantryItems);
    }
    catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry Something went wrong with getting pantry items"
        })
        throw new Error(error)
    }
})

router.get("/:item", async (req,res)=>{
    try{let {item} = req.params;
    let getSpecificItem = await pantryHelper.findByName(item);

    res.status(200).json(getSpecificItem);
    }
    catch(error){
        res.status(500).json({
            errorMessage:
            `Sorry something went wrong getting ${item}`
        })
        throw new Error(error)
    }
})

router.get("/pantryRecipe", async (req,res)=>{
    try{
        let getRecipe = await pantryHelper.recipeUsingPantry();

        res.status(200).json(getRecipe)
    }catch(error){
        res.status(500).json({
            errorMessage:
            "Sorry something went wrong getting recipe from pantry items"
        })
        throw new Error(error)
    }
})

router.post("/", async (req,res)=>{
    try{
        let newItem = req.body;
        let addItem = await pantryHelper.add(newItem);

        res.status(201).json(addItem);
    }catch(error){
        res.status(500).json({
            errorMessage:
            `Sorry something went wrong adding ${newItem.nameOfItem} to pantry`
        })
        throw new Error(error)
    }
})

router.put("/:id", async (req,res)=>{
    try{
        let itemId = req.params.id;
        let itemToUpdate = req.body;
        let updateItem = await pantryHelper.update(itemId,itemToUpdate);

        res.status(200).json(updateItem);
    }catch(error){
        res.status(500).json({
            errorMessage:
            `Sorry something went wrong updating ${itemToUpdate.nameOfItem}`
        })
        throw new Error(error);
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        let itemId = req.params.id;
        let deleteItem = await pantryHelper.remove(itemId);

        res.status(200).json(deleteItem)

    }catch(error){
        res.status(500).json({
            errorMessage:
            `Sorry something went wrong deleting this item`
        })
        throw new Error(error)
    }
})

module.exports = router;