import express from 'express';
import { vegeServices } from '../services/vegeServices.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const vegetais = await vegeServices.getAllVegetais();
    res.json(vegetais);
});

router.get('/:id', async (req, res) => {
    const vegetal = await vegeServices.getVegetalById(req.params.id);
    if (!vegetal) return res.status(404).json({ message: 'Vegetal not found' });
    res.json(vegetal);
});

router.post('/', async (req, res) => {
    const novo = await vegeServices.postVegetal(req.body);
    res.status(201).json(novo);
});

router.patch('/:id', async (req, res) => {
    const updated = await vegeServices.patchVegetal(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Vegetal not found' });
    res.json(updated);
});

router.put('/:id', async (req, res) => {
    const updated = await vegeServices.putVegetal(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Vegetal not found' });
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    const deleted = await vegeServices.deleteVegetal(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vegetal not found' });
    res.json({ message: 'Deletado com sucesso', vegetal: deleted });
});

export default router;