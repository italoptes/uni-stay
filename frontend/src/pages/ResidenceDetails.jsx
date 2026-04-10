import { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { getTypeLabel } from '../utils/residenceLabels';

function ResidenceHeroImage({ imageUrl }) {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt="Imagem da residência"
                className="object-cover w-full h-64 rounded-xl mb-6"
            />
        );
    }

    return (
        <div className="mb-6 flex h-64 w-full items-center justify-center rounded-xl bg-green-50 text-green-300">
            <svg className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
            </svg>
        </div>
    );
}

function InfoGrid({ residence }) {
    const typeLabel = getTypeLabel(residence.type);

    const items = [
        typeLabel && {
            label: 'Tipo',
            value: typeLabel,
        },
        residence.capacity != null && {
            label: 'Capacidade',
            value: `${residence.capacity} pessoas`,
        },
        residence.bathrooms != null && {
            label: 'Banheiros',
            value: `${residence.bathrooms} banheiro(s)`,
        },
        residence.currentResidents != null && {
            label: 'Moradores atuais',
            value: `${residence.currentResidents} morando`,
        },
    ].filter(Boolean);

    if (items.length === 0) return null;

    return (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-gray-800">Informações da residência</h2>
            <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                    <div key={item.label}>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-medium text-gray-700">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResidenceDetails() {
    const { id } = useParams();
    const [residence, setResidence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
            <section className="mx-auto max-w-3xl space-y-4 px-4 py-10 animate-pulse lg:max-w-4xl">
                <div className="bg-gray-100 h-64 rounded-xl mb-6" />
                <div className="h-5 w-24 rounded bg-gray-100" />
                <div className="h-7 w-2/3 rounded bg-gray-100" />
                <div className="h-4 w-full rounded bg-gray-100 mt-2" />
                <div className="h-4 w-4/5 rounded bg-gray-100" />
                <div className="rounded-xl border border-gray-200 bg-white p-6 mt-4 space-y-5">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="h-3 w-24 rounded bg-gray-100" />
                            <div className="h-4 w-40 rounded bg-gray-100" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (errorMessage) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-10 lg:max-w-4xl">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Voltar
                </button>
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
            </section>
        );
    }

    if (!residence) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-10 lg:max-w-4xl">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Voltar
                </button>
                <p className="text-sm text-gray-500">Residência não encontrada.</p>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-3xl px-4 py-10 lg:max-w-4xl">
            <ResidenceHeroImage imageUrl={residence.imageUrl} />

            <button
                onClick={() => navigate('/residences')}
                className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Voltar para listagem
            </button>

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-xs text-gray-400">{residence.location}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">
                    {residence.title}
                </h1>
                {residence.description && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{residence.description}</p>
                )}
            </div>

            <InfoGrid residence={residence} />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-baseline gap-1 border-b border-gray-100 bg-green-50 px-6 py-4">
          <span className="text-2xl font-bold text-green-600">
            {typeof residence.price === 'number'
                ? `R$ ${residence.price.toFixed(2)}`
                : residence.price}
          </span>
                    <span className="text-sm text-green-500">/mês</span>
                </div>

                <dl className="divide-y divide-gray-100">
                    <div className="flex items-start gap-3 px-6 py-4">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <div>
                            <dt className="text-xs font-medium text-gray-400 mb-0.5">Localização</dt>
                            <dd className="text-sm text-gray-800">{residence.location}</dd>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 px-6 py-4">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <div>
                            <dt className="text-xs font-medium text-gray-400 mb-0.5">Telefone para contato</dt>
                            <dd className="text-sm text-gray-800">{residence.contactPhone}</dd>
                        </div>
                    </div>
                </dl>
            </div>

        </section>
    );
}

export default ResidenceDetails;
