import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ChefHat } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#f6fefb] to-[#f1f7f4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#99f2c8]/40"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Illustration */}
            <div className="hidden md:block md:col-span-2 bg-[#81bda6] relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  {/* Chef illustration */}
                  <ChefHat className="w-28 h-28 text-[#99f2c8]/40 drop-shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  {/* Soft bubbles */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        background: "#99f2c8",
                        opacity: 0.1,
                        width: Math.random() * 24 + 12,
                        height: Math.random() * 24 + 12,
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        filter: "blur(2px)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-8 sm:p-12">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center w-16 h-16 bg-[#99f2c8]/15 rounded-full mb-6 mx-auto shadow">
                  <Mail className="w-8 h-8 text-[#1f4037]" />
                </div>

                <h2 className="text-3xl font-extrabold text-[#1f4037] text-center mb-3">
                  Get Foodie Updates
                </h2>

                <p className="text-[#1f4037]/80 text-center mb-8 font-medium">
                  Subscribe for exclusive deals, new menu items, and special
                  offers.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#99f2c8]/20 p-4 rounded-xl text-center shadow"
                  >
                    <p className="text-[#1f4037] font-semibold">
                      Thanks for subscribing! Check your inbox soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-5 py-4 pr-12 rounded-xl bg-[#f6fefb] border border-[#99f2c8]/40 text-[#1f4037] placeholder-[#1f4037]/30 focus:outline-none focus:ring-2 focus:ring-[#99f2c8]/50 focus:border-[#99f2c8] transition-all duration-200"
                        required
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99f2c8]/50 group-focus-within:text-[#1f4037] transition-colors" />
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] hover:from-[#1f4037] hover:to-[#99f2c8] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300"
                    >
                      <span>Subscribe Now</span>
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.span>
                    </motion.button>
                  </form>
                )}

                <p className="text-xs text-[#1f4037]/50 text-center mt-6">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
