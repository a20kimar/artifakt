const express = require('express');
const app = express();

const indexRouter = require('./routes/index')
const employeeRouter = require('./routes/employees')

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' }))

app.use('/', indexRouter)
app.use('/employees', employeeRouter)

app.listen(5000)