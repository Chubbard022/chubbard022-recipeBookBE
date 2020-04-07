const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {authenticate} = require("./auth/authenticate")
const secret = require('./auth/secrets')
const Users = require("./auth/authenticate")

module.exports = server =>{
    server.post("/api/register",register)
    server.post("/api/login",login)
    server.post("/api/logout",logout)
}

function register(req,res){
    let user = req.body;
    const hash = bcrypt.hashSync(user.password,10)
    user.password = hash


    Users.add(user)
        .then((newUser)=>{
            res.status(201).json(newUser)
        })
        .catch((err)=>{
            res.status(500).json({errorMessage: "Error: Could not register"})
        })
}

function login(req,res){
    let {username, password} = req.body

    Users.findBy({username})
        .first()
        .then((user)=>{
            if(user && bcrypt.compareSync(password,user.password)){
                const token = generateToken(user)
                let id = user.id
                res.status(200).json({welcomeMessage: `Welcome ${user.username}`, token, id})
            }else{
                res.status(401).json({errorMessage: "Error: incorrect Username and Password"})
            }
        })
        .catch((err)=>{
            res.status(400).json({errorMessage: "Error: Could not login"})
        })    
}

function logout(req,res){
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                res.status(500).json({errorMessage: "Error: Could not logout"})
            }else{
                res.status(200).json({message: "logout successful"})
            }
        })
    }else{
        res.status(500).json({errorMessage: "Error: Could not find session"})
    }
}
function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expireIn: "1d"
    }
    return jwt.sign(payload,secret,options)
}