const mysql = require('mysql2/promise');

// ============================================
// VARIABLE GLOBAL PARA EL POOL
// ============================================

let pool;

// ============================================
// CREAR BASE DE DATOS E INICIALIZAR
// ============================================

async function setupDatabase() {
  try {
    // Conexión inicial sin especificar base de datos
    const initialPool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await initialPool.getConnection();
    
    // Crear base de datos si no existe
    await conn.query('CREATE DATABASE IF NOT EXISTS tienda_camisas');
    console.log('✅ Base de datos verificada/creada');
    
    conn.release();
    await initialPool.end();
    
    // Crear el pool final con la base de datos especificada
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_camisas',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true
    });

    // Verificar conexión
    const testConn = await pool.getConnection();
    console.log('✅ Conectado a MySQL exitosamente');
    testConn.release();
    
    // Inicializar tablas
    await initializeDatabase();
    
  } catch (err) {
    console.error('❌ Error al configurar base de datos:', err.message);
    console.error('Asegúrate de que:');
    console.error('1. XAMPP está corriendo (Apache y MySQL activos)');
    console.error('2. MySQL está disponible en localhost');
    process.exit(1);
  }
}

// Esperar a que setupDatabase se complete antes de exportar
let setupPromise = setupDatabase();

async function initializeDatabase() {
  const conn = await pool.getConnection();
  
  try {
    // Crear tabla de productos
    await conn.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla productos lista');

    // Crear tabla de contactos
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contactos (
        id VARCHAR(36) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        mensaje TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla contactos lista');

    // Crear tabla de usuarios (registro/login)
    await conn.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Tabla usuarios lista');

    // Insertar productos por defecto si no existen
    await insertDefaultProducts(conn);

  } catch (err) {
    console.error('Error al inicializar base de datos:', err.message);
  } finally {
    conn.release();
  }
}

// ============================================
// INSERTAR PRODUCTOS POR DEFECTO
// ============================================

async function insertDefaultProducts(conn) {
  try {
    const [rows] = await conn.query('SELECT COUNT(*) as count FROM productos');
    
    if (rows[0].count === 0) {
      const defaultProducts = [
        ['1', 'Camisa Azul Clásica', 'Camisa de algodón 100% con diseño clásico y elegante', 45.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQq_ffeGTD2qwpR2fSM_ie4BumTO7EFp_YYg&s', 50, 'clásica', 'Popular'],
        ['2', 'Camisa Blanca Premium', 'Diseño minimalista con tela de alta calidad', 52.99, 'https://via.placeholder.com/250x300?text=Camisa+Blanca', 30, 'premium', 'Nuevo'],
        ['3', 'Camisa Negra Moderna', 'Estilo contemporáneo perfecto para cualquier ocasión', 39.99, 'https://via.placeholder.com/250x300?text=Camisa+Negra', 40, 'moderna', '-20%'],
        ['4', 'Camisa Roja Vibrante', 'Color intenso que refleja tu personalidad única', 48.99, 'https://via.placeholder.com/250x300?text=Camisa+Roja', 25, 'vibrante', null],
        ['5', 'Camisa Estampada', 'Diseño único con estampados artísticos modernos', 55.99, 'https://via.placeholder.com/250x300?text=Camisa+Estampada', 20, 'estampada', null],
        ['6', 'Camisa de Lino Casual', 'Perfecta para días cálidos, fresca y cómoda', 51.99, 'https://via.placeholder.com/250x300?text=Camisa+Lino', 35, 'casual', null]
      ];

      for (const product of defaultProducts) {
        await conn.query(
          'INSERT INTO productos (id, nombre, descripcion, precio, imagen, cantidad, categoria, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          product
        );
      }
      console.log('✅ Productos por defecto insertados');
    }
  } catch (err) {
    console.error('Error al insertar productos:', err.message);
  }
}

// ============================================
// EXPORTAR POOL
// ============================================

// Exportar un objeto que tiene acceso al pool después de inicialización
module.exports = {
  getConnection: async () => {
    await setupPromise;
    return pool.getConnection();
  },
  query: async (sql, values) => {
    await setupPromise;
    return pool.query(sql, values);
  },
  end: async () => {
    await setupPromise;
    return pool.end();
  }
};
