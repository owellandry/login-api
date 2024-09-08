"use client";

import React, { useState } from "react";
import { PiCodeSimpleFill } from "react-icons/pi";
import { ImLab } from "react-icons/im";
import Requestcode from "./layouts/request-code";
import RequestUser from "./layouts/request-user";
import VerifyCode from "./layouts/verify-code";
import Resultados from "./layouts/resultados";

const Documentation = () => {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent, endpoint: string) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <header className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-teal-400 text-4xl md:text-5xl">
            <PiCodeSimpleFill />
          </span>
          <span className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
            API DOCS
          </span>
        </div>
        <button className="flex items-center bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none">
          <ImLab className="text-xl mr-2" />
          PROBAR API
        </button>
      </header>

      <h1 className="text-4xl font-extrabold text-white mb-4">Bienvenido a la API</h1>
      <h5 className="text-xl mb-8 text-gray-400">
        Explore nuestra poderosa API para integrar nuestros servicios en tu aplicación.
      </h5>

      <Requestcode handleSubmit={handleSubmit} loading={loading} />
      <VerifyCode handleSubmit={handleSubmit} loading={loading} />
      <RequestUser handleSubmit={handleSubmit} loading={loading} />

      <Resultados response={response} error={error} />
    </div>
  );
};

export default Documentation;
