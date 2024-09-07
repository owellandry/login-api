import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: "El correo es requerido" }, { status: 400 });
    }

    // Generar el código de verificación
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Calcular el tiempo de expiración en 5 minutos
    const expirationDate = new Date(Date.now() + 5 * 60 * 1000);
    const expirationTime = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Server time:", new Date().toISOString());
    console.log("Calculated expiration time:", expirationTime);

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Código de Verificación',
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center;">
                <h2 style="font-size: 24px; font-weight: bold; color: #333; margin-bottom: 20px;">¡Hola!</h2>
                <p style="font-size: 16px; color: #555; margin: 10px 0;">Tu código de verificación es:</p>
                <div style="font-size: 40px; color: #ffffff; background-color: #007bff; padding: 15px; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0;">${verificationCode}</div>
                <p style="font-size: 16px; color: #e74c3c; margin: 20px 0;">Este código es válido por <strong>5 minutos.</strong> <br/> Si no solicitaste este código, por favor ignora este mensaje.</p>
                <p style="font-size: 14px; color: #555; margin: 20px 0;">Si tienes problemas con el código, por favor contacta con soporte.</p>
                <p style="font-size: 12px; color: #aaa; margin-top: 20px;">&copy; ${new Date().getFullYear()} ChiguiStudio. Todos los derechos reservados.</p>
            </div>
        </body>
    `,
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log(`Código ${verificationCode} enviado al correo ${email}`);

        // Crear una nueva conexión a la base de datos
        const connection = await mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_NAME,
        });

        // Verificar si el correo ya tiene un código en la base de datos
        const [rows]: any = await connection.execute(
            'SELECT * FROM verification_codes WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            // Actualizar el código existente
            await connection.execute(
                'UPDATE verification_codes SET code = ?, expiration = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
                [verificationCode, expirationTime, email]
            );
        } else {
            // Insertar nuevo código
            await connection.execute(
                'INSERT INTO verification_codes (id, email, code, expiration) VALUES (?, ?, ?, ?)',
                [uuidv4(), email, verificationCode, expirationTime]
            );
        }

        // Cerrar la conexión
        await connection.end();

        return NextResponse.json({ message: "Código enviado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error al enviar el correo o al manejar la base de datos:", error);
        return NextResponse.json({ error: "Error al enviar el código al correo" }, { status: 500 });
    }
}
