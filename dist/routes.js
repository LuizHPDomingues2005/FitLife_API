"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const db = require('./bd');
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello World!');
    db.connect();
});
router.get('/connect', (req, res) => {
});
exports.Routes = router;
