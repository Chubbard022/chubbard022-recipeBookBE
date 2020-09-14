const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const inspoRoutes = require("../routes/insperation")
const recipeMakerRoutes = require("../routes/recipeMaker")
const registerRoutes = require("../routes/register")
const socialRoutes = require("../routes/social")
const userRoutes = require("../routes/user")
const favoritedRecipeRouter = require("../routes/favoritedRecipe")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors({
    //origin: put netlify url here
    credentials: true
}))

server.use("/api/inspiration",inspoRoutes)
server.use("/api/recipes",recipeMakerRoutes)
server.use("/api/social",socialRoutes)
server.use("/api/user",userRoutes)
server.use("/api/favorited",favoritedRecipeRouter)


registerRoutes(server)
module.exports = server;     