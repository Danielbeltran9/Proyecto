# ⚡ INICIO RÁPIDO - Tienda de Camisas

**¿Acabas de instalar Laragon? ¡Aquí está lo que necesitas!**

---

## 📋 Esquema: 5 Pasos para que Funcione Todo

```
┌─────────────────────────────────────────────────────────┐
│  PASO 1: Abrir Laragon                                  │
│  (Apache + MySQL en verde)                              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PASO 2: Conectar con HeiDiSQL                          │
│  (localhost, root, sin contraseña)                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PASO 3: Importar crear_base_datos.sql                  │
│  (Todas las tablas se crean automáticamente)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PASO 4: npm install                                    │
│  (Descargar dependencias - 2 minutos)                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  PASO 5: npm start                                      │
│  (Servidor listo en http://localhost:3000)             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 PASO 1: Abrir Laragon

```
1. Abre la aplicación Laragon
   └─ Busca el icono en tu escritorio o inicio
   
2. Verifica que está todo en VERDE:
   ✅ Apache ← debe estar en "Running"
   ✅ MySQL  ← debe estar en "Running"
   
3. Si no están en verde:
   └─ Haz clic en "Start All" (botón grande)
```

**¿Está todo verde? → Continúa al PASO 2**

---

## 🗄️ PASO 2: Abrir HeiDiSQL y Conectar

```
1. Abre la aplicación HeiDiSQL

2. Haz clic en "NEW" (botón azul)

3. Rellena el formulario:
   ┌───────────────────────────────────────┐
   │ Library: MariaDB or MySQL (TCP/IP)    │
   │ Hostname: 127.0.0.1 (o localhost)     │
   │ User: root                             │
   │ Password: (DÉJALA VACÍA)               │
   │ Port: 3306                             │
   │ Name: Tienda Camisas Local            │
   └───────────────────────────────────────┘

4. Haz clic en "Open" (verde)
```

**¿Ves las bases de datos? → Continúa al PASO 3**

---

## 📊 PASO 3: Importar la Base de Datos

```
1. En HeiDiSQL, menú superior: Archivo → Abrir script SQL...

2. Selecciona este archivo:
   crear_base_datos.sql

3. Se mostrará el contenido en la pantalla

4. Presiona Ctrl+E (o botón Execute, triángulo verde)

5. ¡LISTO! Verás 3 tablas creadas:
   ├─ productos (con 6 camisas)
   ├─ contactos (vacía)
   └─ usuarios (vacía)
```

**¿Ves las 3 tablas? → Continúa al PASO 4**

---

## 💻 PASO 4: Instalar Dependencias

```bash
# Abre PowerShell o CMD en la carpeta del proyecto

# Navega a la carpeta:
cd Desktop\proyecto-full-stack

# Verifica que ves estos archivos:
# - server.js
# - package.json
# - database.js
# etc...

# Ejecuta:
npm install

# ESPERA hasta que termine (2-5 minutos)
```

**¿Terminó sin errores rojos? → Continúa al PASO 5**

---

## 🚀 PASO 5: Ejecutar el Servidor

```bash
# En el mismo terminal (PowerShell/CMD), escribe:
npm start

# Deberías ver esto:
# ✅ Conectado a MySQL exitosamente
# Servidor escuchando en puerto http://localhost:3000
```

**AHORA, abre tu navegador:**

```
http://localhost:3000
```

---

## ✨ ¡VE LA TIENDA EN ACCIÓN!

Deberías ver:
- 🎨 Una página bonita
- 👕 Los 6 productos de camisas
- 📝 Formularios para contactar y registrarse

**Prueba a:**
1. ✅ Navegar por los productos
2. ✅ Enviar un mensaje en "Contacto"
3. ✅ Crear una cuenta en "Registrarse"
4. ✅ Ver los datos en HeiDiSQL

---

## 📚 ¿Necesitas Más Detalles?

- **Guía Paso a Paso Completa:** [GUIA_PASO_A_PASO.md](GUIA_PASO_A_PASO.md)
- **Detalles Técnicos:** [SETUP_MYSQL_PHPMYADMIN.md](SETUP_MYSQL_PHPMYADMIN.md)
- **Info General:** [README.md](README.md)

---

## 🛑 Para Detener la Tienda

En el terminal donde ejecutaste `npm start`:
```
Presiona Ctrl + C
```

---

## 🔄 Para Volver a Iniciar

```bash
# Terminal en la carpeta del proyecto
npm start
```

**¡Listo!** 🎉
