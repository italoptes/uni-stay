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
    <section className="space-y-6">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
          Residências disponíveis
        </h1>
        <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-gray-500">
          Encontre moradias estudantis com uma navegação simples e organizada.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Carregando residências...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {residences.map((residence) => (
            <article
              key={residence.id}
              className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <h2 className="text-base font-semibold text-gray-800">{residence.title}</h2>
              <p className="text-sm text-gray-500">{residence.location}</p>
              <p className="text-sm font-semibold text-green-600">
                {typeof residence.price === 'number'
                  ? `R$ ${residence.price.toFixed(2)}`
                  : residence.price}
              </p>
              <div className="mt-2">
                <Link
                  to={`/residences/${residence.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
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
