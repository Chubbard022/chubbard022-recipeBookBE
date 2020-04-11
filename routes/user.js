const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")


router.get("/recipe",authenticate,(req,res)=>{
    let findUsername = req.decoded.username
    db("users")
        .join("recipes","users.username", "=", "recipes.usernames")
        .where({"recipes.usernames": findUsername})
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>res.status(400).json(err))
})




module.exports = router