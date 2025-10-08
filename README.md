# TrackMySpending - Backend

Sistema de autenticación backend para una aplicación de seguimiento de gastos personales, construido con Node.js, Express y MongoDB.

## 🚀 Tecnologías

- **Node.js** + **TypeScript**
- **Express.js**
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **Bcrypt** para encriptación de contraseñas
- **Zod** para validación de datos

## 🔐 Características de Seguridad

- Autenticación mediante JWT (Access + Refresh tokens)
- Tokens almacenados en cookies HTTP-only
- Rate limiting
- Helmet para headers de seguridad
- CORS configurado
- Encriptación de contraseñas con bcrypt

## 📦 Instalación

\`\`\`bash
npm install
\`\`\`

## ⚙️ Variables de Entorno

Crear un archivo `.env` con:

\`\`\`
PORT=5000
MONGO_URI=tu_uri_de_mongodb
NODE_ENV=development
JWT_ACCESS_SECRET=tu_secret_para_access_token
JWT_REFRESH_SECRET=tu_secret_para_refresh_token
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d
\`\`\`

## 🏃‍♂️ Ejecución

\`\`\`bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
\`\`\`

## 📝 Estado del Proyecto

🚧 **En desarrollo** - Este proyecto es parte de mi aprendizaje en desarrollo backend y autenticación con JWT.

