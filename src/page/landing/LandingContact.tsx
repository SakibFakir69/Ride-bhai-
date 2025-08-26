import React from "react";

import { Send, Phone, MapPin, Mail } from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import { SiLinkedin } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";



function ContactPage() {

  const onSubmitEmail = async (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "c9772aaf-2a17-49f6-92db-8373d78f892d");

    const object = Object.fromEntries(formData);
    const { name, email, message, subject } = object;
    if (!name) {
      toast.error("Enter your name");
      return;
    } else if (!email) {
      toast.error("Enter your subject");
      return;
    } else if (!subject) {
      toast.error("Enter your subject");
      return;
    } else if (!message) {
      toast.error("Enter your message");
      return;
    }

    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Email Sent");
      console.log("Success", res);
      event.target.reset();
    }
  };

  return (
    <div className="py-24 dark:bg-black bg-slate-950">


     
      <main className="pt-20   lg:pt-[0rem] min-h-screen   text-white">
        <ToastContainer />

        <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Have a question or want to work together? Drop us a message!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-400">sakibfakir749@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-500/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-pink-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold">Location</h3>

                      <p className="text-gray-400">Dhaka , Mohammadpur 1207</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <a
                    href="https://www.linkedin.com/in/sakib-fakir-183923295/"
                    target="_blank"
                    className="  bg-teal-300/15"
                  >
                    <SiLinkedin />
                  </a>

                  <a
                    href="https://web.facebook.com/sakib.fakir.169832"
                    target="_blank"
                  >
                    <BsFacebook className="md:size-6 size-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl">
                <form className="space-y-6" onSubmit={onSubmitEmail}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <input
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Your Message"
                        name="message"
                    
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ContactPage;