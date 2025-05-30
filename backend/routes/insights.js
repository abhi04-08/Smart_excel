const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const {data} = req.body;

    if(!data || data.length === 0){
        return res.status(400).json({error: 'No data provided'});
    }

    const sampleData = data[0];
    const columns = Object.keys(sampleData);
    const totalRows = data.length;

    const insights = `
    ✔ The uploaded data contains ${totalRows} records.
    ✔ Columns in the data: ${columns.join(', ')}.
    ✔ Sample preview: ${JSON.stringify(sampleData)}.
    `;

    res.json({insights});
});
module.exports = router;