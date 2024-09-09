// ./app/layouts/examples-code.tsx
import React from 'react';
import { FaPython, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiTypescript, SiGnubash, SiCsharp } from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';

const languages = [
  { name: 'Python', icon: <FaPython size={40} color="#306998" /> }, // Python
  { name: 'Node.js', icon: <FaNodeJs size={40} color="#68A063" /> }, // Node.js
  { name: 'TypeScript', icon: <SiTypescript size={40} color="#007ACC" /> }, // TypeScript
  { name: 'Bash', icon: <SiGnubash size={40} color="#000000" /> }, // Bash
  { name: 'NextJS', icon: <RiNextjsLine size={40} color="#000000" /> }, // NextJS
  { name: 'ReactJS', icon: <FaReact size={40} color="#61DAFB" /> }, // ReactJS
  { name: 'C#', icon: <SiCsharp size={40} color="#9b4993" /> }, // C#
];

const ExamplesCode: React.FC = () => {
  return (
     <div>
       <div>
      Ejemplos de código

Mira algunos ejemplos de cómo integrar nuestra API en diferentes lenguajes y frameworks.
      </div>
    <div className="flex flex-wrap gap-5 p-6 justify-center ">


      {languages.map((lang) => (
        <div
          key={lang.name}
          className="flex flex-col items-center rounded-lg p-6 w-32 text-center bg-white bg-opacity-20 shadow-md cursor-pointer hover:shadow-xl hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {lang.icon}
          <p className="mt-3 text-md font-semibold text-gray-0">{lang.name}</p>
        </div>
      ))}
    </div>
     </div>
  );
};

export default ExamplesCode;
