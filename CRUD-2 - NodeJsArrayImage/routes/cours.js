var express = require('express');
const Course = require('../model/Course');
const Category = require('../model/Category');
const multer = require('multer');
const uuid = require('uuid').v4;
const fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/addCourse', async function(req, res, next) {
  const categoryList = await Category.find();
  res.render('kurs/addKurs', {
    categorys : categoryList
  });
});
router.get('/listkurs', async function(req, res, next) {
  const corse = await Course.find().populate('category_id');
  // const corse = await Course.find();
  res.render('kurs/listkurs', {
    corses: corse
  });
});

router.get('/corsee', async function(req, res, next) {
      const corse = await Course.find().populate('category_id', 'name').select('title');
      try{
        if(corse) {
          res.json(corse);
        }else{
          console.log(err)
        }
      }
      catch(err) {
        console.log(err)
      }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const {originalname} = file;
    cb(null,`${uuid()}-${originalname}`)
  }
});

const upload = multer({storage})

/* POST home page. */
router.post('/addCourse', upload.array('images'), async function(req, res, next) {
  const files =  req.files;
     files.map(index => {
      return  index 
    })
     const {category } =  req.body;
     const corse = await new Course({  
        title: req.body.title, 
        text: req.body.text, 
        year: req.body.year,
        category_id: category,
        images: files
        
      });
     try{
      await corse.save()
      res.redirect('/listkurs')
     }
     catch(err) {
       console.log(err)
     }


});

module.exports = router;
