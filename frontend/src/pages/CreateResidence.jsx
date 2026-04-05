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
    const validationErrors = {};
    if (!formData.title.trim()) {
      validationErrors.title = 'Título é obrigatório.';
    }
    if (!formData.description.trim()) {
      validationErrors.description = 'Descrição é obrigatória.';
    }
    if (!formData.location.trim()) {
      validationErrors.location = 'Localização é obrigatória.';
    }
    const priceValue = Number(formData.price);
    if (!priceValue || priceValue <= 0) {
      validationErrors.price = 'Preço deve ser maior que zero.';
    }
    if (!formData.contactPhone.trim()) {
      validationErrors.contactPhone = 'Telefone para contato é obrigatório.';
    } else if (formData.contactPhone.trim().length < 8) {
      validationErrors.contactPhone = 'Telefone deve ter no mínimo 8 caracteres.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }
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
    <section className="mt-6 mb-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            Nova residência
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            Preencha os dados abaixo para cadastrar uma nova residência na plataforma.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {errorMessage ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite o título da residência"
              required
            />
            {fieldErrors.title ? (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-32 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Descreva a residência"
              required
            />
            {fieldErrors.description ? (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.description}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="location">
              Localização
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite a localização"
              required
            />
            {fieldErrors.location ? (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.location}</p>
            ) : null}
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="price">
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
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite o preço"
                required
              />
              {fieldErrors.price ? (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.price}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="contactPhone">
                Telefone para contato
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="text"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite o telefone"
                required
              />
              {fieldErrors.contactPhone ? (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.contactPhone}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Salvando...' : 'Criar residência'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateResidence;
