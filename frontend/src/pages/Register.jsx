import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setErrors({});
    setIsSubmitting(true);

    try {
      await api.post('/users', formData);
      localStorage.setItem('successMessage', 'Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      const fieldErrors = error.response?.data?.errors;

      if (fieldErrors && typeof fieldErrors === 'object') {
        setErrors(fieldErrors);
      } else {
        setErrorMessage('Erro ao cadastrar usuário');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-6 mb-6">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            Criar conta
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            Cadastre-se para explorar residências e gerenciar sua jornada na plataforma.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {errors.username ? <p className="text-sm text-red-500">{errors.username}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Telefone
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite seu telefone"
              autoComplete="tel"
            />
            {errors.phoneNumber ? (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
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
              autoComplete="new-password"
              required
            />
            {errors.password ? <p className="text-sm text-red-500">{errors.password}</p> : null}
          </div>

          {errorMessage ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
