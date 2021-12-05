const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

let tasks = JSON.parse(fs.readFileSync(path.join(__dirname, "../tasks.json"), "utf8"));

router.get("/", function (req, res, next) {
    if (!tasks) {
        tasks = JSON.parse(fs.readFileSync(path.join(__dirname, "../tasks.json"), "utf8"));
    }
    res.status(201).json(tasks);
});

router.post("/modifyCards", function (req, res, next) {
    const data = JSON.stringify({...tasks, ...req.body}, null, 2);
    try {
        fs.writeFileSync(path.join(__dirname, "../tasks.json"), data);
        tasks = JSON.parse(data);
        res.status(201).json({ message: "succeed!" });
    } catch (e) {
        res.status(400).json({ message: "Oops! Something went wrong!" });
    }
});

module.exports = router;
