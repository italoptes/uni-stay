import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          Plataforma UniStay
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Residências disponíveis
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Encontre moradias estudantis com uma experiência simples, clara e pronta para
          crescer com os próximos recursos da plataforma.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Carregando residências...</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {residences.map((residence) => (
            <article
              key={residence.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{residence.location}</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{residence.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {typeof residence.price === 'number'
                  ? `R$ ${residence.price.toFixed(2)}`
                  : residence.price}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/residences/${residence.id}`}
                  className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
