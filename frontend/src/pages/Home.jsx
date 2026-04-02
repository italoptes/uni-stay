function Home() {
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Centro</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Residência Solar</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Espaço moderno com fácil acesso a universidades, mercados e transporte.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Zona Norte</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Casa Horizonte</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ambiente confortável para estudantes que buscam praticidade no dia a dia.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2 xl:col-span-1">
          <p className="text-sm font-medium text-slate-500">Zona Sul</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Vila Campus</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estrutura acolhedora com quartos compartilhados e boa localização.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Home;
