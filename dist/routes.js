"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bd = require('./bd');
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello World!');
    bd.connectar();
});
// USUARIO
router.use('/user', require('./routes/authUser.js'));
module.exports = router;
