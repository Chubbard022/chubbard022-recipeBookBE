const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("./auth/authenticate")

router.get('/',(req,res)=>{
    db("favorited")
        .then(response=>res.status(200).json(response))
        .catch(err=> res.status(400).json(err))
})

router.post("/",(req,res)=>{
    db("favorited")
    .insert(req.body)
        .then(response=>res.status(201).json(response))
        .catch(err=>res.status(400).json(err))
})

router.delete("/:id",(req,res)=>{
    db("favorited")
        .where({id: req.params.id})
        .del()
            .then(()=>res.status(200).json({SuccessMessage: "Successfully Deleted Favorited Recipe"}))
            .catch(err=>res.status(400).json(err))
})

module.exports = router;