const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const recipeController = require('../controller/recipeController')
           
router.get('/',recipeController.homepage)
           
router.get('/about',recipeController.aboutpage)
          
router.get('/catagories',recipeController.catagories)
          
router.get('/recipiess/:id',recipeController.fullrecipie)
              
router.get('/catagories/:catago',recipeController.catagory)
              
router.post('/searchreci',recipeController.searchrecipe)

router.get('/explore',recipeController.explore)

router.get('/submit',recipeController.submit)

router.post('/submit',recipeController.postsubmit)
            
module.exports = router
