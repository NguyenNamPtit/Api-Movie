const express = require('express')
const router = express.Router()
const BlogController = require('../controllers/BlogController')
const { authMiddleWare } = require('../middleware/authMiddleware')



router.post('/create', BlogController.createBlog)
router.put('/update/:id',authMiddleWare, BlogController.updateBlog)
router.delete('/delete/:id',authMiddleWare, BlogController.deleteBlog)
router.get('/details/:id',BlogController.detailBlog)
router.get('/get-all',authMiddleWare, BlogController.getAllBlog)

module.exports = router