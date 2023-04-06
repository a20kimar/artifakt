const express = require('express');
const app = express();

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' }))

app.use('/', indexRouter)
app.use('/rest', apiRouter)

app.listen(5000)