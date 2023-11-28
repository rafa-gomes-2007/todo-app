const express = require("express")
const hbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (requisicao, resposta) => {
    resposta.render('home')
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo-app",
})


conexao.connect((erro) => {
    if (erro) {
        return console.log(erro)
    }

    console.log("estou conectado ao mySql")

    app.listen(3000, () => {    
        console.log("servidor rodando na porta 3000")
    })
})
