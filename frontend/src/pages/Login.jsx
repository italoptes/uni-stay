import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedSuccessMessage = localStorage.getItem('successMessage');

    if (storedSuccessMessage) {
      setSuccessMessage(storedSuccessMessage);
      localStorage.removeItem('successMessage');
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: null,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await login(formData.username, formData.password);
      navigate('/residences');
    } catch (error) {
      const errors = error.response?.data?.errors;
      const status = error.response?.status;

      if (errors && typeof errors === 'object') {
        setFieldErrors(errors);
        setErrorMessage('');
      } else if (status === 401) {
        setErrorMessage('Usuário ou senha inválidos');
      } else {
        setErrorMessage('Não foi possível entrar. Verifique seus dados e tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-6 mb-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            Entrar na conta
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            Acesse sua conta para acompanhar residências e futuras reservas.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {successMessage ? (
            <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="username">
              Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
            />
            {fieldErrors.username ? (
              <p className="text-sm text-red-500">{fieldErrors.username}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
            {fieldErrors.password ? (
              <p className="text-sm text-red-500">{fieldErrors.password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
