import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import Image from 'next/image';
import delux from '../../../../public/delux.jpg';
import premium from '../../../../public/premium.jpg';
import normal2 from '../../../../public/normal2.jpg';
import non from '../../../../public/non.jpg';

const Room = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">

        
        <div className="p-6 text-black text-5xl font-serif text-center">
          <h1 className="text-blue-900 font-bold underline decoration-blue-400 underline-offset-8">
            Room Types
          </h1>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-10">
          <div className="flex justify-center">
            <Image
              src={delux}
              alt="delux"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
          <section className="text-center md:text-left space-y-6">
            <h2 className="bg-blue-200 inline-block px-6 py-3 rounded-full text-4xl font-serif text-blue-950 shadow-md">
              Deluxe Room
            </h2>
            <p className="text-2xl font-serif text-black leading-relaxed">
              Experience comfort and elegance in our Deluxe Rooms. These spacious accommodations feature stylish interiors, premium bedding, a mini-fridge, complimentary Wi-Fi, Private pool and a private balcony with scenic views — perfect for guests seeking both luxury and relaxation.
            </p>
            <ul className="text-2xl list-disc list-inside text-emerald-900 space-y-2">
              <li>King-size bed</li>
              <li>Private Jacuzzi & Mini Bar</li>
              <li>Unlimited Buffet</li>
              <li>Smart TV, Wi-Fi, Butler service</li>
              <li>LKR 65,000 / night</li>
            </ul>
          </section>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-10 bg-green-200 rounded-2xl mx-6 shadow-md">
          <section className="text-center md:text-left space-y-6 order-2 md:order-1">
            <h2 className="bg-blue-200 inline-block px-6 py-3 rounded-full text-4xl font-serif text-blue-950 shadow-md">
              Premium Room
            </h2>
            <p className="text-2xl font-serif text-gray-700 leading-relaxed">
              Our Premium Rooms offer a refined stay with upgraded amenities, plush furnishings, and personalized service. Ideal for business travelers or couples, these rooms include high-speed internet, smart TV, tea/coffee makers, and a serene ambiance to unwind in style.
            </p>
            <ul className="text-2xl list-disc list-inside text-emerald-700 space-y-2">
              <li>Queen-size bed</li>
              <li>Mini-fridge & Workspace</li>
              <li>tea/coffee makers</li>
              <li>Complimentary breakfast</li>
              <li>LKR 45,000 / night</li>
            </ul>
          </section>
          <div className="flex justify-center order-1 md:order-2">
            <Image
              src={premium}
              alt="premium"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-10">
          <div className="flex justify-center">
            <Image
              src={normal2}
              alt="normal2"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
          <section className="text-center md:text-left space-y-6">
            <h2 className="bg-blue-200 inline-block px-6 py-3 rounded-full text-4xl font-serif text-blue-950 shadow-md">
              Normal Room (A/C)
            </h2>
            <p className="text-2xl font-serif text-black leading-relaxed">
              Enjoy a comfortable and budget-friendly stay in our Normal A/C Rooms. These rooms are equipped with air conditioning, cozy bedding, an en-suite bathroom, and all essential amenities to ensure a pleasant stay for solo travelers or small families.
            </p>
            <ul className="text-2xl list-disc list-inside text-emerald-900 space-y-2">
              <li>Double bed</li>
              <li>Air Conditioning</li>
              <li>TV & Wi-Fi</li>
              <li>LKR 30,000 / night</li>
            </ul>
          </section>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-10 bg-green-200 rounded-2xl mx-6 shadow-md">
          <section className="text-center md:text-left space-y-6 order-2 md:order-1">
            <h2 className="bg-blue-200 inline-block px-6 py-3 rounded-full text-4xl font-serif text-blue-950 shadow-md">
              Non A/C Room
            </h2>
            <p className="text-2xl font-serif text-gray-700 leading-relaxed">
              Simple, clean, and affordable — our Non-A/C Rooms are perfect for travelers looking for value without compromising on basic comfort. Each room comes with a ceiling fan, clean linens, and access to all standard services offered by the hotel.
            </p>
            <ul className="text-2xl list-disc list-inside text-emerald-700 space-y-2">
              <li>Ceiling fan</li>
              <li>Basic furnishings</li>
              <li>Free bottled water</li>
              <li>LKR 18,000 / night</li>
            </ul>
          </section>
          <div className="flex justify-center order-1 md:order-2">
            <Image
              src={non}
              alt="non"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default Room;
