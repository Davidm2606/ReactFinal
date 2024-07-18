const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
    credentials: true
}));
app.use(bodyParser.json());

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoweb'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Ruta para procesar el retiro
app.post('/procesar_retiro', (req, res) => {
    const { cedula, numcuenta, monto, fecha } = req.body;

    console.log('Datos recibidos:', req.body);

    if (!cedula || !numcuenta || !monto || !fecha) {
        console.log('Datos incompletos');
        return res.status(400).send('Todos los campos son necesarios');
    }

    const checkBalanceQuery = 'SELECT saldo FROM cuentas WHERE numcuenta = ? AND cedula = ?';
    connection.query(checkBalanceQuery, [numcuenta, cedula], (err, results) => {
        if (err) {
            console.error('Error al verificar el saldo:', err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length === 0) {
            console.log('Cuenta no encontrada');
            return res.status(404).send('Cuenta no encontrada');
        }

        const saldoActual = results[0].saldo;
        if (saldoActual < monto) {
            console.log('Fondos insuficientes');
            return res.status(400).send('Fondos insuficientes');
        }

        const nuevoSaldo = saldoActual - monto;
        const updateBalanceQuery = 'UPDATE cuentas SET saldo = ? WHERE numcuenta = ?';
        connection.query(updateBalanceQuery, [nuevoSaldo, numcuenta], (err, results) => {
            if (err) {
                console.error('Error al actualizar el saldo:', err);
                return res.status(500).send('Error en el servidor');
            }

            const insertRetiroQuery = 'INSERT INTO retiros (usuario, cuenta, monto, fecha) VALUES (?, ?, ?, ?)';
            connection.query(insertRetiroQuery, [cedula, numcuenta, monto, fecha], (err, results) => {
                if (err) {
                    console.error('Error al insertar el retiro:', err);
                    return res.status(500).send('Error en el servidor');
                }
                console.log('Retiro procesado exitosamente');
                res.send('Retiro procesado exitosamente');
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
