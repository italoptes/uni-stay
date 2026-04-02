import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (error) {
      setErrorMessage('Não foi possível entrar. Verifique seus dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Entrar na conta
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Acesse sua conta para acompanhar residências e futuras reservas.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="username">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
