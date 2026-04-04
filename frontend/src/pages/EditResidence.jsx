import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditResidence() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    contactPhone: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchResidence = async () => {
      try {
        const response = await api.get(`/residences/${id}`);
        const residence = response.data;

        setFormData({
          title: residence.title ?? '',
          description: residence.description ?? '',
          location: residence.location ?? '',
          price: residence.price ?? '',
          contactPhone: residence.contactPhone ?? '',
        });
      } catch {
        setErrorMessage('Não foi possível carregar a residência.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidence();
  }, [id]);

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
      await api.put(`/residences/${id}`, {
        ...formData,
        price: Number(formData.price),
      });
      localStorage.setItem('successMessage', 'Residência atualizada com sucesso!');
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

  if (loading) {
    return (
      <section className="mt-6 mb-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Carregando residência...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6 mb-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            Editar residência
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            Atualize os dados abaixo para manter a residência sempre em dia.
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
            {fieldErrors.title ? <p className="text-sm text-red-500">{fieldErrors.title}</p> : null}
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
              <p className="text-sm text-red-500">{fieldErrors.description}</p>
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
              <p className="text-sm text-red-500">{fieldErrors.location}</p>
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
                <p className="text-sm text-red-500">{fieldErrors.price}</p>
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
                <p className="text-sm text-red-500">{fieldErrors.contactPhone}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditResidence;
