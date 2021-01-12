import express from 'express';
import { authenticate } from '../auth/authenticate';
import userHelper from '../helpers/User/index.tss';

const router = express.Router();


router.get('/', authenticate, async (req, res) => {
  try {
    let getUserList = await userHelper.findUser();
    res.status(200).json(getUserList);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'sorry something went wrong getting users',
    });
    throw new Error(error);
  }
});

router.get('/:username', authenticate, async (req, res) => {
  try {
    let { username } = req.params;
    let getUser = await userHelper.findUserByName(username);

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong getting user',
    });
    throw new Error(error);
  }
});

router.get('/:username/favorited', authenticate, async (req, res) => {
  try {
    let { username } = req.params;
    let getUserFav = await userHelper.favoritedUserRecipes(username);
    res.status(200).json(getUserFav);
  } catch (error) {
    res.status(500).json({
      errorMessage: "Sorry something went wrong getting user's favorited recipes",
    });
    throw new Error(error);
  }
});

router.get('/:username/recipes', authenticate, async (req, res) => {
  try {
    let { username } = req.params;
    let findRecipes = await userHelper.userRecipes(username);

    res.status(200).json(findRecipes);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'sorry something went wrong getting user recipes',
    });
    throw new Error(error);
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    let { id } = req.params;
    let userToUpdate = req.body;
    let updateUser = await userHelper.update(id, userToUpdate);

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      errorMessage: `Sorry something went wrong updating your account`,
    });
    throw new Error(error);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let { id } = req.params;
    let deleteUser = await userHelper.remove(id);

    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong deleting your account',
    });
    throw new Error(error);
  }
});
module.exports = router;
