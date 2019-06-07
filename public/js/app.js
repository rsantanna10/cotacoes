console.log('javascript frontend')

const cotacoesForm = document.querySelector('form')
const mainMessage =  document.querySelector('h3')
const price =  document.querySelector('#price')
const price_open =  document.querySelector('#price_open')
const day_high =  document.querySelector('#day_high')
const day_low =  document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMessage.innerHTML = 'Ativo deve ser informado'
        console.log('Ativo deve ser informado')
        return
    }

    mainMessage.innerHTML = 'buscando...'

    price.innerText = ''
    price_open.innerText = ''
    day_high.innerText = ''
    day_low.innerText = ''
    
    fetch(`/cotacoes?ativo=${ativo}`).then((res) => {
    res.json().then((data) => {
        if(data.error){
            mainMessage.innerHTML = 'Alguma coisa deu errado'
            console.log(`Alguma coisa deu errado - ${data.error.message} - código: ${data.error.code}`)      
        }else{
            mainMessage.innerText = data.symbol
            price.innerText = `PRICE: ${data.price}`
            price_open.innerText = `OPEN: ${data.price_open}`
            day_high.innerText = `HIGH: ${data.day_high}`
            day_low.innerText = `LOW: ${data.day_low}`
        }      
    })
})
})
