import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import Image from 'next/image';
import about1 from "../../../../public/about1.jpg";
import about2 from "../../../../public/about2.jpg";


const AboutUs = () => {
  return (
    <MainLayout>
      
      <div className="min-h-screen">

        <div className="text-center py-12">
          <h1 className="text-blue-900 font-bold underline decoration-blue-400 underline-offset-8 text-5xl font-serif">About Us</h1>
          <p className="text-black text-xl mt-4">Get to know the heart of Vinrich Resort</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-semibold text-blue-800">Our Story</h2>
            <p className="text-black leading-relaxed text-2xl">
              Vinrich Resort was founded to offer a slice of paradise to every guest. With stunning ocean views, lush gardens, and top-class service, we transform ordinary holidays into unforgettable memories. Our story is built around authentic hospitality and a deep respect for nature.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={about1}
              alt="about1"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
        </div>

       
        <div className="bg-blue-300 p-10 my-10 rounded-3xl mx-8 shadow-lg">
          <h2 className="text-5xl font-bold text-center text-blue-900 mb-6">Our Vision</h2>
          <p className="text-center text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            To become the premier destination where guests experience ultimate luxury and the beauty of Sri Lanka’s vibrant coast, while preserving our natural surroundings.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <Image
              src={about2}
              alt="about2"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-5xl font-semibold text-blue-800">Our Mission</h2>
            <p className="text-black leading-relaxed text-2xl">
              We aim to deliver personalized, world-class hospitality to all guests while integrating eco-friendly practices and celebrating the rich Sri Lankan heritage. Every stay should be a journey of relaxation, adventure, and luxury.
            </p>
          </div>
        </div>

        
        <section className="bg-green-300 py-12 px-6">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-blue-900">Guest Reviews</h2>
            <p className="text-gray-700 mt-2 text-2xl">What our guests say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-700 leading-relaxed text-center text-2xl">
                "Vinrich Resort exceeded all our expectations! Beautiful scenery, impeccable service, and memories we’ll cherish forever."
              </p>
              <h4 className="text-blue-800 font-semibold mt-4 text-center">- John & Mary</h4>
            </div>

           
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-700 leading-relaxed text-center text-2xl">
                "The food, the rooms, the views,everything was just perfect! Can't wait to visit again."
              </p>
              <h4 className="text-blue-800 font-semibold mt-4 text-center">- Emily R.</h4>
            </div>

            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-700 leading-relaxed text-center text-2xl">
                "Absolutely loved the atmosphere and the friendly staff. Vinrich Resort feels like a home away from home."
              </p>
              <h4 className="text-blue-800 font-semibold mt-4 text-center">- Liam K.</h4>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default AboutUs;

