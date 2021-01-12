import express from 'express';
import { authenticate } from '../auth/authenticate';
import recipeHelper from '../helpers/Recipe';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let recipeList = await recipeHelper.find();

    res.status(200).json(recipeList);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry but something went wrong while retrieving all recipes',
    });
    throw new Error(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let getRecipe = await recipeHelper.findById(id);

    res.status(200).json(getRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'sorry something went wrong getting recipe',
    });
    throw new Error(error);
  }
});

router.get('/username/:username', async (req, res) => {
  try {
    let username = req.params.username;
    let getRecipeUser = await recipeHelper.findByName(username);

    res.status(200).json(getRecipeUser);
  } catch (error) {
    res.status(500).json({
      errorMesssage: 'sorry something went wrong getting recipe',
    });
    throw new Error(error);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    let newRecipe = req.body;
    let addRecipe = await recipeHelper.add(newRecipe);

    res.status(200).json(addRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry but something went wrong while adding new recipe',
    });
    throw new Error(error);
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    let { id } = req.params;
    let recipeToUpdate = req.body;
    let updateRecipe = await recipeHelper.update(id, recipeToUpdate);

    res.status(200).json(updateRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong with updating recipes',
    });
    throw new Error(error);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let recipId = req.params.id;
    let deleteRecipe = await recipeHelper.remove(recipId);
    res.status(200).json(deleteRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong with deleting recipes',
    });
    throw new Error(error);
  }
});

module.exports = router;
