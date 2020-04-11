const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")



router.get("/",authenticate,(req,res)=>{
    db("users")
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>console.log("Error: Cannot get users"))
})
router.get("/recipe",authenticate,(req,res)=>{
    db("users")
        .join("recipes","users.username", "=", "recipes.usernames")
        .select("usernames","name","ingredients","instructions")
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>res.status(400).json(err))
})
module.exports = router