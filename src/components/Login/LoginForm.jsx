import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import useLogin from '../../hooks/useLogin';
import LoginInput from './LoginInput';
import MessageBox from './MessageBox';
import MicrosoftLoginButton from './MicrosoftLoginButton';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const { loginUser, errors, isLoading } = useLogin((data) => {
    console.log('Login success:', data);
    // Redirect or set auth context here
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error or Success message */}
      {errors.general && <MessageBox type="error" text={errors.general} />}

      {/* Email */}
      <LoginInput
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your @xenoptics mail"
        icon={Mail}
      />

      {/* Password */}
      <LoginInput
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        icon={Lock}
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">Remember me</span>
        </label>
        <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
          Forgot password?
        </a>
      </div>

      {/* Sign in button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-70"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Microsoft Button */}
      <MicrosoftLoginButton />
    </form>
  );
}
