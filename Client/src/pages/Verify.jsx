import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const OrderId = searchParams.get('OrderId');
    const { url } = useContext(StoreContext);

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verifyOrder`, { success, OrderId });
            console.log(response.data);
            if (response.data.success) {
                // Delay the redirection by 10 seconds
                setTimeout(() => {
                    navigate('/myorders');
                }, 3000); // 3,000 ms = 3 seconds
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Only run on component mount

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 text-center max-w-lg w-full">
                {/* Success Icon */}
                <div className="mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7 12l5 5 5-5M5 12l5-5 5 5"
                        />
                    </svg>
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Order Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. You will be redirected to your orders page shortly. Thank you for shopping with us!
                </p>

                {/* Button to Home Page */}
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default Verify;
