import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, Clock } from "lucide-react";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const OrderId = searchParams.get("OrderId");
  const { url } = useContext(StoreContext);
  const [status, setStatus] = useState("verifying");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verifyOrder`, {
        success,
        OrderId,
      });
      if (response.data.success) {
        setStatus("success");
        setTimeout(() => {
          navigate("/myorders");
        }, 5000);
      } else {
        setStatus("failed");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1f4037] via-[#eaf7f0] to-[#f6fefb] py-28 px-4 sm:px-6 lg:px-8 ">
      <AnimatePresence>
        {status === "verifying" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md w-full border border-[#99f2c8]/30"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-[#99f2c8] border-t-[#1f4037] flex items-center justify-center"
              >
                <Clock className="w-8 h-8 text-[#1f4037]" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-[#1f4037] mb-3">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mb-6">
              We're confirming your payment details. This will just take a
              moment...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-[#99f2c8] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md w-full border border-[#99f2c8]/30"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="w-24 h-24 bg-[#99f2c8]/20 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-12 h-12 text-[#1f4037]" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-[#1f4037] mb-3">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your order #{OrderId} has been confirmed. You'll be redirected to
              your orders shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/myorders")}
                className="flex-1 py-3 bg-[#1f4037] text-white rounded-lg font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              >
                View Orders
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/")}
                className="flex-1 py-3 border border-[#1f4037] text-[#1f4037] rounded-lg font-medium flex items-center justify-center hover:bg-[#1f4037]/5 transition-all"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </motion.button>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Redirecting in 5 seconds...
            </div>
          </motion.div>
        )}

        {(status === "failed" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md w-full border border-red-200/30"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="w-24 h-24 bg-red-100/20 rounded-full flex items-center justify-center mx-auto"
              >
                <XCircle className="w-12 h-12 text-red-500" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              {status === "failed" ? "Payment Failed" : "Verification Error"}
            </h2>
            <p className="text-gray-600 mb-6">
              {status === "failed"
                ? "We couldn't verify your payment. Please try again or contact support."
                : "Something went wrong during verification. We'll redirect you to the homepage."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/cart")}
                className="flex-1 py-3 bg-[#1f4037] text-white rounded-lg font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              >
                Back to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/")}
                className="flex-1 py-3 border border-[#1f4037] text-[#1f4037] rounded-lg font-medium flex items-center justify-center hover:bg-[#1f4037]/5 transition-all"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </motion.button>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Redirecting in 5 seconds...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verify;
