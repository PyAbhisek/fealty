"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

type User = {
  email: string;
  password: string;
  role: 'Developer' | 'Manager';
};

const USERS: User[] = [
  {
    email: 'developer@example.com',
    password: 'password123',
    role: 'Developer'
  },
  {
    email: 'manager@example.com',
    password: 'password123',
    role: 'Manager'
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (userData) {
      const user = JSON.parse(userData);
      router.push(`/board/${user.role.toLowerCase()}`);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

  
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    
    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }));
      router.push(`/board/${user.role.toLowerCase()}`);
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null; 
  }

  return (
    <>
      <Head>
        <title>Login | Dashboard Application</title>
        <meta name="description" content="Login to access your dashboard" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#1F2024] ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            
            
          </form>
        </div>
      </div>
    </>
  );
}