function Register() {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Criar conta
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Cadastre-se para explorar residências e gerenciar sua jornada na plataforma.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Nome completo
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            E-mail
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Senha
          </div>
          <button
            type="button"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
