// src/hooks/useLogin.js
import { useState } from 'react';

const LOGIN_API_URL = 'https://192.168.60.31/api/logistics/login/microsoft';

export default function useLogin(onSuccess) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed');

      onSuccess(data);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, errors, isLoading, setErrors };
}
