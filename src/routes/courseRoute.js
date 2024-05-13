var express = require('express');
const { createCourse, getCourse, updateCourse, deleteCourse} = require('../controller/coursecontroller');
var router = express.Router();

router.post('/create',createCourse)
router.get('/',getCourse)
router.put('/:id',updateCourse)
router.delete('/:id',deleteCourse)

module.exports = router;