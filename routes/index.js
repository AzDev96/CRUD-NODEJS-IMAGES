var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const multer = require('multer');
const fs = require('fs')
// Image Upload 
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
  }
})

var upload = multer({
  storage: storage
}).single('image')


router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  })
  user.save(err => {
    if(err) {
      console.log(err);
    }
    else{
      res.redirect('/')
    }   
  }) 
})


/* GET home page. */
router.get('/', function(req, res, next) {
  User.find().exec((err, users) => {
    if(err){
      res.json({message: "Error"})
    }else{
      res.render('index', {users: users});
    }
  })
 
});

router.get('/add', function(req, res, next) {
  res.render('add');
});



/* EDIT  */
router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
   User.findById(id, (err, user) => {
      if(err) {
        res.redirect('/')
      }else{
        if(user == null) {
          res.redirect('/')
        }
        else{
          res.render('edit-user', {
            user: user
          })
        }
      }
   } )  
});


router.post('/update/:id', upload, (req, res, next) => {
    let id = req.params.id;
    let new_image = ''
    if(req.file) {
      new_image = req.file.filename
      try{
        fs.unlinkSync('./uploads/'+req.body.old_image)
      }catch(err) {
        console.log(err);
      }
    }
    else{
      new_image = req.body.old_image;
    }
    User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    }, (err, resul) => {
      if(err) {
        res.json({message: err.message})
      }else{
        res.redirect('/ ')
      }
    })
})




/* DELETE */ 
router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id, (err, resul) => {
    if(resul.image != '') {
      try{
        fs.unlinkSync('./uploads/'+resul.image)
      }catch(err) {
        console.log(err);
      }
    }
    if(err) {
      res.json({message: err.message})
    }else{
      res.redirect('/')
    }
  })
})

module.exports = router;
