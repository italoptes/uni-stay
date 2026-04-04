import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function ResidenceDetails() {
  const { id } = useParams();
  const [residence, setResidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchResidence = async () => {
      try {
        const response = await api.get(`/residences/${id}`);
        setResidence(response.data);
      } catch {
        setErrorMessage('Não foi possível carregar a residência.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidence();
  }, [id]);

  if (loading) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Detalhes da residência
        </h1>
        <p className="text-sm font-medium text-slate-500">Carregando residência...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Detalhes da residência
        </h1>
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      </section>
    );
  }

  if (!residence) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Detalhes da residência
        </h1>
        <p className="text-sm font-medium text-slate-500">Residência não encontrada.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {residence.title}
        </h1>
        <p className="text-base leading-7 text-slate-600">
          {residence.description || 'Sem descrição informada.'}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Localização</dt>
            <dd className="mt-1 text-base text-slate-900">{residence.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Preço</dt>
            <dd className="mt-1 text-base text-slate-900">
              {typeof residence.price === 'number'
                ? `R$ ${residence.price.toFixed(2)}`
                : residence.price}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Telefone para contato</dt>
            <dd className="mt-1 text-base text-slate-900">{residence.contactPhone}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default ResidenceDetails;
