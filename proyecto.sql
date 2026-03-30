-- ============================================
-- CREAR BASE DE DATOS TIENDA DE CAMISAS
-- ============================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tienda_camisas;
USE tienda_camisas;

-- ============================================
-- TABLA DE PRODUCTOS
-- ============================================

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

-- ============================================
-- TABLA DE CONTACTOS
-- ============================================

CREATE TABLE IF NOT EXISTS contactos (
  id VARCHAR(36) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensaje TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA DE USUARIOS
-- ============================================

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

-- ============================================
-- INSERTAR PRODUCTOS POR DEFECTO
-- ============================================

INSERT INTO productos (id, nombre, descripcion, precio, imagen, cantidad, categoria, badge) VALUES
('1', 'Camisa Azul Clásica', 'Camisa de algodón 100% con diseño clásico y elegante', 45.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQq_ffeGTD2qwpR2fSM_ie4BumTO7EFp_YYg&s', 50, 'clásica', 'Popular'),
('2', 'Camisa Blanca Premium', 'Diseño minimalista con tela de alta calidad', 52.99, 'https://via.placeholder.com/250x300?text=Camisa+Blanca', 30, 'premium', 'Nuevo'),
('3', 'Camisa Negra Moderna', 'Estilo contemporáneo perfecto para cualquier ocasión', 39.99, 'https://via.placeholder.com/250x300?text=Camisa+Negra', 40, 'moderna', '-20%'),
('4', 'Camisa Roja Vibrante', 'Color intenso que refleja tu personalidad única', 48.99, 'https://via.placeholder.com/250x300?text=Camisa+Roja', 25, 'vibrante', NULL),
('5', 'Camisa Estampada', 'Diseño único con estampados artísticos modernos', 55.99, 'https://via.placeholder.com/250x300?text=Camisa+Estampada', 20, 'estampada', NULL),
('6', 'Camisa de Lino Casual', 'Perfecta para días cálidos, fresca y cómoda', 51.99, 'https://via.placeholder.com/250x300?text=Camisa+Lino', 35, 'casual', NULL);

-- ============================================
-- CONFIRMAR CREACIÓN
-- ============================================

SELECT 'Base de datos creada exitosamente' AS resultado;
SHOW TABLES;
SELECT COUNT(*) as total_productos FROM productos;
