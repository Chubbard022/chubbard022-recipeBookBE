const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)


router.get("/",(req,res)=>{
    db("recipes")
        .then(response=>res.status(200).json(response))
        .catch(err=>res.status(400).json(err))
})

router.post("/",(req,res)=>{

    db("recipes")
    .insert(req.body)
        .then(response=>res.status(201).json(response))
        .catch(err=>res.status(400).json("cannot create new recipe"))
})

router.put("/:id",(req,res)=>{
    db("recipes")
        .where({id : req.params.id})
        .update(req.body)
            .then(response=>res.status(200).json(response))
            .catch(err=>res.status(400).json(err))
})

router.delete("/:id",(req,res)=>{
    db("recipes")
        .where({id: req.params.id})
        .del()
            .then(()=>res.status(200).json({SuccessMessage: "Successfully deleted recipe"}))
            .catch(err=>res.status(400).json(err))
})


module.exports = router

