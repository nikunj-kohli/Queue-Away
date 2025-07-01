import React, { useState } from "react";
import { Button } from "./ui/button";
import { BsPersonCircle } from "react-icons/bs";

function BusinessLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle business login logic here
    console.log("Business login:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="font-bold text-2xl mb-4">Business Login</h2>
          <BsPersonCircle size={56} className="mx-auto mb-4 text-gray-400" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Business email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="default" type="submit" className="w-full mt-2">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessLogin;
