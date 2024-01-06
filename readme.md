# Blueprint => plantilla de programas NODEJS

Esta es la plantilla genérica, que se trabaja para cada proyecto que se desarrolle utilizando:

- express js
- Mongo DB / postgre / mysql
- MERN production web
- Sockets & extensiones
- plugins y otras utilidades de desarrollo

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- Node.js
- npm (administrador de paquetes de Node.js)
- revisar el package.json, estamos utilizando type: module.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/luismavlo/esqueleto_node_express.git

2. Ejecutar el siguiente comando:
    ```bash
   npm install
   
3. Clonar el archivo .env.template y renombrarlo a .env, colocar los atributos respectivos dentro del .env

4. Instalar el paquete de origenes cruzados:
   ```bash
   npm i cors

5. Para iniciar la aplicación ejecutar el comando:
   ```bash
   npm run start:dev

## Paso 1: base de datos

1. Usaremos una database en la nube, podemos elegir entre:
- neontech
- elephantsql

2. La URL que se genera por base de datos, debemos colocarla dentro del .env
3. configurar el environment.js con los valores del .env


