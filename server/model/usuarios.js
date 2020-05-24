const mongoose = require('mongoose');
const uniqueValidator = require( 'mongoose-unique-validator' );

let roleValido = {
    values: [ 'ADMIN_ROLE', 'USER_ROLE' ],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;



/************************************************ 
 * Esquemas
 */
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValido        // En "enum" define la lista de valores admintidos 
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});


/*************************************************************************
 * Definimos el plugin que queremos usar
 */
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico' } );

/*************************************************************************
 * Se exporta "Usuario" con toda la configuración de "usuarioSchema"
 */
module.exports = mongoose.model( 'Usuario', usuarioSchema );