import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MicrosoftLogin from './MicrosoftLogin';
import useLogin from '../../hooks/useLogin';
import logo from '../../assets/images/xenoptics_original_logo.png';
import { Eye, EyeOff, Mail, Lock, Shield, CheckCircle, AlertCircle, Truck, BarChart3, Smartphone, Zap } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, errors, isLoading, setErrors } = useLogin((data) => {
    login({
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.access_token,
    });
    console.log('Login success:', data);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    loginUser(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
        {/* Left Panel - Branding */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 lg:p-16 flex flex-col justify-center items-center text-white relative overflow-hidden">

          {/* Brand Logo */}
          <div className="text-center mb-12 relative z-10">
            <img src={logo} alt="Xen Logistic Logo" className="mx-auto mt-4 mb-4 w-72 h-auto" />
            <div className="bg-white mx-auto mt-4 mb-4 w-72 h-auto p-2">
              <img src={logo} alt="Xen Logistic Logo" className="w-full h-auto" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              XEN<span className="text-blue-400">OPTICS</span>
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Logistics Shipments
            </p>
            <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full"></div>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {errors.general}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Xenoptics Mail</label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your xenoptics email"
                    className={`appearance-none block w-full px-3 py-2 pl-12 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`appearance-none block w-full px-3 py-2 pl-12 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            {/* Divider & Microsoft Login */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>
            <MicrosoftLogin />

          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
