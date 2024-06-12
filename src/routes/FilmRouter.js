const express = require('express')
const router = express.Router()
const filmController = require('../controllers/FilmController')
const { authMiddleWare } = require('../middleware/authMiddleware')


router.post('/create', filmController.createFilm)
router.put('/update/:id',authMiddleWare, filmController.updateFilm)
router.get('/details/:id',filmController.detailFilm)
router.delete('/delete/:id',authMiddleWare, filmController.deleteFilm)
router.get('/get-all', filmController.getAllFilm)

module.exports = router