import express from 'express';
import { authenticate } from '../auth/authenticate';
import  favoriteHelper from '../helpers/Favorited';

const router = express.Router();


router.get('/', authenticate, async (req, res) => {
  try {
    let favRecipeList = await favoriteHelper.find();

    res.status(200).json(favRecipeList);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry but something went wrong retrieving all favorited recipes',
    });
    throw new Error(error);
  }
});

router.get('/:name', authenticate, async (req, res) => {
  try {
    let name = req.params.name;
    let findFavRecipeByName = await favoriteHelper.findByName(name);

    res.status(200).json(findFavRecipeByName);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry but something went wrong retrieving favorited recipe',
    });
    throw new Error(error);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    let newFavoritedRecipe = req.body;
    let addFavRecipe = await favoriteHelper.add(newFavoritedRecipe);

    res.status(201).json(addFavRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry but something went wrong with adding new favorited recipe',
    });
    throw new Error(error);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let id = req.params.id;
    let deleteFavRecipe = await favoriteHelper.remove(id);

    res.status(200).json(deleteFavRecipe);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong with deleting favorited recipe',
    });
    throw new Error(error);
  }
});

module.exports = router;
