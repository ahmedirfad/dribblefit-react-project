import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuth();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [resend, setResend] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  if (!email) return null;

  

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setError("");
    setLoading(true);

    const result = await verifyOtp(email, finalOtp);

    if (result.success) {
      navigate("/"); 
    } else {
      setError(result.message || "Invalid OTP");
    }

    setLoading(false);
  };

 
  const handleResend = async () => {
    const result = await resendOtp(email);

    if (result.success) {
      setTimeLeft(120);
      setResend(false);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      inputsRef.current[0]?.focus();
    } else {
      setError(result.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-32 flex items-center justify-center px-4">
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8 max-w-md w-full">

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
            <p className="text-gray-400 text-sm mt-2">
              Code sent to<br />
              <span className="text-[#00ff00] font-semibold">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00ff00]"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">
                {timeLeft > 0 ? (
                  <>Expires in <span className="text-[#00ff00]">{formatTime()}</span></>
                ) : (
                  <span className="text-red-400">Expired</span>
                )}
              </p>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#00ff00] text-black px-6 py-2 rounded-lg"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleResend}
              disabled={!resend}
              className={`w-full text-sm py-2 ${
                resend ? "text-[#00ff00]" : "text-gray-500"
              }`}
            >
              Resend OTP
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerifyOtp;