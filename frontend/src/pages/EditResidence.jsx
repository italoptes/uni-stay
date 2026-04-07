import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { uploadImage } from '../utils/uploadImage';

const residenceTypeOptions = [
  { value: 'HOUSE', label: 'Casa inteira' },
  { value: 'ROOM', label: 'Quarto' },
  { value: 'SHARED_SPOT', label: 'Vaga compartilhada' },
];

function EditResidence() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    price: '',
    contactPhone: '',
    capacity: '',
    bathrooms: '',
    currentResidents: '',
    imageUrl: null,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);

  useEffect(() => {
    const fetchResidence = async () => {
      try {
        const response = await api.get(`/residences/${id}`);
        const residence = response.data;

        setFormData({
          title: residence.title ?? '',
          description: residence.description ?? '',
          location: residence.location ?? '',
          type: residence.type ?? '',
          price: residence.price ?? '',
          contactPhone: residence.contactPhone ?? '',
          capacity: residence.capacity ?? '',
          bathrooms: residence.bathrooms ?? '',
          currentResidents: residence.currentResidents ?? '',
          imageUrl: residence.imageUrl ?? null,
        });
        setPreviewUrl(residence.imageUrl ?? '');
        setRemoveCurrentImage(false);
      } catch {
        setErrorMessage('Não foi possível carregar a residência.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidence();
  }, [id]);

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [selectedImage]);

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

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    setSelectedImage(file);
    setFormData((current) => ({
      ...current,
      imageUrl: file ? current.imageUrl : removeCurrentImage ? null : current.imageUrl,
    }));
    setPreviewUrl((current) => (file ? current : removeCurrentImage ? '' : formData.imageUrl || ''));
    setRemoveCurrentImage(false);
    setUploadError('');
    setErrorMessage('');
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setRemoveCurrentImage(true);
    setFormData((current) => ({
      ...current,
      imageUrl: null,
    }));
    setUploadError('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setUploadError('');
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
      let imageUrl = removeCurrentImage ? null : formData.imageUrl || null;

      if (selectedImage) {
        try {
          imageUrl = await uploadImage(selectedImage);
        } catch (error) {
          setUploadError(error.message || 'Erro ao enviar imagem.');
          setIsSubmitting(false);
          return;
        }
      }

      await api.put(`/residences/${id}`, {
        ...formData,
        type: formData.type || null,
        price: Number(formData.price),
        capacity: formData.capacity === '' ? null : Number(formData.capacity),
        bathrooms: formData.bathrooms === '' ? null : Number(formData.bathrooms),
        currentResidents: formData.currentResidents === '' ? null : Number(formData.currentResidents),
        imageUrl: imageUrl ?? null,
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

          {uploadError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {uploadError}
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

          <div className="space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="type">
              Tipo
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione o tipo</option>
              {residenceTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldErrors.type ? (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.type}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="capacity">
                Capacidade (pessoas)
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="20"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {fieldErrors.capacity ? (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.capacity}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="bathrooms">
                Banheiros
              </label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="1"
                max="10"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {fieldErrors.bathrooms ? (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.bathrooms}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="currentResidents">
                Moradores atuais
              </label>
              <input
                id="currentResidents"
                name="currentResidents"
                type="number"
                min="0"
                max="20"
                value={formData.currentResidents}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {fieldErrors.currentResidents ? (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.currentResidents}</p>
              ) : null}
            </div>
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

          <div className="space-y-3">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="image">
              Imagem de capa
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 file:mr-3 file:rounded-xl file:border-0 file:bg-green-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400">Opcional. Você pode manter a imagem atual ou enviar uma nova.</p>
            {previewUrl ? (
              <div className="space-y-2">
                <img
                  src={previewUrl}
                  alt="Preview da imagem da residência"
                  className="h-48 w-full rounded-xl border border-gray-200 object-cover shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="cursor-pointer text-sm text-red-500 underline hover:text-red-700"
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-green-50 text-green-300">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
                </svg>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-green-600 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && selectedImage ? 'Enviando imagem...' : isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditResidence;
