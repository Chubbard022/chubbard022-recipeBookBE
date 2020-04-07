const jwt = require("jsonwebtoken")
const db = require("../../data/dbConfig.js")
const jwtKey = require("../auth/secrets")

module.exports = {
    authenticate,
    add,
    find,
    findBy,
    findById
}

function authenticate(req,res,next){
    const token = req.get("Authorization")

    if(token){
        jwt.verify(token,jwtKey,(err,decode)=>{
            if(err) return res.status(401),json(err)

            //if there is a token, decode it
            req.decoded = decoded

            next();
        })
    }else{
        return res.status(401).json({error: "No token has been provided"})
    }

}

async function find(){
    return await db("users").select("id","username","password")
}

async function findBy(filter){
    return await db("users").where(filter)
    
} 

async function add(user){
    const [id] = await db("users").insert(user)
    return findById(id)
}

function findById(id){
    return db("users")
        .where({id})
        .first()
}