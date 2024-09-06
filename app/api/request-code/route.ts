import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: "El correo es requerido" }, { status: 400 });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
        subject: 'CODIGO DE VERIFICACÍON',
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
        await transporter.sendMail(mailOptions);
        console.log(`Código ${verificationCode} enviado al correo ${email}`);

        globalThis.codes = globalThis.codes || {};
        globalThis.codes[email] = { code: verificationCode, expires: Date.now() + 5 * 60 * 1000 };

        return NextResponse.json({ message: "Código enviado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return NextResponse.json({ error: "Error al enviar el código al correo" }, { status: 500 });
    }
}
