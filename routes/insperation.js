require("dotenv").config()
const axios = require("axios")
const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")


let getRandomRecipe = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOON_API}`


router.get(`/newrecipe`, (req,res,next)=>{
    try{
        axios.get(getRandomRecipe)
            .then(response=>{
                let createNewRecipe = {
                    "name" : response.data.recipes[0].title,
                    "ingredients": response.data.recipes[0].instructions,
                    "instructions": response.data.recipes[0].summary
                }
                console.log("___+++__",createNewRecipe)
                db("inspiration").insert(createNewRecipe)
                    .then(data=>{
                        res.end()
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    }
    catch(error){
        res.status(500).json({
            message: "Error: could not get data"
        });
        throw new Error(error);
    }
    next()
})

router.get("/",(req,res)=>{
    db("inspiration")
        .then(data=>res.status(200).json(data))
        .catch(err=>res.status(400).json(err))
})

router.post("/",(req,res)=>{
    let nextRecipe = req.body
    db("inspiration").insert(nextRecipe)
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(err=>res.status(400).json(err))
})


module.exports = router;
