import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreateResidence() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    contactPhone: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await api.post('/residences', {
        ...formData,
        price: Number(formData.price),
      });
      localStorage.setItem('successMessage', 'Residência criada com sucesso!');
      navigate('/my-residences');
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors && typeof errors === 'object') {
        setFieldErrors(errors);
        setErrorMessage('');
      } else {
        setErrorMessage('Erro ao salvar residência');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Nova residência
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Preencha os dados abaixo para cadastrar uma nova residência na plataforma.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Digite o título da residência"
              required
            />
            {fieldErrors.title ? <p className="text-sm text-red-500">{fieldErrors.title}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Descreva a residência"
              required
            />
            {fieldErrors.description ? (
              <p className="text-sm text-red-500">{fieldErrors.description}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor="location">
              Localização
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Digite a localização"
              required
            />
            {fieldErrors.location ? (
              <p className="text-sm text-red-500">{fieldErrors.location}</p>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700" htmlFor="price">
                Preço
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                placeholder="Digite o preço"
                required
              />
              {fieldErrors.price ? (
                <p className="text-sm text-red-500">{fieldErrors.price}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700" htmlFor="contactPhone">
                Telefone para contato
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="text"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                placeholder="Digite o telefone"
                required
              />
              {fieldErrors.contactPhone ? (
                <p className="text-sm text-red-500">{fieldErrors.contactPhone}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Salvando...' : 'Criar residência'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateResidence;
