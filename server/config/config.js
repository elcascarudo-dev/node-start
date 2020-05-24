//========================================================
// Puerto
//========================================================
process.env.PORT = process.env.PORT || 3000

//========================================================
// Conexión a BBDD MongoDB
//
// Reemplazar los valores en la cadena de conexión
//========================================================
process.env.BBDD_NOMGO = process.env.BBDD_NOMGO || 'mongodb://root:example@localhost:27017/test?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'