var express = require('express');
var router = express.Router();
const Category = require('../model/Category');



/* GET home page. */

router.get('/category', async function(req, res, next) {
  const categortyAll = await Category.find();
  try{  
    if(categortyAll) {
      res.render('category', {categorys: categortyAll});
    }
    else{
      console.log(`Xatolik BOR`)
    }
  }catch(err) {
    console.log(err)
  }
 
});


/* post home page. */
router.post('/category', async function(req, res, next) {
  const {name} = req.body;
  const category = await new Category({
    name: name
  })
  try{
    await category.save((err, data) => {
      if(data)  res.redirect('category')
      else{
        console.log(err)
      }
    })
  }catch(err) {
    console.log(err)
  }


});

module.exports = router;
