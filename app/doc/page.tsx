"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { PiCodeSimpleFill } from "react-icons/pi";
import { ImLab } from "react-icons/im";

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
    <div className="p-8 bg-gray-900 text-gray-300 min-h-screen">

      <div className="flex items-center justify-between bg-gray-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          <span className="text-teal-400 text-5xl">
            <PiCodeSimpleFill />
          </span>
          <span className="text-white text-3xl font-semibold tracking-wide">API DOCS</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center bg-teal-500 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400">
            <span className="text-white text-2xl mr-2">
              <ImLab />
            </span>
            PROBAR API
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold mb-8 text-white pb-2">Bienvenido a la API</h1>
      <h5 className="text-xl mb-8 text-gray-400 pb-2">Explore nuestra poderosa API para integrar nuestros servicios en tu aplicación.</h5>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">1. Endpoint: /api/request-code</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-400">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-400">Descripción:</strong> Envía un código de verificación al correo proporcionado.</p>
          <p><strong className="text-teal-400">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-gray-300">
            <code>{`{
  "email": "example@example.com"
}`}</code>
          </pre>
          <form onSubmit={(e) => handleSubmit(e, '/api/request-code')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-400">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">2. Endpoint: /api/verify-code</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-400">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-400">Descripción:</strong> Verifica el código enviado al correo.</p>
          <p><strong className="text-teal-400">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-gray-300">
            <code>{`{
  "email": "example@example.com",
  "code": "123456"
}`}</code>
          </pre>
          <form onSubmit={(e) => handleSubmit(e, '/api/verify-code')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-400">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-400">Código:</span>
              <input type="text" name="code" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">3. Endpoint: /api/request-user</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-400">Método:</strong> <span className="text-gray-400">POST</span></p>
          <p><strong className="text-teal-400">Descripción:</strong> Registra un nuevo usuario si el correo no está registrado.</p>
          <p><strong className="text-teal-400">Request Body:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-gray-300">
            <code>{`{
  "id": "uuid",
  "email": "example@example.com",
  "username": "exampleuser",
  "name": "John",
  "lastname": "Doe"
}`}</code>
          </pre>
          <form onSubmit={(e) => handleSubmit(e, '/api/request-user')} className="mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
            <label className="block mb-2">
              <span className="text-teal-400">ID:</span>
              <input type="text" name="id" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-400">Email:</span>
              <input type="email" name="email" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-400">Username:</span>
              <input type="text" name="username" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-400">Name:</span>
              <input type="text" name="name" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <label className="block mb-2">
              <span className="text-teal-400">Lastname:</span>
              <input type="text" name="lastname" className="mt-1 block w-full p-2 bg-gray-800 text-white rounded-md" required />
            </label>
            <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
              Enviar
            </Button>
          </form>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">Resultados</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p><strong className="text-teal-400">Respuesta:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-green-400">
            {response}
          </pre>
          <p><strong className="text-teal-400">Error:</strong></p>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto text-red-400">
            {error}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
