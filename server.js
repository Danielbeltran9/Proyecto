const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const pool = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ============================================
// RUTAS DE PRODUCTOS
// ============================================

// GET - Obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM productos ORDER BY createdAt DESC');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM productos WHERE id = ?', [id]);
    conn.release();
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear nuevo producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, cantidad, categoria, badge } = req.body;

    // Validar datos
    if (!nombre || !precio) {
      res.status(400).json({ error: 'Nombre y precio son requeridos' });
      return;
    }

    const id = uuidv4();
    const conn = await pool.getConnection();
    
    await conn.query(
      'INSERT INTO productos (id, nombre, descripcion, precio, imagen, cantidad, categoria, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, nombre, descripcion, precio, imagen, cantidad || 0, categoria, badge]
    );
    
    conn.release();
    
    res.status(201).json({
      id,
      nombre,
      descripcion,
      precio,
      imagen,
      cantidad,
      categoria,
      badge
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen, cantidad, categoria, badge } = req.body;

    if (!nombre || !precio) {
      res.status(400).json({ error: 'Nombre y precio son requeridos' });
      return;
    }

    const conn = await pool.getConnection();
    const [result] = await conn.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, cantidad = ?, categoria = ?, badge = ? WHERE id = ?',
      [nombre, descripcion, precio, imagen, cantidad, categoria, badge, id]
    );
    
    conn.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json({ message: 'Producto actualizado', id, nombre, precio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();
    
    const [result] = await conn.query('DELETE FROM productos WHERE id = ?', [id]);
    conn.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json({ message: 'Producto eliminado', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE CONTACTO
// ============================================

// POST - Guardar mensaje de contacto
app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validar datos
    if (!nombre || !email || !mensaje) {
      res.status(400).json({ error: 'Todos los campos son requeridos' });
      return;
    }

    const id = uuidv4();
    const conn = await pool.getConnection();
    
    await conn.query(
      'INSERT INTO contactos (id, nombre, email, mensaje) VALUES (?, ?, ?, ?)',
      [id, nombre, email, mensaje]
    );
    
    conn.release();

    res.status(201).json({
      message: '¡Mensaje enviado exitosamente!',
      id,
      nombre,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener todos los mensajes de contacto
app.get('/api/contactos', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM contactos ORDER BY createdAt DESC');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE USUARIOS (REGISTRO/LOGIN)
// ============================================

// POST - Registrar nuevo usuario
app.post('/api/usuarios/registro', async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion, ciudad } = req.body;

    // Validar datos
    if (!nombre || !email || !password) {
      res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
      return;
    }

    const id = uuidv4();
    const conn = await pool.getConnection();

    // Verificar si el email ya existe
    const [existing] = await conn.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      conn.release();
      res.status(400).json({ error: 'El email ya está registrado' });
      return;
    }

    // Insertar usuario
    await conn.query(
      'INSERT INTO usuarios (id, nombre, email, password, telefono, direccion, ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, nombre, email, password, telefono || null, direccion || null, ciudad || null]
    );
    
    conn.release();

    res.status(201).json({
      message: '¡Usuario registrado exitosamente!',
      id,
      nombre,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Login de usuario
app.post('/api/usuarios/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña son requeridos' });
      return;
    }

    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
    conn.release();

    if (rows.length === 0) {
      res.status(401).json({ error: 'Email o contraseña incorrectos' });
      return;
    }

    const user = rows[0];
    res.json({
      message: '¡Login exitoso!',
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
        ciudad: user.ciudad
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT id, nombre, email, telefono, ciudad, createdAt FROM usuarios ORDER BY createdAt DESC');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener un usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT id, nombre, email, telefono, direccion, ciudad, createdAt FROM usuarios WHERE id = ?', [id]);
    conn.release();
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion, ciudad } = req.body;

    const conn = await pool.getConnection();
    const [result] = await conn.query(
      'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, direccion = ?, ciudad = ? WHERE id = ?',
      [nombre, email, telefono, direccion, ciudad, id]
    );
    
    conn.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ message: 'Usuario actualizado', id, nombre, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();
    
    const [result] = await conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
    conn.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ message: 'Usuario eliminado', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// SERVIR ARCHIVOS ESTÁTICOS
// ============================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// MANEJO DE ERRORES
// ============================================

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📦 API disponible en http://localhost:${PORT}/api`);
  console.log('Presiona Ctrl+C para detener el servidor');
});
