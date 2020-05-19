import { getRepository } from 'typeorm';
import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';
import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const caterories = await categoriesRepository.find({
    select: ['id', 'title'],
    order: {
      title: 'ASC',
    },
  });
  return response.json(caterories);
});

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const createCategory = new CreateCategoryService();
  const category = await createCategory.execute({ title });
  return response.json(category);
});

export default categoriesRouter;
