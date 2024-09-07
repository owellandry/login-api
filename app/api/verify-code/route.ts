import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  const { email, code } = await request.json();

  if (!email || !code) {
    return NextResponse.json({ error: 'Correo y código son requeridos.' }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASS,
      database: process.env.SQL_NAME,
    });

    // Verificar si el código de verificación es válido
    const [verificationRows]: any = await connection.execute(
      'SELECT * FROM verification_codes WHERE email = ? AND code = ? AND expiration > NOW()',
      [email, code]
    );

    if (verificationRows.length > 0) {
      // Verificar si el usuario ya existe
      const [userRows]: any = await connection.execute(
        'SELECT * FROM usuarios WHERE correo = ?',
        [email]
      );

      await connection.end();
      return NextResponse.json({
        message: 'Código verificado con éxito.',
        userExists: userRows.length > 0,
        username: userRows.length > 0 ? userRows[0].nombre_usuario : null,
      });
    } else {
      await connection.end();
      return NextResponse.json({ error: 'Código inválido o expirado.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error al verificar el código:', error);
    return NextResponse.json({ error: 'Error en el servidor.' }, { status: 500 });
  }
}
