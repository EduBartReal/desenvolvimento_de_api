import 'dotenv/config';
import express from 'express';
import router from './routes/vegeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('No routes here.');
});

app.use('/vege', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});