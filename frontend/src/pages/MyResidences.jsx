import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { getTypeLabel } from '../utils/residenceLabels';

function ResidenceImage({ imageUrl, className = 'aspect-[4/3] w-full rounded-t-xl' }) {
  if (imageUrl) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={imageUrl}
          alt="Capa da residência"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`flex overflow-hidden items-center justify-center bg-green-50 text-green-300 ${className}`}>
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    </div>
  );
}

function ResidenceInfoRow({ residence }) {
  const typeLabel = getTypeLabel(residence.type);
  const items = [];

  if (typeLabel) {
    items.push(
      <span key="type" className="flex items-center gap-1.5">
        <svg className="h-[14px] w-[14px] flex-shrink-0 stroke-current" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
        </svg>
        {typeLabel}
      </span>
    );
  }

  if (residence.capacity != null) {
    items.push(
      <span key="capacity" className="flex items-center gap-1.5">
        <svg className="h-[14px] w-[14px] flex-shrink-0 stroke-current" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        {residence.capacity} pessoas
      </span>
    );
  }

  if (residence.bathrooms != null) {
    items.push(
      <span key="bathrooms" className="flex items-center gap-1.5">
        <svg className="h-[14px] w-[14px] flex-shrink-0 stroke-current" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-2.25 3-5.25 6.89-5.25 9.75a5.25 5.25 0 1010.5 0c0-2.86-3-6.75-5.25-9.75z" />
        </svg>
        {residence.bathrooms} banheiro(s)
      </span>
    );
  }

  if (residence.currentResidents != null) {
    items.push(
      <span key="currentResidents" className="flex items-center gap-1.5">
        <svg className="h-[14px] w-[14px] flex-shrink-0 stroke-current" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        {residence.currentResidents} morando
      </span>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">{items}</div>;
}

function ResidenceCard({ residence, onDelete }) {
  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
      <ResidenceImage imageUrl={residence.imageUrl} />

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800">{residence.title}</h2>
        <div className="mt-0.5 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p className="truncate text-xs text-gray-400">{residence.location}</p>
        </div>
        <ResidenceInfoRow residence={residence} />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-5 py-3">
        <span className="text-sm font-bold text-green-600">
          {typeof residence.price === 'number' ? `R$ ${residence.price.toFixed(2)}` : residence.price}
          <span className="text-xs font-normal text-gray-400">/mês</span>
        </span>

        <div className="flex items-center gap-2">
          <Link
            to={`/residences/${residence.id}/edit`}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            Editar
          </Link>
          <button
            type="button"
            onClick={() => onDelete(residence.id)}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="aspect-[4/3] animate-pulse rounded-t-xl bg-gray-100" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-3.5 w-3/4 rounded bg-gray-100" />
        <div className="h-3 w-1/2 rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <div className="h-4 w-16 rounded bg-gray-100" />
        <div className="flex gap-2">
          <div className="h-7 w-16 rounded-lg bg-gray-100" />
          <div className="h-7 w-16 rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function MyResidences() {
  const { showToast } = useToast();
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('any');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minimumCapacity, setMinimumCapacity] = useState('any');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResidenceId, setSelectedResidenceId] = useState(null);

  useEffect(() => {
    const storedSuccessMessage = localStorage.getItem('successMessage');
    if (storedSuccessMessage) {
      setSuccessMessage(storedSuccessMessage);
      localStorage.removeItem('successMessage');
    }

    const fetchResidences = async () => {
      try {
        const response = await api.get('/residences/me');
        setResidences(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Não foi possível carregar as residências do usuário.', error);
        showToast('Não foi possível carregar as residências.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchResidences();
  }, []);

  useEffect(() => {
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setSuccessMessage(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const handleOpenDeleteModal = (id) => {
    setSelectedResidenceId(id);
    setIsModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedResidenceId(null);
  };

  const handleDeleteResidence = async () => {
    if (selectedResidenceId == null) {
      return;
    }

    try {
      await api.delete(`/residences/${selectedResidenceId}`);
      setResidences((current) => current.filter((residence) => residence.id !== selectedResidenceId));
      setSuccessMessage('Residência removida com sucesso!');
      showToast('Residência removida com sucesso!', 'success');
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Não foi possível excluir a residência.', error);
      showToast('Não foi possível excluir a residência.', 'error');
    }
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('any');
    setSelectedTypes([]);
    setMinimumCapacity('any');
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const minimumCapacityValue = minimumCapacity === 'any' ? null : Number(minimumCapacity);
  const activeFiltersCount =
    (normalizedSearch ? 1 : 0) +
    (priceFilter !== 'any' ? 1 : 0) +
    (selectedTypes.length > 0 ? 1 : 0) +
    (minimumCapacity !== 'any' ? 1 : 0);

  const filteredResidences = residences.filter((residence) => {
    const title = residence.title?.toLowerCase() ?? '';
    const location = residence.location?.toLowerCase() ?? '';

    if (normalizedSearch && !title.includes(normalizedSearch) && !location.includes(normalizedSearch)) {
      return false;
    }

    if (priceFilter !== 'any') {
      const priceValue =
        typeof residence.price === 'number'
          ? residence.price
          : Number(String(residence.price).replace(/[^\d.-]/g, ''));

      if (Number.isNaN(priceValue)) {
        return false;
      }

      if (priceFilter === 'upTo250') return priceValue <= 250;
      if (priceFilter === '250to500') return priceValue > 250 && priceValue <= 500;
      if (priceFilter === '500to700') return priceValue > 500 && priceValue <= 700;
      if (priceFilter === 'above700') return priceValue > 700;
    }

    if (selectedTypes.length > 0 && !selectedTypes.includes(residence.type)) {
      return false;
    }

    if (minimumCapacityValue != null && residence.capacity != null && residence.capacity < minimumCapacityValue) {
      return false;
    }

    return true;
  });

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10 xl:max-w-7xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Minhas residências</h1>
          <p className="mt-1 text-sm text-gray-500">Gerencie os imóveis cadastrados na sua conta.</p>
        </div>

        <div className="self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsFiltersOpen((current) => !current)}
            className="relative rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.843.143 1.367 1.004.98 1.767A13.953 13.953 0 0116.5 11.25a2.25 2.25 0 00-.75 1.678v3.543c0 .597-.237 1.169-.659 1.591l-1.5 1.5a.75.75 0 01-1.281-.53v-6.104a2.25 2.25 0 00-.75-1.678A13.953 13.953 0 012.937 5.445c-.387-.763.137-1.624.98-1.767A48.523 48.523 0 0112 3z" />
              </svg>
              Filtros
            </span>
            {activeFiltersCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-out ${isFiltersOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-800">Filtros</h2>
            {activeFiltersCount > 0 ? (
              <button type="button" onClick={clearFilters} className="text-sm text-red-500 transition hover:text-red-700">
                Limpar filtros
              </button>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="searchTerm">
                Buscar
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar por título ou localização"
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="priceFilter">
                Preço
              </label>
              <select
                id="priceFilter"
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="any">Qualquer preço</option>
                <option value="upTo250">Até R$ 250</option>
                <option value="250to500">R$ 250 a R$ 500</option>
                <option value="500to700">R$ 500 a R$ 700</option>
                <option value="above700">Acima de R$ 700</option>
              </select>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-medium text-gray-700">Tipo</span>
              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedTypes.includes('HOUSE')} onChange={() => handleTypeToggle('HOUSE')} className="accent-green-600" />
                  Casa inteira
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedTypes.includes('ROOM')} onChange={() => handleTypeToggle('ROOM')} className="accent-green-600" />
                  Quarto
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes('SHARED_SPOT')}
                    onChange={() => handleTypeToggle('SHARED_SPOT')}
                    className="accent-green-600"
                  />
                  Vaga compartilhada
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="minimumCapacity">
                Capacidade mínima
              </label>
              <select
                id="minimumCapacity"
                value={minimumCapacity}
                onChange={(event) => setMinimumCapacity(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="any">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {successMessage ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <svg className="h-4 w-4 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : null}

      {!loading && filteredResidences.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <svg className="mb-3 h-8 w-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
          </svg>
          <p className="text-sm font-medium text-gray-500">Você ainda não cadastrou nenhuma residência.</p>
          <p className="mt-1 text-xs text-gray-400">Clique em &quot;+ Nova&quot; para começar.</p>
        </div>
      ) : null}

      {!loading && filteredResidences.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResidences.map((residence) => (
            <ResidenceCard key={residence.id} residence={residence} onDelete={handleDeleteResidence} />
          ))}
        </div>
      ) : null}
    </section>
    <ConfirmDeleteModal
      isOpen={isModalOpen}
      onClose={handleCloseDeleteModal}
      onConfirm={handleDeleteResidence}
    />
  );
}

export default MyResidences;
