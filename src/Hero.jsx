import React from "react";

export default function Hero() {
  return (
    <section
      className="relative py-20"
      style={{
        backgroundImage: `url('/src/assets/background.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center relative z-10 text-white">
        {/* Left Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Grow Your Vocabulary, Evolve Your Pokémon!
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Learn new words and watch your Pokémon grow and evolve. The more you learn, the stronger your Pokémon become!
          </p>
          <a href="#dashboard">
            <button className="bg-yellow-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-700 transition-all duration-200">
              Start Your Journey
            </button>
          </a>
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
