# 🛍️ Tienda de Camisas - StyleShirt

Plataforma full-stack de e-commerce para venta de camisas con panel de administración completo, respaldado por **MySQL, Laragon y HeiDiSQL**.

## 📋 Características

- ✅ **Productos dinámicos** - Cargados desde base de datos MySQL
- ✅ **Panel Admin** - Crear, actualizar y eliminar productos
- ✅ **Sistema de Usuarios** - Registro y login de clientes
- ✅ **Formulario de Contacto** - Los mensajes se guardan en base de datos
- ✅ **API REST Completa** - Endpoints para CRUD de productos, usuarios y contactos
- ✅ **HeiDiSQL** - Interfaz para gestionar la BD visualmente
- ✅ **Laragon** - Entorno local con Apache y MySQL
- ✅ **Interfaz responsiva** - Funciona en móviles y desktops
- ✅ **Diseño profesional** - Con gradientes y animaciones

## 🚀 Guía Rápida de Instalación

### Requisitos
- Node.js v14+ instalado
- **Laragon** corriendo (Apache y MySQL activos)
- **HeiDiSQL** instalado
- Este projeto descargado

### ⚡ START HERE - ¡COMIENZA AQUÍ!

👉 **[VER INICIO RÁPIDO (5 PASOS)](INICIO_RAPIDO.md)** ← **Empieza por aquí si es tu primera vez**

---

### 📚 DOCUMENTACIÓN DISPONIBLE

1. **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** ⚡
   - 5 pasos simples para que funcione todo
   - Para usuarios nuevos
   - Toma ~15 minutos

2. **[GUIA_PASO_A_PASO.md](GUIA_PASO_A_PASO.md)** 📖
   - Guía detallada y explicada
   - Con imágenes mentales de cada paso
   - Solución de problemas

3. **[SETUP_MYSQL_PHPMYADMIN.md](SETUP_MYSQL_PHPMYADMIN.md)** 🔧
   - Detalles técnicos
   - Para usuarios avanzados

---

### 📝 Pasos Resumidos (para referencia)

```
1. Laragon: Apache + MySQL en verde
2. HeiDiSQL: Conectar con localhost:root:sin_contraseña
3. Importar crear_base_datos.sql
4. npm install
5. npm start → http://localhost:3000
```

## 📱 Uso de la Aplicación

### Para Clientes
- Ver productos disponibles
- Registrarse e iniciar sesión
- Ver descripciones, precios y stock
- Agregar productos al carrito
- Enviar mensajes de contacto

### Para Administradores
- Hacer clic en botón **"⚙️ Panel Admin"**
- **Crear** nuevos productos
- **Editar** productos existentes
- **Eliminar** productos
- Ver historial de contactos
- Ver lista de usuarios registrados

## 🔌 API REST

### Base URL
```
http://localhost:3000/api
```

### Endpoints de Productos

#### GET - Todos los productos
```bash
GET /api/productos
```

#### POST - Crear producto
```bash
POST /api/productos
Content-Type: application/json

{
  "nombre": "Camisa Nueva",
  "descripcion": "Descripción",
  "precio": 49.99,
  "cantidad": 25,
  "imagen": "https://...",
  "categoria": "casual",
  "badge": "Nuevo"
}
```

#### PUT - Actualizar producto
```bash
PUT /api/productos/:id
```

#### DELETE - Eliminar producto
```bash
DELETE /api/productos/:id
```

### Endpoints de Usuarios

#### POST - Registrar usuario
```bash
POST /api/usuarios/registro
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña123",
  "telefono": "123456789",
  "direccion": "Calle Principal 123",
  "ciudad": "Madrid"
}
```

#### POST - Iniciar sesión
```bash
POST /api/usuarios/login
{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

#### GET - Obtener usuario por ID
```bash
GET /api/usuarios/:id
```

#### PUT - Actualizar usuario
```bash
PUT /api/usuarios/:id
```

### Endpoints de Contacto

#### POST - Enviar mensaje
```bash
POST /api/contacto
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "mensaje": "Consulta..."
}
```

## 🗄️ Base de Datos - Estructura

### Tabla: productos
```
id (VARCHAR 36)           - Identificador único
nombre (VARCHAR 100)      - Nombre del producto
descripcion (TEXT)        - Descripción detallada
precio (DECIMAL 10,2)    - Precio
imagen (LONGTEXT)         - URL de la imagen
cantidad (INT)            - Stock disponible
categoria (VARCHAR 50)    - Categoría del producto
badge (VARCHAR 50)        - Distintivo (Popular, Nuevo, -20%, etc)
createdAt (TIMESTAMP)     - Fecha de creación
updatedAt (TIMESTAMP)     - Fecha de actualización
```

### Tabla: usuarios
```
id (VARCHAR 36)           - Identificador único
nombre (VARCHAR 100)      - Nombre completo
email (VARCHAR 100)       - Email único
password (VARCHAR 255)    - Contraseña
telefono (VARCHAR 20)     - Número de teléfono
direccion (TEXT)          - Dirección de envío
ciudad (VARCHAR 50)       - Ciudad
createdAt (TIMESTAMP)     - Fecha de registro
updatedAt (TIMESTAMP)     - Fecha de actualización
```

### Tabla: contactos
```
id (VARCHAR 36)           - Identificador único
nombre (VARCHAR 100)      - Nombre del remitente
email (VARCHAR 100)       - Email del remitente
mensaje (TEXT)            - Contenido del mensaje
createdAt (TIMESTAMP)     - Fecha del mensaje
```

## 📁 Estructura del Proyecto

```
proyecto-full-stack/
├── index.html                      # Frontend (HTML)
├── index.css                       # Estilos CSS
├── server.js                       # Servidor Express
├── database.js                     # Conexión a MySQL
├── package.json                    # Dependencias
├── crear_base_datos.sql            # Script SQL para crear BD
├── SETUP_MYSQL_PHPMYADMIN.md       # Guía de configuración MySQL
├── README.md                       # Este archivo
└── .gitignore                      # Archivos a ignorar
```

## 🔧 Configuración

### Cambiar conexión MySQL
Editar `database.js`:
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda_camisas',
  // ... más opciones
});
```

### Cambiar puerto del servidor
En `server.js`:
```javascript
const PORT = 3000;  // Cambiar a otro número si está en uso
```

## 🐛 Solución de Problemas

### "Cannot connect to MySQL"
1. Verifica que XAMPP está corriendo (Apache y MySQL activos)
2. Verifica que phpMyAdmin funciona: `http://localhost/phpmyadmin`
3. Confirma que la base de datos `tienda_camisas` existe

### "Column count doesn't match"
Verifica que hay el mismo número de columnas y valores en las consultas INSERT.

### "Access denied for user 'root'"
En XAMPP, el usuario es `root` y la contraseña está vacía. Confirma en `database.js`.

### Los datos no persisten
1. Abre phpMyAdmin
2. Ve a `tienda_camisas` → tabla respectiva
3. Verifica que los datos están en la BD
4. Si no, revisa la consola del servidor para mensajes de error

## 📊 Ver Datos en phpMyAdmin

1. Abre `http://localhost/phpmyadmin`
2. Selecciona `tienda_camisas` en el menú izquierdo
3. Haz clic en la tabla que quieras examinar
4. Ve a la pestaña **"Examinar"** para ver los datos

## 🚀 Próximas Mejoras

- 🛒 Carrito persistente en localStorage
- 💳 Integración de pagos (Stripe, PayPal)
- 📧 Notificaciones por email
- 🔐 Hash de contraseñas con bcrypt
- 🔑 Autenticación con JWT tokens
- 📸 Upload de imágenes personalizado
- ⭐ Sistema de reseñas y valoraciones

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo.

---

**Última actualización:** 29 de Marzo de 2026  
**Versión:** 2.0.0 (MySQL Edition)
