var express = require('express');
var router = express.Router();

const blogControllers = require('../controller/blog');

 router.post('/add', blogControllers.addBlog);
 router.get('/fetch', blogControllers.fetchBlog);
 router.put('/update', blogControllers.updateBlog);
 router.delete('/delete', blogControllers.deleteBlog);

module.exports = router;