require("dotenv").config()
const axios = require("axios")
const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")


router.post(`/newrecipe`, (req,res)=>{
    db("inspiration")
        .insert(createNewRecipe)
        .then(response=>{
            console.log(response)
            res.status(201).json({sucessMessage:response})
            })
            .catch(err=>console.log(err))
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
