# 🚀 GUÍA COMPLETA: Tienda de Camisas con Laragon + HeiDiSQL

## 📋 Resumen de lo que vamos a hacer

1. ✅ Iniciar **Laragon** (MySQL + Apache)
2. ✅ Conectar con **HeiDiSQL**
3. ✅ Crear la base de datos y tablas
4. ✅ Instalar dependencias del proyecto
5. ✅ Ejecutar el servidor Node.js
6. ✅ Abrir la tienda en el navegador

---

## 🔧 PASO 1: Iniciar Laragon

### 🎯 Objetivo: Asegurar que MySQL está corriendo

1. Busca **Laragon** en tu computadora y ábrelo
2. Verás una ventana con botones
3. **IMPORTANTE:** Asegúrate de que:
   - **Apache** está **verde** (Running)
   - **MySQL** está **verde** (Running)
4. Si alguno está en rojo, haz clic en **"Start All"** para iniciar todos

**¿Está todo verde? ¡Continúa!**

---

## 🗄️ PASO 2: Conectar HeiDiSQL a tu Base de Datos

### 🎯 Objetivo: Establecer conexión con MySQL

1. Abre **HeiDiSQL** (es una aplicación de escritorio)
2. En la ventana, haz clic en **"New"** (botón azul en la parte inferior-izquierda)
3. Se abrirá un formulario con:
   - **Library**: Asegúrate que dice `MariaDB or MySQL (TCP/IP)`
   - **Hostname/IP address**: `127.0.0.1` (o `localhost`)
   - **User**: `root`
   - **Password**: (DEJAR VACÍA - presiona Delete)
   - **Port**: `3306`

4. En el campo **"Name"** (abajo), puedes escribir algo como:
   ```
   Tienda Camisas Local
   ```

5. Haz clic en el botón **"Open"** (verde)

**RESULTADO ESPERADO:** Verás una ventana con dos paneles - a la izquierda verás "Databases" con varias bases de datos.

---

## 📊 PASO 3: Crear la Base de Datos

### Opción A: Importar desde un Archivo (MÁS RÁPIDO) ⭐

1. En HeiDiSQL, ve a la parte superior → Menú **"Archivo"**
2. Selecciona **"Abrir script SQL..."**
3. Se abre una ventana para buscar archivos
4. Busca y selecciona:
   ```
   crear_base_datos.sql
   ```
5. Haz clic en **"Abrir"**

**RESULTADO:** HeiDiSQL mostrará el contenido del archivo SQL

6. Presiona **Ctrl + E** o haz clic en el botón **"Execute"** (triángulo verde)
7. Espera a que termine (verás un pequeño cuadro de diálogo)

**¡LISTO!** La base de datos `tienda_camisas` se creó automáticamente con todas las tablas y productos.

---

### Opción B: Crear Manualmente (Si la Opción A no funciona)

**PASO 1: Crear la base de datos**

1. En el panel izquierdo, haz clic derecho en **"Databases"**
2. Selecciona **"Create new"** → **"Database"**
3. Se abrirá un cuadro de diálogo
4. En **"Database name"**, escribe:
   ```
   tienda_camisas
   ```
5. Haz clic en **"OK"**

**PASO 2: Crear las tablas**

1. En el panel izquierdo, expande `tienda_camisas` (haz clic en la flecha)
2. Haz clic derecho en **"Tables"** (o en el espacio vacío)
3. Selecciona **"Open in query"** o abre una pestaña SQL nueva
4. Copia y pega este código:

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

5. Presiona **Ctrl + E** para ejecutar
6. Repite los pasos 4-5 con este código (tabla contactos):

```sql
CREATE TABLE IF NOT EXISTS contactos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

7. Y con este (tabla usuarios):

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

**PASO 3: Insertar productos de ejemplo**

Abre una nueva pestaña SQL y ejecuta:

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

## ✅ PASO 4: Verificar que la Base de Datos se Creó Correctamente

En el panel izquierdo de HeiDiSQL:

1. Expande **"Databases"**
2. Busca y expande **"tienda_camisas"**
3. Expande **"Tables"**

Deberías ver exactamente **3 tablas**:
- 📋 **productos** 
- 📧 **contactos**
- 👥 **usuarios**

Si ves estas 3 tablas, ¡todo está correcto! 🎉

---

## 💻 PASO 5: Instalar Dependencias del Proyecto

### 🎯 Objetivo: Descargar todas las librerías necesarias

1. Abre **Power Shell** o **Símbolo del Sistema (cmd)**
2. Navega a la carpeta del proyecto. Escribe:
   ```bash
   cd Desktop\proyecto-full-stack
   ```
   (o la ruta correcta de tu proyecto)

3. Verifica que estés en la carpeta correcta (verás los archivos como `server.js`, `package.json`, etc.)

4. Ejecuta este comando:
   ```bash
   npm install
   ```

5. **¡ESPERA!** Verás mucho texto en la pantalla. Esperamos hasta que terminen las descargas. Puede tomar 2-5 minutos.

**CUANDO TERMINE:** Deberías ver un mensaje sin errores (rojo).

---

## 🚀 PASO 6: Ejecutar el Servidor

### 🎯 Objetivo: Iniciar la aplicación Node.js

1. En el mismo terminal (PowerShell/cmd), escribe:
   ```bash
   npm start
   ```

2. **RESULTADO ESPERADO:** Verás mensajes como:
   ```
   ✅ Conectado a MySQL exitosamente
   Servidor escuchando en puerto http://localhost:3000
   ```

**¡IMPORTANTE!** No cierres este terminal mientras uses la aplicación.

---

## 🌐 PASO 7: Abrir la Tienda en el Navegador

### 🎯 Objetivo: Ver tu tienda de camisas funcionando

1. Abre tu navegador (Chrome, Edge, Firefox, etc.)
2. En la barra de dirección, escribe:
   ```
   http://localhost:3000
   ```
3. Presiona **Enter**

**¡RESULTADO!** Deberías ver:
- 🎨 Una página bonita con la tienda de camisas
- 👕 Los 6 productos que insertamos
- 📝 Formularios para contactar y registrarse

---

## 📱 FUNCIONALIDADES DE LA TIENDA

### 👀 Ver Productos
- Puedes ver los 6 productos cargados
- Cada producto muestra: nombre, descripción, precio, imagen

### 📧 Enviar Contacto
- Completa el formulario con tu nombre, email y mensaje
- Haz clic en "Enviar"
- El mensaje se guarda en la tabla **contactos** de la base de datos

### 👤 Registrarse
- Haz clic en "Crear Cuenta"
- Completa el formulario
- Tu usuario se guarda en la tabla **usuarios**

### 📊 Ver en HeiDiSQL
Para ver los datos que enviaste:
1. En HeiDiSQL, abre la base de datos `tienda_camisas`
2. Expande **"Tables"**
3. Haz clic derecho en:
   - **contactos** → "Edit table" para ver mensajes
   - **usuarios** → "Edit table" para ver registros

---

## 🛑 Para Detener la Tienda

En el terminal donde ejecutaste `npm start`:
1. Presiona **Ctrl + C**
2. Verás: `^C Ctrl+C pressed`
3. El servidor se detiene

---

## 🔄 Para Volver a Ejecutar

1. Abre el terminal en la carpeta del proyecto
2. Escribe: `npm start`
3. Abre el navegador en `http://localhost:3000`

---

## 💡 TIPS IMPORTANTES

### ✅ Checklist antes de empezar
- [ ] Laragon está corriendo (Apache y MySQL en verde)
- [ ] HeiDiSQL está conectado
- [ ] Base de datos `tienda_camisas` fue creada
- [ ] Las 3 tablas existen
- [ ] `npm install` terminó sin errores
- [ ] `npm start` muestra "Conectado a MySQL exitosamente"
- [ ] El navegador abre sin problemas en `http://localhost:3000`

### 🚨 Si algo no funciona

**"No puedo conectar en HeiDiSQL"**
- Verifica que Laragon está abierto y con Apache/MySQL en verde
- En HeiDiSQL, prueba con `localhost` en lugar de `127.0.0.1`

**"npm install no funciona"**
- Verifica que tienes Node.js instalado: `node --version`
- Intenta ejecutar en Power Shell (no cmd)

**"npm start muestra error de conexión"**
- Laragon debe estar ejecutándose
- Verifica la base de datos existe en HeiDiSQL

**"El navegador no muestra la tienda"**
- Verifica que el terminal muestra "Conectado a MySQL"
- Intenta refrescar la página: F5
- Verifica la URL: `http://localhost:3000` (sin `https`)

---

## 📊 Estructura del Proyecto

```
proyecto-full-stack/
├── server.js              ← Inicia el servidor
├── database.js            ← Configuración de MySQL
├── package.json           ← Dependencias
├── index.html             ← Página principal
├── index.css              ← Estilos
├── crear_base_datos.sql   ← Script para crear BD
├── GUIA_PASO_A_PASO.md    ← Esta guía
└── SETUP_MYSQL_PHPMYADMIN.md  ← Detalles técnicos
```

---

## 🎉 ¡Ya Estás Listo!

Has completado la configuración. Ahora puedes:
- ✅ Ver la tienda
- ✅ Enviar contactos
- ✅ Registrar usuarios
- ✅ Ver datos en HeiDiSQL
- ✅ Modificar productos

**¡Felicidades! 🚀**
