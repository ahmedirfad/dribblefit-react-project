import React, { useState } from 'react';
import api from '../../Api/Axios';

const RazorpayPayment = ({ amount, onSuccess, onFailure, userInfo = {} }) => {
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        try {
            // 1. Load Razorpay script
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                alert('Failed to load Razorpay SDK. Please check your internet connection.');
                setLoading(false);
                return;
            }

            // 2. Create order in backend
            const orderResponse = await api.post('/payments/create-order', {
                amount: Math.round(amount)
            });

            const { orderId, amount: orderAmount, key_id } = orderResponse.data;

            // 3. Razorpay checkout options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || key_id, // FIXED HERE
                amount: orderAmount,
                currency: 'INR',
                name: 'DribbleFit',
                description: 'Football Jersey Purchase',
                image: '/logo.png',
                order_id: orderId,
                handler: async (response) => {
                    // 4. Verify payment on backend
                    try {
                        const verifyResponse = await api.post('/payments/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyResponse.data.success) {
                            if (onSuccess) {
                                onSuccess({
                                    ...response,
                                    paymentDetails: verifyResponse.data.paymentDetails
                                });
                            }
                        } else {
                            if (onFailure) {
                                onFailure(verifyResponse.data.message || 'Payment verification failed');
                            }
                        }
                    } catch (verificationError) {
                        console.error('Verification error:', verificationError);
                        if (onFailure) {
                            onFailure(verificationError.response?.data?.message || 'Payment verification failed');
                        }
                    }
                },
                prefill: {
                    name: userInfo.name || 'Customer',
                    email: userInfo.email || 'customer@example.com',
                    contact: userInfo.phone || '9999999999'
                },
                notes: {
                    address: userInfo.address || 'Not provided'
                },
                theme: {
                    color: '#00ff00'
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                        if (onFailure) {
                            onFailure('Payment cancelled by user');
                        }
                    }
                }
            };

            const razorpayInstance = new window.Razorpay(options);

            // Handle payment failure
            razorpayInstance.on('payment.failed', (response) => {
                console.error('Payment failed:', response.error);
                setLoading(false);
                if (onFailure) {
                    onFailure(response.error.description || 'Payment failed');
                }
            });

            razorpayInstance.open();

        } catch (error) {
            console.error('Payment error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            if (onFailure) {
                onFailure(errorMessage);
            }
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-[#00ff00] text-black font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300 mb-4 disabled:opacity-50"
        >
            {loading ? 'Processing...' : `PAY ₹${Math.round(amount)}`}
        </button>
    );
};

export default RazorpayPayment;