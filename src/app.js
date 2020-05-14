const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // on heroku server only 
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../tamplates/views')
const partialsPath = path.join(__dirname,'../tamplates/partials')

//setup handlers engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//setup static dir to serv
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index',{
        title:'weather app',
        name:'defo Sama'
    })

})

app.get('/help', (req, res) => {
    res.render('help',{
        msg:'this is defo from the future',
        title:'Help',
        name:'defo Sama'
     
    })
});

app.get('/about', (req, res) => {
    res.render('about',{
        title:'about me',
        name:'Defo Ibrahim'
    })
});

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error:'you must provide an address first',
        });
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {

            return res.send({ error });
        } 
        
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
             
                return res.send({error});
            }
            // console.log(data.location)
            // console.log(forecastData)
            res.send({
                address:req.query.address,
                location:location,
                forcast:forecastData
            });
        })
    })

});

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error:'you must provide search word',
        });
    }

    res.send({
        products:[]
    });
});

app.get('/help/*', (req, res) => {
    res.render('error',{
        title:'Error 404',
        name:'Defo Ibrahim',
        error:'artical not found '
    })
    
});

app.get('*', (req, res) => {
    res.render('error',{
        title:'Error 404',
        name:'Defo Ibrahim',
        error:'page not found '
    })
    
});

app.listen(port, () => {
    console.log('App listening on port '+port );
});