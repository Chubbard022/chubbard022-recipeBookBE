const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")



router.get("/",(req,res)=>{
    db("users")
        .select("username","id")
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>console.log("Error: Cannot get users"))
})
router.get("/:username",(req,res)=>{
    let usernameSelected = req.params.username
    db("users")
        .join("recipes","users.username", "=", "recipes.username")
    .then(response=>{
       let filterResponse =  response.filter(recipe=>{
            return recipe.username === usernameSelected
        })
        res.status(200).json(filterResponse)
    })
    .catch(err=>res.status(400).json(err))
})
module.exports = router