const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)


//get all users
router.get("/",(req,res)=>{
    db("users")
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>console.log("Error: Cannot get users"))
})




module.exports = router