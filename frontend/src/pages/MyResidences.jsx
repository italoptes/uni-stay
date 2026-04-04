import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MyResidences() {
  const [residences, setResidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

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
    if (!successMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

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
      setSuccessMessage('Residência removida com sucesso!');
    } catch (error) {
      console.error('Não foi possível excluir a residência.', error);
    }
  };

  return (
    <section className="space-y-6">
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold text-gray-800">Minhas residências</h1>
        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          Gerencie os imóveis cadastrados na sua conta.
        </p>
        {successMessage ? (
          <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </p>
        ) : null}
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Carregando...</p>
        </div>
      ) : residences.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Você ainda não cadastrou nenhuma residência.
          </p>
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
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  to={`/residences/${residence.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteResidence(residence.id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-200"
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
