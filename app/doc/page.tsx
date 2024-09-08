// doc/page.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const Documentation = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent, endpoint: string) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setResponse(JSON.stringify(result, null, 2));
        setError("");
      } else {
        setResponse("");
        setError(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      setResponse("");
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={(e) => handleSubmit(e, '/api/request-code')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-300">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <Button className="p-" type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
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
          <form onSubmit={(e) => handleSubmit(e, '/api/verify-code')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-300">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-300">Código:</span>
              <input type="text" name="code" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
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
          <form onSubmit={(e) => handleSubmit(e, '/api/request-user')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-300">ID:</span>
              <input type="text" name="id" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-300">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-300">Username:</span>
              <input type="text" name="username" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-300">Name:</span>
              <input type="text" name="name" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-300">Lastname:</span>
              <input type="text" name="lastname" className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md" required />
            </label>
            <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">Resultados</h2>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-300">Respuesta:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-green-400">
            {response}
          </pre>
          <p><strong className="text-teal-300">Error:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-red-400">
            {error}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
