/**********************************************************************
 *  Liberias utilizadas
 * 
 * https://www.npmjs.com/package/bcrypt
 * https://www.npmjs.com/package/body-parser
 * https://www.npmjs.com/package/express
 * https://www.npmjs.com/package/jsonwebtoken
 * https://mongoosejs.com/
 * https://www.npmjs.com/package/mongoose-unique-validator
 * https://underscorejs.org/
 */

//==============================================
// Configuración globales
//==============================================
require( './config/config' );

//==============================================
// Paquetes requeridos
//==============================================
const express = require( 'express' );


//==============================================
// Configuración express
//==============================================
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) );
 
// parse application/json
app.use( bodyParser.json() );

// Rutas de api-rest
app.use( require('./routes/index') );

//==============================================
// Configuración mongoose
//==============================================
// Parametros de configuración mongoose.connect
let parametrosMongoose = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.BBDD_NOMGO, parametrosMongoose, ( err, resp ) => {

    if( err ) throw err;
    console.log( 'Conectado a la BBDD' );

});


//==============================================
// Exposición express
//==============================================
app.listen( process.env.PORT, ( err ) => {

    console.log( `Escuchando en el puerto: ${ process.env.PORT }` );

});