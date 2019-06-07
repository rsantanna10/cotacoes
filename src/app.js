const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Bem vindo ao sistema de cotações',
        author: 'Renato'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'Sobre',
        author: 'Renato'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Ajuda',
        author: 'Renato'
    })
})

app.get('/cotacoes', (req,res) => {
    const contacao = {
        symbol : 'PETR4.SA',
        price_open : 10,
        price_open : 12,
        day_high : 13,
        day_low : 9
    }

    if(!req.query.ativo){
      return res.status(400).json({ error : { message : 'Ativo deve ser informado', code : 400 }})
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if(err){
            console.log(err)
            return res.status(err.code).json({ error : { message : 'Ativo deve ser informado como query parameter' , code : err.code }})
        }
        
        console.log(body)
        return res.status(200).json(body)
    })    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMessage : 'Não existe página depois do HELP',
        title: '404 Ajuda',
        author: 'Renato'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        errorMessage : 'Página não encontrada',
        title: '404',
        author: 'Renato'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})