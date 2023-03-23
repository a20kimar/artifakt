const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
app.use(methodOverride('_method'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)