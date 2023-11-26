const express = require("express")
const hbs = require("express-handlebars")

const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (requisicao, resposta) => {
    resposta.render('home')
})

app.listen(3000, () => {    
    console.log("servidor rodando na porta 3000")
})