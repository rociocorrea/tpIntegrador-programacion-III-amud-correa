Trabajo práctico Integrador - Programación III

Cómo ejecutar este repo:

Dentro de tpIntegradorBack: 
1- Inicializamos un proyecto de node con npm init -y que crea un package.json
2- Intalamos Express.js: npm i express, crea node_modules y package-lock.json
3- node_modules se agrega a .gitignore
4- Creamos archivo .env donde se alojaran las variables de entorno
5- .env se agrega a .gitignore
6- Instalamos npm i mysql2, para gestionar bases de datos
7- Instalamos npm i dotenv, carga variables de entorno en el proyecto
8- En package.json:
    "type": "module" para utilizar sintaxis moderna
    en "scripts" agregar "dev": "node --watch index.js" así, para ejecutar este comando utilizo npm run dev