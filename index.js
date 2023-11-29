const express = require("express")
const hbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//converter daados do formulario para javascript
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas
app.post('/criar', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas (descricao, completa)
        Values('${descricao}', '${completa}')
    `

    conexao.query(sql, (erro) => {
        if (erro) {
           return console.log(erro)
        }

        resposta.redirect('/')
    })
})


app.get('/', (requisicao, resposta) => {
    const sql = 'SELECT * FROM tarefas'


    conexao.query(sql, (erro, dados) => {

        if (erro) {
            return console.log(erro)
        }

        

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0  ? false : true
            }
        })

        resposta.render('home', { tarefas })
    })

   
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo-app",
    port: "3306"
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
