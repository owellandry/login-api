"use client";

import { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [, setUserExists] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendCode = async () => {
    if (loading || cooldown > 0) return; // No hacer nada si ya está cargando o en cooldown

    setLoading(true);
    try {
      const response = await fetch("/api/request-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep(2);
        setError(null);
        setCooldown(15); // Configurar cooldown de 15 segundos
      } else {
        const { error: responseError } = await response.json();
        setError(responseError || "Error al enviar el código");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });
  
      if (response.ok) {
        const { userExists, username } = await response.json();
        setUserExists(userExists);
        setUsername(username || "");
        setError(null);
  
        if (userExists) {
          alert(`¡Bienvenido de nuevo, ${username}!`);
          setStep(1); // Reiniciamos el proceso si el usuario ya existe
          setEmail("");
          setCode("");
        } else {
          setStep(3); // Pasar a la etapa de solicitar los datos si no existe
        }
      } else {
        const { error: responseError } = await response.json();
        setError(responseError || "Código incorrecto");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
  };  

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/request-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(), // Generamos un uuid para el nuevo usuario
          email,
          username,
          name,
          lastname,
        }),
      });

      if (response.ok) {
        alert("Usuario creado con éxito.");
        setStep(1);
        setEmail("");
        setCode("");
        setUsername("");
        setName("");
        setLastname("");
        setError(null);
      } else {
        const { error: responseError } = await response.json();
        setError(responseError || "Error al crear el usuario");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
  };

  // Manejo de la cuenta regresiva del cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Limpiar el temporizador cuando se desmonta el componente
  }, [cooldown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white">
      <div
        className={`relative w-full max-w-md space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out ${
          step === 1 ? "scale-95 hover:scale-100" : "scale-100"
        }`}
      >
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold">Inicia sesión</h1>
            <div className="relative flex items-center">
              <input
                type="email"
                className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-blue-500 transition-transform duration-300 transform peer"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute -top-3 left-4 text-gray-400 bg-gray-800 px-1"
              >
                Correo electrónico
              </label>
              <button
                onClick={handleSendCode}
                disabled={!isEmailValid(email) || loading || cooldown > 0}
                className={`absolute right-2 p-2 rounded-full transition-colors duration-300 ${
                  !isEmailValid(email) || loading || cooldown > 0
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-500 hover:text-blue-600"
                }`}
              >
                <MdSend size={24} />
              </button>
              {cooldown > 0 && (
                <p className="absolute right-16 text-gray-400">{cooldown}s</p>
              )}
            </div>
            {error && <p className="text-red-400">{error}</p>}
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold">Ingresa el código</h1>
            <p className="text-gray-400">Hemos enviado un código a: {email}</p>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-green-500 transition-transform duration-300 transform peer"
                placeholder=" "
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                id="code"
              />
              <label
                htmlFor="code"
                className="absolute -top-3 left-3 text-gray-400 bg-gray-800 px-1"
              >
                Código de verificación
              </label>
            </div>
            <button
              className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={handleVerifyCode}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold">Completa tu registro</h1>

            {/* Nombre de usuario */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-green-500 transition-transform duration-300 transform peer"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                id="username"
              />
              <label
                htmlFor="username"
                className="absolute -top-3 left-3 text-gray-400 bg-gray-800 px-1"
              >
                Nombre de usuario
              </label>
            </div>

            {/* Nombre */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-green-500 transition-transform duration-300 transform peer"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                id="name"
              />
              <label
                htmlFor="name"
                className="absolute -top-3 left-3 text-gray-400 bg-gray-800 px-1"
              >
                Nombre
              </label>
            </div>

            {/* Apellido */}
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:border-green-500 transition-transform duration-300 transform peer"
                placeholder=" "
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                id="lastname"
              />
              <label
                htmlFor="lastname"
                className="absolute -top-3 left-3 text-gray-400 bg-gray-800 px-1"
              >
                Apellido
              </label>
            </div>

            <button
              className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
