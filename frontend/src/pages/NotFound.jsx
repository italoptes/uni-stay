import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
          Página não encontrada
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
