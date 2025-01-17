const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results



app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.search?.trim()
  const matchedRes = keyword ? restaurants.filter((rt) => 
  Object.keys(rt).some((property) => {
      if (property === 'name' || property === 'category' ) {
        console.log(property)//name, category
        console.log('hahahahahahaha')
        console.log(rt[property]) //餐廳標題,餐廳類別
        return rt[property].toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants: matchedRes, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((rt) => rt.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`1st express server on http://localhost:${port}`)
})