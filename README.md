# Sistema de Gestión de Cine

API REST desarrollada con NestJS, TypeORM y PostgreSQL para la práctica TAW-251.

## Requisitos
- Node.js 20 o superior
- PostgreSQL 14 o superior
- npm

## Instalación

```bash
npm install
```

Crear una base de datos en PostgreSQL llamada `sistema_cine`. Copiar `.env.example` a `.env` y configurar las credenciales:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contrasena
DB_NAME=sistema_cine
```

Ejecutar en desarrollo:

```bash
npm run start:dev
```

La API estará en `http://localhost:3001/api`.

## Documentación
- Scalar: `http://localhost:3001/reference`
- Swagger: `http://localhost:3001/docs`

## Módulos y rutas
| Módulo | Ruta base |
|---|---|
| Salas | `/api/salas` |
| Géneros | `/api/generos` |
| Películas | `/api/peliculas` |
| Funciones | `/api/funciones` |
| Clientes | `/api/clientes` |
| Boletos | `/api/boletos` |

Cada módulo implementa GET (listar), GET por id, POST, PATCH y DELETE lógico. Películas también permite `POST /api/peliculas/:id/generos` con `{ "idGeneros": [1,2] }` y `DELETE /api/peliculas/:id/generos/:idGenero`.

## Ejemplo de datos

Crear sala:
```json
{ "nombre":"Sala 1", "capacidad":80, "tipo":"2D" }
```
Crear género:
```json
{ "nombre":"Acción", "descripcion":"Películas de acción" }
```
Crear película:
```json
{ "titulo":"Ejemplo", "sinopsis":"Sinopsis de prueba", "duracionMin":120, "clasificacion":"ATP", "idGeneros":[1] }
```
Crear cliente:
```json
{ "nombres":"Ana", "paterno":"Perez", "materno":"Lopez", "email":"ana@mail.com" }
```
Crear función:
```json
{ "idSala":1, "idPelicula":1, "fechaHora":"2026-12-01T19:00:00.000Z", "precio":35 }
```
Vender boleto:
```json
{ "idFuncion":1, "idCliente":1, "numeroAsiento":5 }
```
Si no se manda `precioPagado`, se utiliza el precio de la función. No se permite repetir un asiento en una función ni superar la capacidad de la sala.

## Consideraciones
`synchronize: true` está habilitado para facilitar el desarrollo local. No debe utilizarse así en producción. Los DELETE utilizan `softDelete`, por lo que los registros permanecen en la base de datos con `eliminadoEn`.

## GitHub
Crear un repositorio vacío en GitHub y ejecutar desde la carpeta del proyecto:
```bash
git init
git add .
git commit -m "Implementa sistema de gestion de cine con NestJS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/sistema-cine.git
git push -u origin main
```
No subir el archivo `.env`; el `.env.example` sí debe incluirse.
