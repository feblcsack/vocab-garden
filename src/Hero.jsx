import React from "react";

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center">
        {/* Left Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            Grow Your Vocabulary, Evolve Your Pokémon!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Learn new words and watch your Pokémon grow and evolve. The more you learn, the stronger your Pokémon become!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
            Start Your Journey
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/src/assets/poke.png"
            alt="Pokémon growing with vocabulary"
            className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
