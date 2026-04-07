import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { getTypeLabel } from '../utils/residenceLabels';

function ResidenceImage({ imageUrl, className = 'h-40 w-full rounded-t-xl' }) {
  if (imageUrl) {
    return <img src={imageUrl} alt="Capa da residência" className={`object-cover ${className}`} />;
  }

  return (
      <div className={`flex items-center justify-center bg-green-50 text-green-300 ${className}`}>
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

  if (items.length === 0) return null;

  return (
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
        {items}
      </div>
  );
}

function ResidenceCard({ residence }) {
  return (
      <article className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:border-green-200 overflow-hidden">
        <ResidenceImage imageUrl={residence.imageUrl} />
        <div className="flex flex-col gap-1 p-5 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 leading-snug">{residence.title}</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-xs text-gray-400 truncate">{residence.location}</p>
          </div>
          <ResidenceInfoRow residence={residence} />
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
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-100 h-40 rounded-t-xl animate-pulse" />
        <div className="p-5 flex flex-col gap-2">
          <div className="h-3.5 w-3/4 rounded bg-gray-100" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
          <div className="h-3 w-2/3 rounded bg-gray-100" />
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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minimumCapacity, setMinimumCapacity] = useState('any');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchResidences = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/residences', {
          params: { page: currentPage, size: 9 },
        });
        const pageData = response.data;
        setResidences(Array.isArray(pageData?.content) ? pageData.content : []);
        setTotalPages(typeof pageData?.totalPages === 'number' ? pageData.totalPages : 0);
        setTotalElements(typeof pageData?.totalElements === 'number' ? pageData.totalElements : 0);
      } catch {
        setResidences([]);
        setTotalPages(0);
        setTotalElements(0);
        setError('Não foi possível carregar as residências no momento.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidences();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('any');
    setSelectedTypes([]);
    setMinimumCapacity('any');
    setCurrentPage(0);
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
      if (Number.isNaN(priceValue)) return false;
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
      <section className="mx-auto max-w-5xl px-4 py-10 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Residências disponíveis</h1>
            <p className="mt-1 text-sm text-gray-500">Encontre a moradia ideal para sua rotina acadêmica.</p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {!loading && !error && filteredResidences.length > 0 && (
                <span className="text-xs text-gray-400 font-medium">
              {filteredResidences.length} {filteredResidences.length === 1 ? 'resultado' : 'resultados'}
            </span>
            )}
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
              {activeFiltersCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
                {activeFiltersCount}
              </span>
              )}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-out ${isFiltersOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-gray-800">Filtros</h2>
              {activeFiltersCount > 0 && (
                  <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm text-red-500 transition hover:text-red-700"
                  >
                    Limpar filtros
                  </button>
              )}
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
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
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
                    onChange={(e) => { setPriceFilter(e.target.value); setCurrentPage(0); }}
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
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes('HOUSE')}
                        onChange={() => handleTypeToggle('HOUSE')}
                        className="accent-green-600"
                    />
                    Casa inteira
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedTypes.includes('ROOM')}
                        onChange={() => handleTypeToggle('ROOM')}
                        className="accent-green-600"
                    />
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
                    onChange={(e) => { setMinimumCapacity(e.target.value); setCurrentPage(0); }}
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

        {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        )}

        {!loading && error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
        )}

        {!loading && !error && filteredResidences.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <svg className="mb-3 w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
              </svg>
              <p className="text-sm font-medium text-gray-500">Nenhuma residência disponível no momento.</p>
              <p className="mt-1 text-xs text-gray-400">Volte em breve ou cadastre a sua.</p>
            </div>
        )}

        {!loading && !error && filteredResidences.length > 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResidences.map((residence) => (
                    <ResidenceCard key={residence.id} residence={residence} />
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Anterior
                  </button>
                  <span className="text-sm font-medium text-gray-600">
                Página {totalPages === 0 ? 0 : currentPage + 1} de {Math.max(totalPages, 0)}
              </span>
                  <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={totalPages === 0 || currentPage === totalPages - 1}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  {totalElements} {totalElements === 1 ? 'residência encontrada' : 'residências encontradas'}
                </p>
              </div>
            </>
        )}

      </section>
  );
}

export default Home;
