{/*import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import Image from 'next/image';
import hotel1 from "../../../../public/hotel1.jpeg";
import hotel2 from "../../../../public/hotel2.jpeg";
import hotel3 from "../../../../public/hotel3.jpeg";
import hall1 from "../../../../public/hall1.jpeg";
import hall2 from "../../../../public/hall2.jpeg";
import hall3 from "../../../../public/hall3.jpeg";
import pool1 from "../../../../public/pool1.jpeg";
import pool2 from "../../../../public/pool2.jpeg";
import pool3 from "../../../../public/pool3.jpeg";
import room1 from "../../../../public/room1.jpeg";
import room2 from "../../../../public/room2.jpeg";
import room3 from "../../../../public/room4.jpeg";
import room4 from "../../../../public/room4.jpeg";
import food1 from "../../../../public/food1.jpeg";
import food2 from "../../../../public/food2.jpeg";
import food3 from "../../../../public/food3.jpeg";


const Home = () => {
  return (
    <MainLayout>

      <div className="min-h-screen">
    
      <div className="p-6 text-center font-bold text-5xl font-serif text-blue-600">
        Welcome to <span className="text-blue-950">Vinrich Resort</span>
      </div>

    
      
      <div className="w-[1000px] h-[380px] mx-auto">
          <video
            src='/vhome.mp4'
            autoPlay
            loop
            playsInline
            muted
            className='w-full h-full object-cover rounded-xl shadow-lg border-4 border-blue-400'
          />
        </div>
        <br></br>
        <section className="text-center md:text space-y-6">
          <h1 className="bg-blue-300 inline-block px-8 py-4 text-4xl font-semibold text-blue-900 rounded-full shadow-md">
            Where You Meet the Sea
          </h1>
          <p className="text-3xl text-black leading-relaxed">
            Embellished with the charms of immaculate beaches, lush coconut groves, and stunning oceanic vistas from all its abodes, Vinrich Resort is a premier amongst Boossa hotels! The property features a wide array of exclusive accommodation options, bars, restaurants, boutiques, and entertainment hubs, making it an idyllic destination to experience pure tropical bliss.
          </p>  
        </section>

      <section className="text-center py-10">
        <h1 className="bg-blue-300 inline-block px-8 py-4 text-4xl font-bold text-blue-900 rounded-full shadow-md">
          GALLERY
        </h1>
      </section>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {[hotel1, hotel2, hotel3, hall1, hall2, hall3, pool1, pool2, pool3, room1, room2, room3, room4, food1, food2, food3].map((img, index) => (
      <div 
      key={index} 
      className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-full h-72 relative"
      >
      <Image
        src={img}
        alt={`gallery-image-${index}`}
        fill
        className="object-cover rounded-2xl hover:scale-105 transition duration-500"
      />
    </div>
  ))}
</div>
</div>
    </MainLayout>
  );
};

export default Home;*/}

import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import Image from 'next/image';
import hotel1 from "../../../../public/hotel1.jpeg";
import hotel2 from "../../../../public/hotel2.jpeg";
import hotel3 from "../../../../public/hotel3.jpeg";
import hall1 from "../../../../public/hall1.jpeg";
import hall2 from "../../../../public/hall2.jpeg";
import hall3 from "../../../../public/hall3.jpeg";
import pool1 from "../../../../public/pool1.jpeg";
import pool2 from "../../../../public/pool2.jpeg";
import pool3 from "../../../../public/pool3.jpeg";
import room1 from "../../../../public/room1.jpeg";
import room2 from "../../../../public/room2.jpeg";
import room3 from "../../../../public/room4.jpeg";
import room4 from "../../../../public/room4.jpeg";
import food1 from "../../../../public/food1.jpeg";
import food2 from "../../../../public/food2.jpeg";
import food3 from "../../../../public/food3.jpeg";

const Home = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src='/vhome.mp4'
              autoPlay
              loop
              playsInline
              muted
              className='w-full h-full object-cover'
            />
            <div className="absolute inset-0  bg-opacity-30"></div>
          </div>
          
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Welcome to <span className="text-blue-600">Vinrich Resort</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 animate-fade-in-up delay-100">
              Where luxury meets the serenity of the sea
            </p>
            
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 relative inline-block">
              <span className="relative z-10 px-4">Where You Meet the Sea</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-300 opacity-30 z-0"></span>
            </h2>
            <p className="text-lg md:text-xl text-black leading-relaxed max-w-4xl mx-auto">
              Embellished with the charms of immaculate beaches, lush coconut groves, and stunning oceanic vistas from all its abodes, Vinrich Resort is a premier amongst Boossa hotels! The property features a wide array of exclusive accommodation options, bars, restaurants, boutiques, and entertainment hubs, making it an idyllic destination to experience pure tropical bliss.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {icon: '🏖️', title: 'Beachfront', desc: 'Direct access to pristine sandy beaches'},
              {icon: '🍹', title: 'Luxury Dining', desc: 'World-class restaurants and bars'},
              {icon: '🏊', title: 'Infinity Pool', desc: 'Stunning ocean-view swimming pools'}
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-500 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h3>
                <p className="text-black">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Our <span className="text-blue-500">Gallery</span>
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                Discover the beauty of Vinrich Resort through our photo collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[hotel1, hotel2, hotel3, hall1, hall2, hall3, pool1, pool2, pool3, room1, room2, room3, room4, food1, food2, food3].map((img, index) => (
                <div 
                  key={index} 
                  className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-500 h-64 relative"
                >
                  <Image
                    src={img}
                    alt={`gallery-image-${index}`}
                    fill
                    className="object-cover rounded-xl group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition duration-500"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;



