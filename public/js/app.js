fetch('http://puzzle.mead.io/puzzle').then((respo)=>{
    respo.json().then( (data)=> {
            console.log(data);
            
    })

})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address=' + location).then((respo)=>{ 
        // local = http://localhost:3000/weather?address=
        respo.json().then( (data)=> {
        if(data.error){

            msg1.textContent = data.error
            return console.log(data.error); 
        }
        msg1.textContent = data.location
        msg2.textContent = data.forcast

        })
    })
    
    
})