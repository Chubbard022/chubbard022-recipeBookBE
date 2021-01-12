require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

import inspirationRoutes from './recipeRoutes/endpoints/inspiration';
import recipeRoutes from './recipeRoutes/endpoints/recipe';
import registerRoutes from './recipeRoutes/endpoints/register';
import socialRoutes from './recipeRoutes/endpoints/social';
import userRoutes from './recipeRoutes/endpoints/user';
import pantryRoutes  from './recipeRoutes/endpoints/pantry';
import categoryRoutes from './recipeRoutes/endpoints/category';
import favoritedRecipeRoutes from './recipeRoutes/endpoints/favoritedRecipe';

const server = express();

server.use(express.json());
server.use(helmet());
server.use(
  cors({
    credentials: true,
  }),
);

server.use('/api/inspiration', inspirationRoutes);
server.use('/api/recipes', recipeRoutes);
server.use('/api/social', socialRoutes);
server.use('/api/user', userRoutes);
server.use('/api/pantry', pantryRoutes);
server.use('/api/category', categoryRoutes);
server.use('/api/favorited', favoritedRecipeRoutes);
server.use('/api/auth', registerRoutes);

const port = process.env.PORT;

server.listen(port, () => {
  console.log('SERVER WORKING');
});

module.exports = server;
