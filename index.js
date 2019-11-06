const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs  = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const User = require('./models/user')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
  const user = await User.findById('5d9b26f8d70ed8061cb59d84')
  req.user = user 
  next()
  } catch (e) {
    console.log(e)
  }
})
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)




const PORT = process.env.PORT || 3000

const uri = "mongodb+srv://akakiy813:dEzEKj4hRN3zqd%@cluster0-beys7.mongodb.net/admin?retryWrites=true&w=majority";

async function start() {
    try {
      const url = `mongodb+srv://test:test12345@cluster0-beys7.mongodb.net/shop`
      await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      const candidate = await User.findOne()
      if (!candidate) {
        const user = new User({
          email: 'akakiy813@mail.ru',
          name: 'akakiy813',
          cart: { items: []}
        })
        await user.save()
      }
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })
    } catch (e) {
      console.log(e)
    }
}
  
start()
    







