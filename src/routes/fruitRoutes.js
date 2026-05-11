import express from 'express';
import { fruitServices } from '../services/fruitServices.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const fruits = await fruitServices.getAllFruits();
    res.json(fruits);
});

router.get('/:id', async (req, res) => {
    const fruit = await fruitServices.getFruitById(req.params.id);
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.json(fruit);
});

router.patch('/:id', async (req, res) => {
    const updated = await fruitServices.patchFruit(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Fruit not found' });
    res.json(updated);
});

router.put('/:id', async (req, res) => {
    const updated = await fruitServices.putFruit(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Fruit not found' });
    res.json(updated);
});

export default router;