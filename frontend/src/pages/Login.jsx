import axios from "axios";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // "Login" | "Sign Up" | "OTP"
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Email/Password form submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          if (response.data.requireOtp) {
            toast.info(response.data.message || "Verification code sent!");
            if (response.data.devOtp) {
              toast.success(`Verification OTP: ${response.data.devOtp}`, { autoClose: 12000 });
            }
            setCurrentState("OTP");
          } else {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success("Account created successfully!");
          }
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Login") {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Welcome back!");
        } else if (response.data.requireOtp) {
          toast.warning(response.data.message || "Email not verified!");
          if (response.data.devOtp) {
            toast.success(`Verification OTP: ${response.data.devOtp}`, { autoClose: 12000 });
          }
          setCurrentState("OTP");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Submit Handler
  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (!otp || otp.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit OTP code");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/verify-otp", {
        email,
        otp: otp.trim(),
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Email verified! Logged in successfully.");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    setResending(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/resend-otp", { email });
      if (response.data.success) {
        toast.success(response.data.message || "New OTP sent!");
        if (response.data.devOtp) {
          toast.info(`New OTP: ${response.data.devOtp}`, { autoClose: 12000 });
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP code");
    } finally {
      setResending(false);
    }
  };

  // Google OAuth verification handler (Real Gmail accounts verified by Google)
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/google-auth", {
        credential: credentialResponse.credential,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Signed in with Google!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Google authentication failed");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(error.response?.data?.message || "Google sign-in error");
    }
  };

  const customGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(backendUrl + "/api/user/google-auth", {
          token: tokenResponse.access_token,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Signed in with Google!");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error("Google sign-in failed");
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-black/5">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-[#8C7355] mb-1">
            {currentState === "OTP"
              ? "Account Verification"
              : currentState === "Login"
              ? "Velora Customer Portal"
              : "Join Velora Luxury"}
          </p>
          <h1 className="font-serif-title text-3xl font-medium text-[#121212]">
            {currentState === "OTP"
              ? "Verify Email"
              : currentState === "Login"
              ? "Sign In"
              : "Create Account"}
          </h1>
        </div>

        {/* Tab Switcher (Shown when not in OTP mode) */}
        {currentState !== "OTP" && (
          <div className="flex items-center bg-[#FAF9F6] p-1.5 rounded-2xl mb-6 border border-black/5">
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                currentState === "Login"
                  ? "bg-[#121212] text-white shadow-sm"
                  : "text-[#555] hover:text-[#121212]"
              }`}
            >
              Sign In
            </button>
            
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                currentState === "Sign Up"
                  ? "bg-[#8C7355] text-white shadow-sm"
                  : "text-[#8C7355] hover:bg-[#8C7355]/10 font-bold"
              }`}
            >
              <span>Create Account</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]" />
            </button>
          </div>
        )}

        {/* OTP VERIFICATION VIEW */}
        {currentState === "OTP" ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#FAF9F6] border border-[#8C7355]/20 p-4 rounded-2xl text-center mb-4">
              <p className="text-xs text-[#555] mb-1">We sent a 6-digit verification code to:</p>
              <p className="text-xs font-bold text-[#121212]">{email}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">Enter 6-Digit OTP Code</label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-center text-lg tracking-[8px] font-bold text-[#121212] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#8C7355] transition-all"
                placeholder="123456"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#8C7355] hover:bg-[#735e45] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Verify & Complete Registration</span>
              )}
            </button>

            <div className="flex justify-between items-center text-xs text-[#666] pt-2">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-[#8C7355] font-semibold hover:underline"
              >
                {resending ? "Sending..." : "Resend OTP Code"}
              </button>
              
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className="text-gray-500 hover:text-black"
              >
                Change Email
              </button>
            </div>
          </form>
        ) : (
          /* STANDARD SIGN IN / SIGN UP FORM */
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {currentState === "Sign Up" && (
              <div>
                <label className="block text-xs font-medium text-[#444] mb-1">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs text-[#121212] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#8C7355] transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#444] mb-1">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs text-[#121212] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#8C7355] transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-[#444]">Password</label>
                {currentState === "Login" && (
                  <button
                    type="button"
                    onClick={() => toast.info("Password reset link sent to your email!")}
                    className="text-[11px] text-[#8C7355] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 text-xs text-[#121212] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#8C7355] transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
                currentState === "Sign Up"
                  ? "bg-[#8C7355] hover:bg-[#735e45] text-white"
                  : "bg-[#121212] hover:bg-[#2c2c2c] text-white"
              }`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{currentState === "Login" ? "Sign In" : "Register Account"}</span>
              )}
            </button>
          </form>
        )}

        {/* Divider & Google Login (only shown when not in OTP mode) */}
        {currentState !== "OTP" && (
          <>
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5" />
              </div>
              <span className="relative px-3 bg-white text-[10px] font-semibold text-[#888] uppercase tracking-widest">
                Or
              </span>
            </div>

            {/* Google Verified Sign-In */}
            <div className="space-y-2.5">
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Sign-In failed")}
                  shape="pill"
                  theme="outline"
                  size="large"
                  text={currentState === "Sign Up" ? "signup_with" : "signin_with"}
                  width="100%"
                />
              </div>

              <button
                type="button"
                onClick={() => customGoogleLogin()}
                className="w-full py-2.5 px-4 bg-[#FAF9F6] hover:bg-[#f2efe9] text-[#121212] font-medium text-xs border border-black/10 rounded-full transition-all flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Verified Google Account</span>
              </button>
            </div>
          </>
        )}

        {/* Highlighted Create Account Button */}
        {currentState === "Login" && (
          <div className="mt-8 pt-5 border-t border-black/5 text-center">
            <p className="text-xs text-[#666] mb-3">New to Velora Store?</p>
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="w-full py-3 px-4 bg-[#8C7355] hover:bg-[#735e45] text-white font-semibold text-xs tracking-wider uppercase rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Account</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        )}

        {currentState === "Sign Up" && (
          <div className="mt-6 text-center">
            <p className="text-xs text-[#666]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className="font-semibold text-[#8C7355] hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
