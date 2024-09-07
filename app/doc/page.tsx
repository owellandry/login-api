// doc/page.tsx

import React from "react";

const Documentation = () => {
  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Documentación de la API</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Endpoint: /api/request-code</h2>
        <p><strong>Metodo:</strong> POST</p>
        <p><strong>Descripción:</strong> Envía un código de verificación al correo proporcionado.</p>
        <p><strong>Request Body:</strong></p>
        <pre>
          <code>
            {`{
  "email": "example@example.com"
}`}
          </code>
        </pre>
        <p><strong>Response:</strong></p>
        <pre>
          <code>
            {`{
  "message": "Código enviado correctamente"
}`}
          </code>
        </pre>
        <p><strong>Errores:</strong></p>
        <pre>
          <code>
            {`{
  "error": "El correo es requerido"
}`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Endpoint: /api/verify-code</h2>
        <p><strong>Metodo:</strong> POST</p>
        <p><strong>Descripción:</strong> Verifica el código enviado al correo.</p>
        <p><strong>Request Body:</strong></p>
        <pre>
          <code>
            {`{
  "email": "example@example.com",
  "code": "123456"
}`}
          </code>
        </pre>
        <p><strong>Response:</strong></p>
        <pre>
          <code>
            {`{
  "message": "Código verificado con éxito."
}`}
          </code>
        </pre>
        <p><strong>Errores:</strong></p>
        <pre>
          <code>
            {`{
  "error": "Código inválido o expirado."
}`}
          </code>
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Endpoint: /api/request-user</h2>
        <p><strong>Metodo:</strong> POST</p>
        <p><strong>Descripción:</strong> Registra un nuevo usuario si el correo no está registrado.</p>
        <p><strong>Request Body:</strong></p>
        <pre>
          <code>
            {`{
  "id": "uuid",
  "email": "example@example.com",
  "username": "exampleuser",
  "name": "John",
  "lastname": "Doe"
}`}
          </code>
        </pre>
        <p><strong>Response:</strong></p>
        <pre>
          <code>
            {`{
  "message": "Usuario creado con éxito."
}`}
          </code>
        </pre>
        <p><strong>Errores:</strong></p>
        <pre>
          <code>
            {`{
  "error": "El correo ya existe."
}`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default Documentation;
