import React from "react";


function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#232635] pb-5">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-[#292c3c] rounded-2xl shadow p-10 text-center text-[#f1f3fa]">
          <h2 className="font-bold text-2xl mb-4">About Queue Away</h2>
          <p className="mb-4 text-[#b0b7c3] text-base leading-relaxed">
            <b>Queue Away</b> is your smart solution for managing queues at your favorite shops, salons, clinics, and service providers.<br /><br />
            Our platform helps you discover, join, and manage queues online, saving you time and making your experience smoother.<br /><br />
            Whether you're a customer looking to avoid long waits or a business aiming to streamline your service, Queue Away is here to help.<br /><br />
            <span className="text-[#f1f3fa] font-semibold">Join us and experience hassle-free queuing!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
