DROP DATABASE IF EXISTS ICBF;
CREATE DATABASE ICBF;

USE ICBF;

CREATE TABLE padre (
	cedula VARCHAR(20) NOT NULL,
	primerNombre VARCHAR(20) NOT NULL,
	segundoNombre VARCHAR(20),
	apellido VARCHAR(20) NOT NULL,
	genero INTEGER NOT NULL,
    direccion VARCHAR(30),
    ciudad VARCHAR(20),
	fechaNacimiento DATE NOT NULL,
	edad INTEGER AS (YEAR(CURRENT_DATE) - YEAR(fechaNacimiento)),
	PRIMARY KEY(cedula));
	
CREATE TABLE hijo (
	tarjetaIdentidad VARCHAR(20) NOT NULL,
	primerNombre VARCHAR(20) NOT NULL,
	segundoNombre VARCHAR(20),
	genero INTEGER NOT NULL,
	fechaNacimiento DATE NOT NULL,
	edad INTEGER AS (YEAR(CURRENT_DATE) - YEAR(fechaNacimiento)),
	hijode VARCHAR(20),
	PRIMARY KEY(tarjetaIdentidad),
	FOREIGN KEY (hijode) REFERENCES padre(cedula) ON DELETE SET NULL);