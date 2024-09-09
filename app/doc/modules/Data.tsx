// ./modules/Data.tsx
import React from 'react';
import { Link } from '@nextui-org/react';

const DataText: React.FC = () => {
  return (
    <>
      <section id="introduction" className=" py-16 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-100">Bienvenido a la API</h1>
          <p className="text-gray-100 text-lg mb-12 text-center">
            Explora nuestra poderosa API para integrar nuestros servicios en tu aplicación de manera sencilla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Introducción</h2>
              <p className="text-gray-600 mb-4">
                Aprende sobre los conceptos básicos de nuestra API, cómo autenticarte y empezar a usarla.
              </p>
              <Link href="#" className="text-blue-500 hover:underline text-lg font-medium">
                Leer más
              </Link>
            </div>
            <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Guía de inicio rápido</h2>
              <p className="text-gray-600 mb-4">
                Sigue estos pasos sencillos para comenzar a integrar nuestra API en tu aplicación.
              </p>
              <Link href="#" className="text-blue-500 hover:underline text-lg font-medium">
                Empezar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataText;
