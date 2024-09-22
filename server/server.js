// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};
const data = [
    {"Framework": "mike","Stars":"166443","Released":"2020"},
    {"Framework": "pepper","Stars":"150793","Released":"2021"},
    {"Framework": "max","Stars":"62342","Released":"2022"},
    {"Framework": "john","Stars":"27647","Released":"2021"},
    {"Framework": "paul","Stars":"21471","Released":"2019"},
]


app.get('/budget', (req, res) => {
    res.json(budget);
});
app.get('/data', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});