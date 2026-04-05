import { Link } from 'react-router-dom';

function LandingPage() {
  return (
      <section className="w-full min-h-screen bg-gray-50">

        {/* Hero */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}
            />
            <div
                className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Sua próxima moradia,{' '}
              <span className="text-green-600">sem complicação</span>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base text-gray-500 leading-relaxed">
              O UniStay conecta estudantes a residências com segurança e praticidade. Encontre o lugar certo ou anuncie o seu em poucos minutos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                  to="/residences"
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
              >
                Ver residências disponíveis
              </Link>
              <Link
                  to="/register"
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-400 active:scale-95"
              >
                Criar conta grátis
              </Link>
            </div>
          </div>
        </div>

        {/* Como funciona */}
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
            Como funciona
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Busque residências',
                description:
                    'Explore opções disponíveis filtradas por localização e perfil, sem precisar criar conta.',
              },
              {
                step: '02',
                title: 'Veja todos os detalhes',
                description:
                    'Compare preços, estrutura e localização de cada residência antes de tomar qualquer decisão.',
              },
              {
                step: '03',
                title: 'Anuncie a sua',
                description:
                    'Crie uma conta e publique suas residências. Gerencie tudo em um painel pessoal organizado.',
              },
            ].map(({ step, title, description }) => (
                <div
                    key={step}
                    className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-green-200"
                >
              <span className="mb-3 block text-3xl font-bold text-green-100 select-none leading-none">
                {step}
              </span>
                  <h2 className="mb-2 text-sm font-semibold text-gray-800">{title}</h2>
                  <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Diferenciais */}
        <div className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
              Por que usar o UniStay
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                  ),
                  title: 'Autenticação segura',
                  description: 'Acesso protegido por JWT. Suas publicações são só suas.',
                },
                {
                  icon: (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                  ),
                  title: 'Acesso público à listagem',
                  description: 'Qualquer pessoa pode ver as residências disponíveis, sem cadastro.',
                },
                {
                  icon: (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                  ),
                  title: 'Gerenciamento completo',
                  description: 'Crie, edite e remova suas residências com controle total.',
                },
              ].map(({ icon, title, description }) => (
                  <div
                      key={title}
                      className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-green-200"
                  >
                    <div className="mt-0.5 flex-shrink-0 rounded-lg bg-green-50 p-2 h-fit">
                      {icon}
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-gray-800">{title}</h3>
                      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-green-100 bg-green-600 px-8 py-12 text-center shadow-sm">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Pronto para começar?
            </h2>
            <p className="mx-auto mb-7 max-w-sm text-sm leading-relaxed text-green-100">
              Crie sua conta gratuitamente e acesse as melhores opções de moradia estudantil.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                  to="/register"
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 active:scale-95"
              >
                Criar conta
              </Link>
              <Link
                  to="/residences"
                  className="rounded-lg border border-green-400 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 active:scale-95"
              >
                Ver residências
              </Link>
            </div>
          </div>
        </div>

      </section>
  );
}

export default LandingPage;