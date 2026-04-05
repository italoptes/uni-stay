import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ResidenceCard({ residence }) {
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

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <span className="text-sm font-bold text-green-600">
          {typeof residence.price === 'number'
              ? `R$ ${residence.price.toFixed(2)}`
              : residence.price}
          <span className="text-xs font-normal text-gray-400">/mês</span>
        </span>
          <Link
              to={`/residences/${residence.id}`}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 active:scale-95"
          >
            Ver detalhes
          </Link>
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
          <div className="h-7 w-24 rounded-lg bg-gray-100" />
        </div>
      </div>
  );
}

function Home() {
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('any');

  useEffect(() => {
    const fetchResidences = async () => {
      try {
        const response = await api.get('/residences');
        setResidences(Array.isArray(response.data) ? response.data : []);
      } catch {
        setError('Não foi possível carregar as residências no momento.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidences();
  }, []);

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
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Residências disponíveis
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Encontre a moradia ideal para sua rotina acadêmica.
            </p>
          </div>
          {!loading && !error && filteredResidences.length > 0 && (
              <span className="text-xs text-gray-400 font-medium self-start sm:self-auto">
            {filteredResidences.length}{' '}
                {filteredResidences.length === 1 ? 'resultado' : 'resultados'}
          </span>
          )}
        </div>
        {!loading && !error && residences.length > 0 && (
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

        {/* Loading */}
        {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
              ))}
            </div>
        )}

        {/* Erro */}
        {!loading && error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
        )}

        {/* Vazio */}
        {!loading && !error && filteredResidences.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <svg className="mb-3 w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
              </svg>
              <p className="text-sm font-medium text-gray-500">Nenhuma residência disponível no momento.</p>
              <p className="mt-1 text-xs text-gray-400">Volte em breve ou cadastre a sua.</p>
            </div>
        )}

        {/* Grid de cards */}
        {!loading && !error && filteredResidences.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResidences.map((residence) => (
                  <ResidenceCard key={residence.id} residence={residence} />
              ))}
            </div>
        )}

      </section>
  );
}

export default Home;
