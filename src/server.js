const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const inspoRoutes = require("../routes/endpoints/insperation")
const recipeRoutes = require("../routes/endpoints/recipe")
const registerRoutes = require("../routes/endpoints/register")
const socialRoutes = require("../routes/endpoints/social")
const userRoutes = require("../routes/endpoints/user")
const pantryRoutes = require("../routes/endpoints/pantry")
const favoritedRecipeRoutes = require("../routes/endpoints/favoritedRecipe")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors({
    //origin: put netlify url here
    credentials: true
}))

server.use("/api/inspiration",inspoRoutes)
server.use("/api/recipes",recipeRoutes)
server.use("/api/social",socialRoutes)
server.use("/api/user",userRoutes)
server.use("/api/pantry",pantryRoutes)
server.use("/api/favorited",favoritedRecipeRoutes)


registerRoutes(server)
module.exports = server;     