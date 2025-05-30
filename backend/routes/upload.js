const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const XLSX = require('xlsx');
const Upload = require('../models/Upload');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({storage});

router.post('/', upload.single('file'), async(req,res) =>{
    try{
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const newUpload = new Upload({
            originalname : req.file.originalname,
            filename : req.file.filename,
            path : req.file.path,
            mimetype : req.file.mimetype,
            size : req.file.size,
        });

        await newUpload.save();

        return res.json({data});
    } catch(err){
        console.error(err);
        res.status(500).json("Failed to process Excel file");
    }
});
router.get('/history', async (req, res) => {
    try {
        const files = await Upload.find().sort({ createdAt: -1});
        res.status(200).json(files);
    }catch(err){
        console.error("Fetch history error", err);
        res.status(500).json({error: 'Failed to fetch error.'});
    }
});

module.exports = router;