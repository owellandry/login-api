// doc/page.tsx

import React from "react";

const Documentation = () => {
  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-teal-500 pb-2">Documentación de la API</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">1. Endpoint: /api/request-code</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-300">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-300">Descripción:</strong> Envía un código de verificación al correo proporcionado.</p>
          <p><strong className="text-teal-300">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "email": "example@example.com"
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Response:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "message": "Código enviado correctamente"
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Errores:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "error": "El correo es requerido"
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">2. Endpoint: /api/verify-code</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-300">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-300">Descripción:</strong> Verifica el código enviado al correo.</p>
          <p><strong className="text-teal-300">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "email": "example@example.com",
  "code": "123456"
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Response:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "message": "Código verificado con éxito."
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Errores:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "error": "Código inválido o expirado."
}`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">3. Endpoint: /api/request-user</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-300">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-300">Descripción:</strong> Registra un nuevo usuario si el correo no está registrado.</p>
          <p><strong className="text-teal-300">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "id": "uuid",
  "email": "example@example.com",
  "username": "exampleuser",
  "name": "John",
  "lastname": "Doe"
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Response:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "message": "Usuario creado con éxito."
}`}
            </code>
          </pre>
          <p><strong className="text-teal-300">Errores:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{`{
  "error": "El correo ya existe."
}`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
