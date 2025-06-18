import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import Image from 'next/image';
import homePage2 from "../../../../public/homePage2.jpeg";
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

<div className="bg-green-200 min-h-screen">
    
      <div className="p-6 text-center text-5xl font-serif text-blue-600">
        Welcome to <span className="text-blue-950">Vinrich Resort</span>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
        <section className="text-center md:text-left space-y-6">
          <h1 className="bg-blue-300 p-4 text-4xl font-semibold text-blue-900 rounded-xl shadow-md">
            Where You Meet the Sea
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            Embellished with the charms of immaculate beaches, lush coconut groves, and stunning oceanic vistas from all its abodes, Vinrich Resort is a premier amongst Boossa hotels! The property features a wide array of exclusive accommodation options, bars, restaurants, boutiques, and entertainment hubs, making it an idyllic destination to experience pure tropical bliss.
          </p>  
        </section>

        <div className="flex justify-center">
          <Image
            src={homePage2}
            alt="Home Page"
            width={600}
            height={600}
            className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      
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

export default Home;