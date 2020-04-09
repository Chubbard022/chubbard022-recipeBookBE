const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const inspoRoutes = require("../routes/insperation")
const recipeMakerRoutes = require("../routes/recipeMaker")
const registerRoutes = require("../routes/register")
const socialRoutes = require("../routes/social")
const userRoutes = require("../routes/user")

const server = express()

server.use(express.json())
server.use(helmet())

server.use("/api/inspiration",inspoRoutes)
// server.use("/api/recipe",recipeMakerRoutes)
// server.use("/api/social",socialRoutes)
// server.use("/api/user",userRoutes)


//registerRoutes(server)
module.exports = server;     