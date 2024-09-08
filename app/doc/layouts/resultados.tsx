import React from 'react';

interface ResultadosProps {
  response: string | null;
  error: string | null;
}

const Resultados: React.FC<ResultadosProps> = ({ response, error }) => (
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
);

export default Resultados;
