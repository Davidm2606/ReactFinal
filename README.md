Autores: Abraham Romo - David Terán
Banca Web
banca-web es una aplicación web desarrollada en React que permite gestionar cuentas bancarias, incluyendo funcionalidades como inicio de sesión, depósito, retiro de fondos, transferencia de fondos entre cuentas y evaluación de gastos.

Características
Inicio de sesión: Autenticación de usuarios.
Depósito: Realiza depósitos en cuentas bancarias.
Retiro: Retira fondos de cuentas bancarias.
Transferencia de fondos: Transfiere fondos entre cuentas.
Evaluación de gastos: Revisa y analiza los gastos realizados.
Tecnologías Utilizadas
Frontend: React, CSS
Backend: Node.js con Express
Base de Datos: MySQL, gestionada a través de phpMyAdmin
Estructura del Proyecto
Frontend (React):

src/
components/ - Componentes React
styles/ - Archivos de estilos CSS
Home.js - Página principal con funcionalidades integradas
Login.js - Página de inicio de sesión
Backend (Node.js):

server/
index.js - Servidor API con Express para gestión de login y operaciones con MySQL
Instalación
Clonar el repositorio:

bash
Copy code
git clone https://github.com/tu-usuario/banca-web.git
cd banca-web
Instalar dependencias del frontend:

bash
Copy code
cd frontend
npm install
Instalar dependencias del backend:

bash
Copy code
cd ../server
npm install
Configurar la base de datos:

Asegúrate de que tu base de datos MySQL está corriendo y configurada con las tablas cuentas, depositos, retiros, transferencias, y usuarios.
Configurar las variables de entorno:

Crea un archivo .env en la carpeta server con las variables necesarias para conectar con tu base de datos.
Iniciar el servidor:

bash
Copy code
cd server
node index.js
Iniciar el frontend:

bash
Copy code
cd ../frontend
npm start
Uso
Accede a la aplicación: Abre tu navegador y navega a http://localhost:3000 para la interfaz de usuario.
Inicia sesión: Utiliza las credenciales de usuario para acceder a la aplicación.
