import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MyResidences() {
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const handleDeleteResidence = async (id) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta residência?');

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/residences/${id}`);
      setResidences((currentResidences) =>
        currentResidences.filter((residence) => residence.id !== id),
      );
    } catch (error) {
      console.error('Não foi possível excluir a residência.', error);
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Minhas residências
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Gerencie os imóveis cadastrados na sua conta.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Carregando...</p>
        </div>
      ) : residences.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Você ainda não cadastrou nenhuma residência.
          </p>
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
                  to={`/residences/${residence.id}/edit`}
                  className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteResidence(residence.id)}
                  className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyResidences;
