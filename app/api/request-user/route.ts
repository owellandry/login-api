import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, FieldPacket } from 'mysql2';

interface User {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  nombre_usuario: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export async function POST(request: Request) {
  try {
    const { email, nombre, apellido, avatar, nombre_usuario } = await request.json();

    if (!email || !nombre || !apellido || !avatar || !nombre_usuario) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.SQL_HOST!,
      user: process.env.SQL_USER!,
      password: process.env.SQL_PASS!,
      database: process.env.SQL_NAME!,
    });

    // Verificar si el correo ya existe
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      'SELECT * FROM usuarios WHERE correo = ?',
      [email]
    );

    // Cast rows to User[]
    const users = rows as User[];

    if (users.length > 0) {
      await connection.end();
      return NextResponse.json({ error: 'El correo ya existe.' }, { status: 400 });
    }

    // Insertar nuevo usuario
    const id = uuidv4();
    await connection.execute(
      'INSERT INTO usuarios (id, nombre, apellido, correo, avatar, nombre_usuario, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [id, nombre, apellido, email, avatar, nombre_usuario]
    );

    await connection.end();
    return NextResponse.json({ message: 'Usuario creado con éxito.' });
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    return NextResponse.json({ error: 'Error en el servidor.' }, { status: 500 });
  }
}
