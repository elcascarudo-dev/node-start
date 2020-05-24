//========================================================
// Librerias
//========================================================
const express = require('express');
const bcrypt = require( 'bcrypt' );
const _ = require( 'underscore' );

const app = express();

//========================================================
// Modelo
//========================================================
const Usuario = require( '../model/usuarios' );

//========================================================
// Middlewares
//========================================================



//========================================================
// Rutas
//========================================================
/************************************************ 
 * get Usuarios
 */
app.get('/usuario', function (req, res) {

  let desde = Number( req.query.desde ) || 0;
  let limite = Number( req.query.limite ) || 5;

  //( { parametros de busqueda}, 'campos que quiero que se muestren' ) 
  Usuario.find({}, 'nombre email role estado google img')
          .skip( desde )              // Salta los primeros 5
          .limit( limite )            // Muestra 5 registros
          .exec( ( err, usuarios ) => {

              if( err ){
                return res.status( 400 ).json({
                  ok: false,
                  err
                });
              }

              // Cuenta la cantidad de registros que tengo en la colección
              Usuario.count( {}, ( err, conteo ) => {
                res.json({
                  ok: true,
                  cantidadd: conteo,
                  usuarios
                });
              });


          });
});

/************************************************ 
 * get Buscar Usuarios por nombre
 */
app.get( '/usuario/buscar/:exprecion', ( req, res ) => {

  let exprecion = req.params.exprecion;

  let exReg = new RegExp( exprecion, 'i' );

  Usuario.find( { nombre: exReg } )
    .exec( ( err, resultado ) => {

      if( err ){
        return res.status( 400 ).json({
            ok: false,
            err
        });
      }

      res.json({
        ok: true,
        usuario: resultado
      });
    });
});

/************************************************ 
 * post Crear Usuario
 */
app.post('/usuario', function (req, res) {

  let body = req.body;

  console.log( body );

  if ( body.nombre == null || body.email == null || body.password == null ) {
    return res.status( 400 ).json( {
      ok: false,
      err: {
        message: 'Se requieren los datos \'nombre\', \'email\' y \'password\' '
      }
    });
  }

  //Creo una nueva instancia del esquema Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync( body.password, 10 ),
    role: body.role
  });

  usuario.save( ( err, userDB ) => {
    //Envio el error si es que nos da uno
    if( err ){
      return res.status( 400 ).json( {
          ok: false,
          err        // === err: err
      });
    }
    // Devuelvo el usuario que se grabo en la BBDD
    res.json({
      ok: true,
      usuario: userDB
    });

  });

});


/************************************************ 
 * put Actualizar usuario
 */
app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;
  // El pick devuelve un nuevo arreglo con los objetos que le definimos en el array
  let body = _.pick( req.body, [ 'nombre', 'email', 'img', 'role', 'estado' ] );

  Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, userDB ) => {

    if( err ){
      res.status( 400 ).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: userDB
    });

  });

});

/************************************************ 
 * delete Eliminar Usuario
 */
app.delete('/usuario/:id', function (req, res) {
  
  let id = req.params.id;

  Usuario.findByIdAndRemove( id, ( err, usuarioBorrado ) => {

    if( err ){
      res.status( 400 ).json({
        ok: false,
        err
      });
    }

    // Si enviamos dos veces el mismo ID devuelve "null" y pasa por esta validación
    if( !usuarioBorrado ){
      res.status( 400 ).json({
        ok: false,
        err: {
            message: 'Usuarios no encontrado'
        }
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });
  

});

module.exports = app;