import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, CheckCircle, AlertCircle, Truck, BarChart3, Smartphone, Zap } from 'lucide-react';
import logo from '../../assets/images/xenoptics_original_logo.png';

export default function XenLogisticLogin() {
  const [formData, setFormData] = useState({
    // email: 'admin@xenoptics.com',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    
    // Clear previous messages
    setMessage({ type: '', text: '' });
    
    // Basic validation
    if (!formData.email || !formData.password) {
      showMessage('error', 'Please fill in all fields');
      return;
    }
    
    if (!formData.email.includes('@xenoptics.com')) {
      showMessage('error', 'Only @xenoptics.com email addresses are allowed');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.password.length >= 6) {
        showMessage('success', 'Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          alert('Login successful! In a real app, you would be redirected to the dashboard.');
        }, 1000);
      } else {
        showMessage('error', 'Invalid password. Password must be at least 6 characters.');
      }
    } catch (error) {
      showMessage('error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignIn = () => {
    alert('Microsoft SSO integration would be implemented here');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e);
    }
  };

  const features = [
    // { icon: BarChart3, text: 'Real-time tracking & analytics' },
    // { icon: Truck, text: 'Optimized route planning' },
    // { icon: Smartphone, text: 'Mobile-first dashboard' },
    // { icon: Zap, text: 'Automated workflow management' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Panel - Branding */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 lg:p-16 flex flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Brand Logo */}
            <div className="text-center mb-12 relative z-10">
              {/* <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                XEN<span className="text-blue-400">OPTICS</span>
              </h1> */}
               <img src={logo} alt="Xen Logistic Logo" className="mx-auto mt-4 mb-4 w-72 h-auto" />
              <p className="text-xl text-gray-300 font-light">
                Logistics Shipments
              </p>
              <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Features */}
            <div className="space-y-6 relative z-10 hidden lg:block">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  message.type === 'error' 
                    ? 'bg-red-50 border border-red-200 text-red-700' 
                    : 'bg-green-50 border border-green-200 text-green-700'
                }`}>
                  {message.type === 'error' ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              {/* Login Form */}
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    XenOptics Email 
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>                

                {/* Sign In Button */}
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed focus:ring-4 focus:ring-blue-100"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500 bg-white">or continue with</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Microsoft Sign In */}
              <button
                onClick={handleMicrosoftSignIn}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <div className="w-5 h-5 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-sm"></div>
                <span>Sign in with Microsoft</span>
              </button>

              {/* Security Note */}
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Only @xenoptics.com email addresses allowed</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}