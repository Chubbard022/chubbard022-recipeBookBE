import express from 'express';
import { authenticate } from '../auth/authenticate';
import router from'../helpers/Category';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    let getCategories = await categoryHelper.find();
    res.status(200).json(getCategories);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong getting all categories',
    });
    throw new Error(error);
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    let categoryId = req.params.id;
    let findCategory = await categoryHelper.findById(categoryId);

    res.status(200).json(findCategory);
  } catch (error) {
    res.status(500).
      json({
        errorMessage: 'Sorry something went wrong finding category',
      });
  }
});

router.get('/:name', authenticate, async (req, res) => {
  try {
    let categoryName = req.params.name;
    let getCategoryByName = await categoryHelper.findByName(categoryName);

    res.status(200).json(getCategoryByName);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong getting category',
    });
    throw new Error(error);
  }
});

router.get('/recipes/:name', authenticate, async (req, res) => {
  try {
    let categoryName = req.params.name;
    let getRecipesInCategory = await categoryHelper.findAllRecipesInCategory(categoryName);

    res.status(200).json(getRecipesInCategory);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong getting all recipes in category',
    });
    throw new Error(error);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    let newCategory = req.body;
    let addCategory = await categoryHelper.add(newCategory);

    res.status(201).json(addCategory);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong adding category',
    });
    throw new Error(error);
  }
});

router.put('/:name', authenticate, async (req, res) => {
  try {
    let categoryName = req.params.name;
    let updatedCategory = req.body;
    let getCategoryName = await categoryHelper.update(categoryName, updatedCategory);

    res.status(200).json(getCategoryName);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong getting category',
    });
    throw new Error(error);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let categoryId = req.params.id;
    let deleteCategory = await categoryHelper.remove(categoryId);

    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Sorry something went wrong deleting category',
    });
    throw new Error(error);
  }
});

module.exports = router;
