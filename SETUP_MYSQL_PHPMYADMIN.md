# 📊 Configuración MySQL con Laragon + HeiDiSQL

## 🔧 Requisitos Previos

1. ✅ **Laragon** instalado y corriendo (Apache y MySQL activos)
2. ✅ **HeiDiSQL** instalado
3. ✅ **Node.js** instalado
4. ✅ Este proyecto descargado

---

## 🚀 PASO 0: Iniciar Laragon

1. Abre **Laragon**
2. Asegúrate de que **Apache** y **MySQL** estén en estado **"Running"** (verde)
3. Si no están activos, haz clic en el botón **"Start All"**

---

## 📝 PASO 1: Conectar HeiDiSQL a tu Base de Datos (Laragon)

1. Abre **HeiDiSQL**
2. Haz clic en **"New"** (conexión nueva)
3. Rellena con los siguientes datos:
   - **Library**: MariaDB or MySQL (TCP/IP)
   - **Hostname/IP address**: `127.0.0.1` o `localhost`
   - **User**: `root`
   - **Password**: (dejar en blanco)
   - **Port**: `3306`
   - **Name**: Puedes poner algo como "Laragon Local"
4. Haz clic en **"Open"**

---

## 📝 PASO 2: Crear Base de Datos en HeiDiSQL

### Opción A: Importar desde Archivo SQL (Más Fácil) ⭐

1. En HeiDiSQL, con la conexión activa, ve al menú **"Archivo"** → **"Abrir script SQL..."**
2. Selecciona el archivo:
   ```
   crear_base_datos.sql
   ```
3. Haz clic en **"Ejecutar"** (botón verde con el triángulo o `Ctrl+E`)
4. ¡Listo! La base de datos se crea automáticamente con todas las tablas

### Opción B: Crear Manualmente

**CREAR LA BASE DE DATOS:**
1. En HeiDiSQL, haz clic derecho en **"Databases"** en el panel izquierdo
2. Selecciona **"Create new"** → **"Database"**
3. En **"Database name"**, escribe:
   ```
   tienda_camisas
   ```
4. Haz clic en **"OK"**

---

## 🗂️ PASO 3: Crear Tablas Manualmente (si lo necesitas)

Si elegiste la Opción A (importar SQL), puedes saltar este paso.

1. En HeiDiSQL, haz clic derecho en la base de datos `tienda_camisas`
2. Selecciona **"Open in query"** o abre una pestaña de SQL
3. Copia y pega cada código de tabla, uno por uno:

### TABLA 1: Productos

```sql
CREATE TABLE IF NOT EXISTS productos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  imagen LONGTEXT,
  cantidad INT DEFAULT 0,
  categoria VARCHAR(50),
  badge VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### TABLA 2: Contactos

```sql
CREATE TABLE IF NOT EXISTS contactos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### TABLA 3: Usuarios

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Presiona **Ctrl+E** o haz clic en el botón **"Execute"** (triángulo verde) después de cada tabla.

---

## 📦 PASO 4: Insertar Productos por Defecto

En HeiDiSQL, abre una nueva pestaña SQL y ejecuta:

```sql
INSERT INTO productos (id, nombre, descripcion, precio, imagen, cantidad, categoria, badge) VALUES
('1', 'Camisa Azul Clásica', 'Camisa de algodón 100% con diseño clásico y elegante', 45.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQq_ffeGTD2qwpR2fSM_ie4BumTO7EFp_YYg&s', 50, 'clásica', 'Popular'),
('2', 'Camisa Blanca Premium', 'Diseño minimalista con tela de alta calidad', 52.99, 'https://via.placeholder.com/250x300?text=Camisa+Blanca', 30, 'premium', 'Nuevo'),
('3', 'Camisa Negra Moderna', 'Estilo contemporáneo perfecto para cualquier ocasión', 39.99, 'https://via.placeholder.com/250x300?text=Camisa+Negra', 40, 'moderna', '-20%'),
('4', 'Camisa Roja Vibrante', 'Color intenso que refleja tu personalidad única', 48.99, 'https://via.placeholder.com/250x300?text=Camisa+Roja', 25, 'vibrante', NULL),
('5', 'Camisa Estampada', 'Diseño único con estampados artísticos modernos', 55.99, 'https://via.placeholder.com/250x300?text=Camisa+Estampada', 20, 'estampada', NULL),
('6', 'Camisa de Lino Casual', 'Perfecta para días cálidos, fresca y cómoda', 51.99, 'https://via.placeholder.com/250x300?text=Camisa+Lino', 35, 'casual', NULL);
```

---

## ✅ PASO 5: Verificar que Todo está Correcto

En HeiDiSQL, en el panel izquierdo, expande la base de datos `tienda_camisas` y deberías ver:
- 📋 **productos** con los 6 productos insertados
- 📧 **contactos** (tabla vacía)
- 👥 **usuarios** (tabla vacía)

---

## 🚀 PASO 6: Instalar Dependencias del Proyecto
```bash
npm start
```

---

## 🔍 Ver Datos en phpMyAdmin

Open a command prompt or PowerShell in the project folder and run:
```bash
npm install
```

---

## 🚀 PASO 7: Ejecutar el Servidor

En el mismo terminal, inicia el servidor:

```bash
npm start
```

Deberías ver algo como:
```
✅ Conectado a MySQL exitosamente
Servidor escuchando en puerto http://localhost:3000
```

---

## 🌐 PASO 8: Abrir el Proyecto en el Navegador

1. Abre tu navegador: **Chrome, Edge, Firefox, etc.**
2. Ve a: `http://localhost:3000`
3. ¡Verás la tienda de camisas! 🎉

---

## 📊 Monitorear Base de Datos en HeiDiSQL

**Para ver los productos que creaste:**
1. En HeiDiSQL, expande `tienda_camisas` → `productos`
2. Haz clic derecho y selecciona **"Edit table"** o **"Query table"**
3. Verás los 6 productos insertados

**Para ver los contactos (cuando envíes mensajes):**
1. Ve a `tienda_camisas` → `contactos`
2. Haz clic derecho → **"Edit table"**
3. Los mensajes aparecerán aquí automáticamente

**Para ver los usuarios (cuando se registren):**
1. Ve a `tienda_camisas` → `usuarios`
2. Haz clic derecho → **"Edit table"**
3. Los usuarios aparecerán aquí automáticamente

---

## 📱 Ejemplos de Queries SQL Útiles

Ejecuta estos en HeiDiSQL abriendo una pestaña SQL:

### Ver todos los productos
```sql
SELECT * FROM productos;
```

### Ver producto específico
```sql
SELECT * FROM productos WHERE nombre LIKE '%Azul%';
```

### Ver contactos más recientes
```sql
SELECT * FROM contactos ORDER BY createdAt DESC;
```

### Contar usuarios registrados
```sql
SELECT COUNT(*) as total_usuarios FROM usuarios;
```

### Actualizar precio de un producto
```sql
UPDATE productos SET precio = 49.99 WHERE id = '1';
```

### Ver usuarios por ciudad
```sql
SELECT * FROM usuarios WHERE ciudad = 'Madrid';
```

---

## ⚠️ Solución de Problemas

### Error: "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

### Error: "Cannot connect to database"
1. Verifica que **Laragon** está ejecutándose (Apache + MySQL en verde)
2. Abre HeiDiSQL y prueba conectarte manualmente
3. Revisa que el puerto 3306 no esté bloqueado

### Error: "Access denied for user 'root'@'localhost'"
Verifica en [database.js](database.js) que coincida con tu configuración de Laragon:
```javascript
user: 'root',
password: '',  // Laragon no tiene contraseña por defecto
database: 'tienda_camisas'
```

### El servidor no inicia
1. Cierra el terminal y abre uno nuevo
2. Navega a la carpeta del proyecto
3. Ejecuta `npm install` nuevamente si es necesario
4. Luego `npm start`

### Los datos no se guardan
1. Verifica que MySQL está corriendo en Laragon
2. Abre HeiDiSQL y comprueba que la base de datos existe
3. Revisa la consola del servidor para ver mensajes de error

---

## 🎯 Tips Importantes

- **Usuario MySQL por defecto en Laragon:** `root`
- **Contraseña por defecto:** (vacía - sin contraseña)
- **Puerto MySQL:** `3306`
- **Las tablas se crean automáticamente** cuando ejecutas el servidor
- **HeiDiSQL** es útil para ver/editar datos directamente
- Mantén **Laragon corriendo** mientras desarrollas

---

## 📚 Documentación Útil

- [Documentación Laragon](https://laragon.org/docs/)
- [Documentación HeiDiSQL](https://www.heidisql.com/)
- [Documentación MySQL](https://dev.mysql.com/doc/)
- [Documentación de mysql2 para Node.js](https://sidorares.github.io/node-mysql2/)

¡Listo para comenzar! 🚀
