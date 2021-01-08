require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const inspoRoutes = require("./recipeRoutes/endpoints/insperation")
const recipeRoutes = require("./recipeRoutes/endpoints/recipe")
const registerRoutes = require("./recipeRoutes/endpoints/register")
const socialRoutes = require("./recipeRoutes/endpoints/social")
const userRoutes = require("./recipeRoutes/endpoints/user")
const pantryRoutes = require("./recipeRoutes/endpoints/pantry")
const categoryRoutes = require("./recipeRoutes/endpoints/category")
const favoritedRecipeRoutes = require("./recipeRoutes/endpoints/favoritedRecipe")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors({
    credentials: true
}))

server.use("/api/inspiration",inspoRoutes)
server.use("/api/recipes",recipeRoutes)
server.use("/api/social",socialRoutes)
server.use("/api/user",userRoutes)
server.use("/api/pantry",pantryRoutes)
server.use("/api/category",categoryRoutes)
server.use("/api/favorited",favoritedRecipeRoutes)
server.use("/api/auth",registerRoutes)

const port = process.env.PORT

server.listen(port, ()=>{
    console.log("SERVER WORKING")
})

module.exports = server;     

