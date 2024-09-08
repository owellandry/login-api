import React from 'react';
import { Button } from "@nextui-org/react";

interface VerifyCodeProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, endpoint: string) => void;
  loading: boolean;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ handleSubmit, loading }) => (
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
        <label className="block mb-4">
          <span className="text-teal-400">Email:</span>
          <input type="email" name="email" className="mt-1 block w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" required />
        </label>
        <label className="block mb-4">
          <span className="text-teal-400">Código:</span>
          <input type="text" name="code" className="mt-1 block w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" required />
        </label>
        <Button type="submit" color="primary" isLoading={loading} disabled={loading}>
          Enviar
        </Button>
      </form>
    </div>
  </section>
);

export default VerifyCode;
