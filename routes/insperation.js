require("dotenv").config()
const axios = require("axios")
const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")

router.post(`/newrecipe`, (req,res,next)=>{
    let nextRecipe = req.body
    db("inspiration").insert(nextRecipe)
        .then(response=>{
            res.status(201).json({responseMessage: "Successfully found new recipe"})
        })
        .catch(err=>res.status(400).json(err))
})

router.get("/",(req,res)=>{
    db("inspiration")
        .then(data=>res.status(200).json(data))
        .catch(err=>res.status(400).json(err))
})

router.put("/:id",(req,res)=>{
    db("inspiration")
        .where({id:req.params.id})
        .update(req.body)
            .then(response=>res.status(200).json(response))
            .catch(err=>res.status(400).json(err))
})

module.exports = router;
