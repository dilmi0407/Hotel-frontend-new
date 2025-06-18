import MainLayout from '@/components/layouts/Mainlayout';
import React from 'react';
import Image from 'next/image';
import contact4 from '../../../../public/contact4.jpg';

const Contactus = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center py-10">

        
        <h1 className="text-blue-900 font-bold underline decoration-blue-400 underline-offset-8 text-5xl font-serif">
          Contact Us
        </h1>

        <br></br>
          <div className="w-full max-w-6xl px-4 mb-12">
          <Image
            src={contact4}
            alt="Contact4"
            width={1600}
            height={500}
            className="rounded-2xl shadow-lg hover:scale-105 transition duration-500 object-cover w-full h-80"
          />
        </div>

        <div className="bg-blue-300 p-10 my-10 rounded-3xl mx-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Get In Touch</h2>
          <p className="text-center text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Whether you have a question about bookings, services, events, or anything else, 
              our team is ready to answer all your questions. Vinrich Resort ensures you have 
              the best tropical vacation experience with our 24/7 support team.
          </p>
        </div> 

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">

          
          <div className="bg-green-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-500 text-center">
            <h2 className="text-4xl font-semibold text-blue-900 mb-6">📞 Call Us</h2>
            <p className="text-2xl text-emerald-600 mb-2">+94 453244200</p>
            <p className="text-2xl text-emerald-600 mb-2">+94 453244201</p>
            <p className="text-2xl text-emerald-600">+94 453244202</p>
          </div>

          
          <div className="bg-green-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-500 text-center">
            <h2 className="text-4xl font-semibold text-blue-900 mb-6">📧 Email Us</h2>
            <a
              href="mailto:info@vinrichresort.lk"
              className="text-2xl text-emerald-600 hover:underline transition duration-300"
            >
              info@vinrichresort.lk
            </a>
          </div>

         
          <div className="bg-green-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-500 text-center">
            <h2 className="text-4xl font-semibold text-blue-900 mb-6">📍 Visit Us</h2>
            <p className="text-2xl text-emerald-600 mb-2">Vinrich Resort</p>
            <p className="text-2xl text-emerald-600">No.70, Pitiwella, Boossa, Galle, Sri Lanka</p>
          </div>

        </div>

        
        <div className="w-full max-w-6xl mt-12 px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.120365920912!2d80.19829531477596!3d6.048109029807224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1730000000001%3A0xf5dfd90c70af7a8d!2sBoossa!5e0!3m2!1sen!2slk!4v1683083897567!5m2!1sen!2slk"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-md hover:shadow-xl transition"
          ></iframe>
        </div>

      </div>
    </MainLayout>
  );
};

export default Contactus;

