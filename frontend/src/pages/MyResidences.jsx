import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ResidenceCard({ residence, onDelete }) {
  return (
      <article className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:border-green-200 overflow-hidden">
        <div className="flex flex-col gap-1 p-5 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 leading-snug">{residence.title}</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-xs text-gray-400 truncate">{residence.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 gap-2">
        <span className="text-sm font-bold text-green-600">
          {typeof residence.price === 'number'
              ? `R$ ${residence.price.toFixed(2)}`
              : residence.price}
          <span className="text-xs font-normal text-gray-400">/mês</span>
        </span>

          <div className="flex items-center gap-2">
            <Link
                to={`/residences/${residence.id}/edit`}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
              Editar
            </Link>
            <button
                type="button"
                onClick={() => onDelete(residence.id)}
                className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
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
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-pulse">
        <div className="p-5 flex flex-col gap-2">
          <div className="h-3.5 w-3/4 rounded bg-gray-100" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <div className="h-4 w-20 rounded bg-gray-100" />
          <div className="flex gap-2">
            <div className="h-7 w-16 rounded-lg bg-gray-100" />
            <div className="h-7 w-16 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
  );
}

function MyResidences() {
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('any');

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
      } finally {
        setLoading(false);
      }
    };

    fetchResidences();
  }, []);

  useEffect(() => {
    if (!successMessage) return undefined;
    const timeoutId = window.setTimeout(() => setSuccessMessage(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const handleDeleteResidence = async (id) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta residência?');
    if (!confirmed) return;

    try {
      await api.delete(`/residences/${id}`);
      setResidences((current) => current.filter((r) => r.id !== id));
      setSuccessMessage('Residência removida com sucesso!');
    } catch (error) {
      console.error('Não foi possível excluir a residência.', error);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
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
      if (Number.isNaN(priceValue)) return false;
      if (priceFilter === 'upTo250') return priceValue <= 250;
      if (priceFilter === '250to500') return priceValue > 250 && priceValue <= 500;
      if (priceFilter === '500to700') return priceValue > 500 && priceValue <= 700;
      if (priceFilter === 'above700') return priceValue > 700;
    }

    return true;
  });

  return (
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-8">

        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Minhas residências</h1>
            <p className="mt-1 text-sm text-gray-500">Gerencie os imóveis cadastrados na sua conta.</p>
          </div>
          {!loading && filteredResidences.length > 0 && (
              <span className="text-xs text-gray-400 font-medium self-start sm:self-auto">
            {filteredResidences.length}{' '}
                {filteredResidences.length === 1 ? 'residência' : 'residências'}
          </span>
          )}
        </div>
        {!loading && residences.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por título ou localização"
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="any">Qualquer preço</option>
              <option value="upTo250">Até R$ 250</option>
              <option value="250to500">R$ 250 a R$ 500</option>
              <option value="500to700">R$ 500 a R$ 700</option>
              <option value="above700">Acima de R$ 700</option>
            </select>
          </div>
        )}

        {/* Feedback de sucesso */}
        {successMessage && (
            <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
              <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
        )}

        {/* Loading */}
        {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        )}

        {/* Vazio */}
        {!loading && filteredResidences.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <svg className="mb-3 w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
              </svg>
              <p className="text-sm font-medium text-gray-500">Você ainda não cadastrou nenhuma residência.</p>
              <p className="mt-1 text-xs text-gray-400">Clique em "+ Nova" para começar.</p>
            </div>
        )}

        {/* Grid de cards */}
        {!loading && filteredResidences.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResidences.map((residence) => (
                  <ResidenceCard
                      key={residence.id}
                      residence={residence}
                      onDelete={handleDeleteResidence}
                  />
              ))}
            </div>
        )}

      </section>
  );
}

export default MyResidences;
