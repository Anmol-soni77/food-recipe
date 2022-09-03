const mongoose = require('mongoose')
require('../model/db')
const catagory = require('../model/catagory')
const recipies = require('../model/recipes')
const recipes = require('../model/recipes')

exports.homepage = async(req,res)=>{
    try {
        const limitnumber = 5;
        const foodstyles = await catagory.find().limit(limitnumber)
        const recipies = await recipes.find().limit(limitnumber).sort({_id:-1})
        const indian = await recipes.find({catagory:"indian"}).sort({_id:-1})
        const chinese = await recipes.find({catagory:"chinese"}).sort({_id:-1})
        // console.log(foodstyles);
        res.render('index',{
            foodstyles:foodstyles,
            recipies:recipies,
            chinese:chinese,
            indian:indian
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}

exports.aboutpage = async(req,res)=>{
    res.render('about')
}

exports.catagories = async(req,res)=>{
    try {
        const foodstyles = await catagory.find()
        // console.log(foodstyles);
        res.render('catagories',{
            foodstyles:foodstyles
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}


exports.fullrecipie = async(req,res)=>{
    try {
        console.log(req.params.id);
        const viewrecipe = await recipes.findById(req.params.id)
        res.render('recipiess',{
            viewrecipe:viewrecipe
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}

exports.catagory = async(req,res)=>{
    try {
        const  catago = req.params.catago;
        const catarecipe = await recipes.find({catagory:catago})
        // console.log(foodstyles);
        res.render('catagory',{
            catarecipe:catarecipe
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}

exports.searchrecipe = async(req,res)=>{
    try {
        const  searchterm = req.body.searchterm;
        let recipee = await recipes.find( { $text: { $search: searchterm, $diacriticSensitive:true } } )
        console.log(recipee);
        res.render('searchh',{
            recipee:recipee
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}

exports.explore = async(req,res)=>{
    try {
        const limitnumber = 10;
        const latestrecipies = await recipes.find().limit(limitnumber).sort({__id:-1})
        res.render('explore',{
            latestrecipies:latestrecipies
        })
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}


exports.submit = async(req,res)=>{
    try {
        const infoerrorobj = req.flash('infoerrors')
        const infosubmitobj = req.flash('infosubmit')
        res.render('submit',{infoerrorobj,infosubmitobj})
    } catch (error) {
        res.status(500).send(`error:${error.message}`)
    }
}


exports.postsubmit = async(req,res)=>{
    try {

        let imageuploadfile;
        let uploadpath;
        let newimagename;

        if(!req.files || Object.keys(req.files).length === 0  ){
            console.log('no files were uploaded');
        }

        imageuploadfile = req.files.image
        newimagename = Date.now()+imageuploadfile.name;

        uploadpath = require('path').resolve('./') + '/public/images/' + newimagename;

        imageuploadfile.mv(uploadpath,function(err){
            if(err) return res.status(500).send(err);
        })

        const newrecipeee = new recipes({
            name:req.body.name,
            image:'/images/'+newimagename ,
            description:req.body.description,
            ingridients:req.body.ingridients,
            email:req.body.email,
            catagory:req.body.catagory
        })

        await newrecipeee.save()

        req.flash('infosubmit','recipe has been added')
        res.redirect('/submit')
        
    } catch (error) {
        // res.json(error)
        req.flash('infoerrors',error.message)
        res.redirect('/submit')
        
    }
}












































// async function insertdocs(){
//     try {
//         const newdoc = [
//             {
//               name: 'chinese',
//               image: '/images/foodstylechinese.jpg',
//             },
//             {
//               name: 'italian',
//               image: '/images/foodstyleitalian.jpg',
//             },
//             {
//               name: 'thai',
//               image: '/images/foodstylethai.jpg',
//             },
//             {
//               name: 'indian',
//               image: '/images/foodstyleindian.jpg',
//             },
//             {
//               name: 'korean',
//               image: '/images/foodstylekorean.jpg',
//             },
//             {
//               name: 'South indian',
//               image: '/images/foodstylesouth.jpg',
//             }
//           ]
//           for (const element of newdoc) {
//               let updated = new catagory(element)  
//               console.log(updated);
//               await updated.save() 
//           }
//         // const inserted = await catagory.find()
//     } catch (error) {
//         console.log(error);
//     }
// }

// insertdocs();




async function insertrecipies(){
    try {
        const newdoc = [
            {name:'One-cup pancakes',
            
            image:'/image/Onecup_pancake.webp',
            
            description:'Super-easy to make and ready in just 15 minutes, these pancakes make the perfect weekend breakfast or brunch — a great way to get the whole family together! Get creative with sweet or savoury toppings.',
            
            ingridients:['1 large free-range egg',
            '1 cup of self-raising flour',
            '1 cup of milk',
            '200 g blueberries',
            'olive oil',
            '4 tablespoons natural yoghurt'],
            
            email:'onecupcakeman@gmail.com',
            
            catagory:'italian'},
            
            
            
            
            {name:'Chicken fajitas',
            
            image:'/image/Chicken_fajitas.webp',
            
            description:'This quick fajita recipe is a feast of flavours and colours – get stuck in! ',
            
            ingridients:['1 red pepper',
            '1 medium red onion',
            '2 skinless free-range chicken breasts',
            '1 teaspoon smoked paprika',
            '1 small pinch of ground cumin',
            '2 limes',
            'olive oil',
            '4 small flour tortillas , or 2 large',
            '150 ml fat-free natural yoghurt',
            '50 g Cheddar cheese'],
            
            email:'Chickenfajitas@gmail.com',
            
            catagory:'indian'
            },
            
            
            
            
            {
            name:'Mexican breakfast',
            
            image:'/image/mexican_breakfast.webp',
            
            description:`The Mexican name for this dish is ‘huevos rancheros’ – eggs with chillies, tomatoes and peppers in burritos. It’s absolutely great if you've got a few mates round, and even better if you've got a hangover you’re trying to shake off`,
            
            ingridients:['1 onion',
            '2 cloves of garlic',
            '2 red peppers',
            '2 fresh red or orange chillies',
            'olive oil',
            '1 large dried chilli',
            '3 fresh bay leaves',
            '2 x 400 g tins of quality plum tomatoes',
            '2 large ripe tomatoes',
            '6 large free-range eggs',
            '6 tortillas',
            'Cheddar cheese , to serve'],
            
            email:'Mexicanbreakfast@gmail.com',
            
            catagory:'chinese'
            },
            
            
            {
            name:'pork fillets',
            
            image:'/image/pork_fillets.webp',
            
            description:`Although it's hard to define what "proper" American cooking is, I've been inspired by the food from the Deep South, where there is an incredible amount of smoking, salting, barbecuing and spit-roasting going on - really intelligent cooking. This is a recipe inspired by the kinds of flavours I tasted when I was in Texas. When you've made this once, I guarantee you'll make it at least once a year as it's so damn good.`,
            
            ingridients:['½ teaspoon cumin seeds',
            '1 teaspoon fennel seeds',
            '2 cloves',
            '1 heaped tablespoon sweet smoked paprika',
            '1 orange',
            '½ a bunch of fresh thyme',
            '4 cloves of garlic',
            '150 ml Heinz organic tomato ketchup',
            '6 tablespoons balsamic vinegar'],
            
            email:'porkfillets@gmail.com',
            
            catagory:'korean'
            },
            
            
            
            {
            name:'Thai green curry',
            
            image:'/image/thai_green_curry.webp',
            
            description:'The first time I ever had Thai green curry I was sixteen years old and it blew my mind! This green curry paste is so quick to make, yet the flavours are really complex, refreshing and delicious. With Christmas leftovers, it’s a dream. Boom. ',
            
            ingridients:['1 butternut squash (1.2kg)',
            'groundnut oil',
            '2x 400 g tins of light coconut milk',
            '400 g leftover cooked greens, such as Brussels sprouts, Brussels tops, kale, cabbage, broccoli',
            '350 g firm silken tofu',
            '75 g unsalted peanuts',
            'sesame oil',
            '1 fresh red chilli',
            '2 lime'],
            
            email:'Thaigreencurry@gmail.com',
            
            catagory:'thai'
            },
            
            
            {
            name:'Amazing dosa',
            
            image:'/image/amazing_dosa.webp',
            
            description:'My take on Indian street food, this dosa recipe is easy and delicious – you have got to try it.',
            
            ingridients:['2 baking potatoes',
            '2 sweet potatoes',
            '1 dried red chilli',
            '1 fresh red chilli',
            '1 cm piece of ginger',
            'olive oil',
            '1½ teaspoons mustard seeds',
            '1 teaspoon ground turmeric',
            '4 spring onions',
            'a few sprigs of fresh coriander',],
            
            email:'Amazingdosa@gmail.com',
            
            catagory:'South indian'},
            
            
            
            {
            name:'Thai tofu',
            
            image:'/image/thai_tofu.webp',
            
            description:'Pad Thai has become a bit of a cult favourite in both street food markets and high-end Thai restaurants, and it’s not hard to see why – it’s ridiculously tasty and seriously satisfying. Packed with proper Thai flavours like dried shrimps, Asian herbs and a beautiful tamarind sauce, it’s fresh and zingy but hearty and warming – a modern classic.',
            
            ingridients:['150 g flat rice noodles',
            '1 fresh birds-eye chilli',
            '1 fresh yellow chilli',
            '2 limes',
            'groundnut oil',
            '2 red shallots',
            '½ a bunch each of Chinese chives, Thai basil, Thai mint , (45g total)',
            '140 g silken tofu',
            '4 large raw peeled Tiger prawns , from sustainable sources',
            '25 g dried shrimps , from sustainable sources',
            '50 g shelled unsalted peanuts',
            '1 pinch of dried chilli flakes',
            '1 tablespoon jarred shredded sweet radish',
            '1 large free-range egg',
            '60 g beansprouts , (ready to eat)'],
            
            email:'Thaitofu@gmail.com',
            
            catagory:'thai'
            },
            
            
            {
            name:'baked eggs',
            
            image:'/image/baked_eggs.webp',
            
            description:'These are delicious and hand licking delicious',
            
            ingridients:['olive oil',
            '4 large free-range eggs',
            '6 cherry tomatoes , (60g)',
            '¼ x 125 g ball of mozzarella',
            '1-2 sprigs of fresh marjoram , or basil'],
            
            email:'bakedeggs@gmail.com',
            
            catagory:'italian'
            },
            
            
            {
            name:'kimchi',
            
            image:'/image/kimchi.webp',
            
            description:'For every chilli-paste-laden stew, there is an equally satisfying and subtly flavoured soup. This yin and yang approach extends to kimchi too. Beautifully crisp, clean and refreshing, this radish water kimchi doesn’t have a hint of spice in sight.',
            
            ingridients:['1 kg daikon radish',
            '2 cloves of garlic',
            '2½ cm piece of ginger',
            '1 fresh green chilli',
            '1 fresh red chilli',
            '½ small white onion',
            '1 tablespoon runny honey',
            '1 spring onion'],
            
            email:'kimchi@gmail.com',
            
            catagory:'korean'
            },
            
            
            
            
            {name:'frittata',
            
            image:'/image/frittata.webp',
            
            description:'This dish is inspired by a trip to Delhi, where I saw street-food vendors doing the most extraordinary things with eggs, breads, and a rainbow of incredible spices. I wanted to bring together a few of those ideas to take the humble egg to a really exciting place. So, in homage to those street-food vendors, this frittata has the sweetness of mango chutney, the crunch of Bombay mix, and the savouriness of spinach, all held together with toasted chapatis – it’s just a joy to eat. ',
            
            ingridients:['4 wholemeal chapatis',
            '8 large free-range eggs',
            '2 tablespoons mango chutney',
            '50 g mature Cheddar cheese',
            '200 g baby spinach',
            'olive oil',
            '30 g Bombay mix',
            '½ a small red onion',
            'red wine vinegar',
            '2 tablespoons natural yoghurt'],
            
            email:'frittata@gmail.com',
            
            catagory:'indian'},
            
            
            
            
            {name:'oysters',
            
            image:'/image/oysters.webp',
            
            description:'The word ‘oyster’ in Cantonese sounds like ‘good things’, so they are often on the New Year menu. Watch the oysters carefully to prevent overcooking. ',
            
            ingridients:['3 spring onions',
            '5cm piece of ginger',
            '2 cloves of garlic',
            '2 fresh red chillies',
            '1 tablespoon shaoxing rice wine or dry sherry',
            '1 tablespoon light soy sauce',
            '2 tablespoons dark soy sauce',
            '1 teaspoon chilli bean sauce (see tip)',
            '3 tablespoons groundnut or peanut oi'],
            email:'oysters@gmail.com',
            
            catagory:'chinese'},
            
            
            
            
            {
            name:'pumpkin pickle',
            
            image:'/image/pumpkin_pickle.webp',
            
            description:'This might seem a bit of a palaver, but it’s well worth the effort, especially when eaten in a cheese sandwich!',
            
            ingridients:['2 red onions',
            '3 cloves of garlic',
            '2.5 cm piece of ginger',
            '500 g pumpkin',
            '2 fresh green chillies',
            'vegetable oil',
            '1 teaspoon mustard seeds',
            '1 teaspoon fenugreek seeds',
            '1 tablespoon ground coriander',
            '1 tablespoon ground cumin',
            '1 tablespoon turmeric',
            '1 x 400 g tin of plum tomatoes',
            '6 limes',
            'cider vinegar',
            '250 g brown suga'],
            
            email:'pumpkinpickle@gmail.com',
            
            catagory:'south indian'}
            
            ]
        //   for (const element of newdoc) {
        //       let updated = new catagory(element)  
        //       console.log(updated);
        //       await updated.save() 
        //   }
        const savedd = await recipes.insertMany(newdoc)
        console.log(savedd);
        // const inserted = await catagory.find()
    } catch (error) {
        console.log(error);
    }
}

// insertrecipies();