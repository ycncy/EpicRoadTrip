"use client"

import { authService } from "@/app/lib/service/auth.service";
import router from "next/router";
import { useState } from 'react';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log("Form Data:", { username, password });

  try {
    const response = await authService.login({ username, password });
    if (response) {
      console.log('Login success:', response);
      alert('Connexion réussie');
      // Optionally, save the token to localStorage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user_id', response.user_id);
      // Redirect the user to their session page
      window.location.href = `/authentication/users/${response.user_id}`;    
    } else {
        console.log('Login error:', response);
        setError('Une erreur est survenue lors de la connexion.');
    }
  } catch (error) {
    console.error("Login error:", error);
    setError( 'Une erreur est survenue lors de la connexion.');
  }
};
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Se connecter
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Nom d'utilisateur
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Se connecter
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte?{" "}
                <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Inscrivez-vous
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;


