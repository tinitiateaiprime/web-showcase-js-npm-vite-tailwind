import { FaJs, FaNpm } from 'react-icons/fa';
import { SiVite, SiTailwindcss } from 'react-icons/si';

const Heading = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-xl">
      <h1 className="text-center text-2xl font-bold text-white mb-4 drop-shadow-lg">
        Tinitiate Project
      </h1>
      <div className="flex justify-center items-center space-x-3 text-white text-sm">
        <div className="flex items-center space-x-1 bg-blue-600 px-3 py-1.5 rounded shadow">
          <FaJs className="text-yellow-300" />
          <span>JS</span>
        </div>
        <div className="flex items-center space-x-1 bg-green-600 px-3 py-1.5 rounded shadow">
          <FaNpm className="text-red-500" />
          <span>NPM</span>
        </div>
        <div className="flex items-center space-x-1 bg-pink-600 px-3 py-1.5 rounded shadow">
          <SiVite className="text-yellow-300" />
          <span>Vite</span>
        </div>
        <div className="flex items-center space-x-1 bg-cyan-600 px-3 py-1.5 rounded shadow">
          <SiTailwindcss className="text-white" />
          <span>Tailwind</span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
