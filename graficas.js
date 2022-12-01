var express = require('express');
var mysql = require('mysql');

var app = express();
var cors = require('cors');

//app.use(cors());
//app.use(express.json());
//Establece los parametros de la conexion con la base de datos
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'sistematizaciondatos_com'
})

//Probar la conexion
conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('conexion con la base de datos exitosa');
    }
});

/*Mensaje de ruta de inicio   /    */
//app.get('/', function (req, res) {
//    res.send('Ruta de inicio');
//});

/* Mostrar todos los profesores*/
app.get('/api/componente', (req,res)=>{
    
    conexion.query('SELECT res_componentes.codigoC, res_componentes.nombreC, res_espacio.codigo, res_espacio.nombre FROM res_componentes INNER JOIN res_espacio ON res_componentes.codigoC = res_espacio.codigo_componente',(error,filas)=>{
        if(error){
            throw error;
        }else{

            res.send(filas);
        }
    });
});

/*Enciende el servidor */
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
    console.log('Servidor encendido en puerto ' + puerto);
});

/*Ruta estatica localhost*/

app.use('/public/html', express.static(__dirname +'/html'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/parcial.html');
});



