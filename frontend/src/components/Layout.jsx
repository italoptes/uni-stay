import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = isAuthenticated
    ? [
        { to: '/', label: 'Início' },
        { to: '/my-residences', label: 'Minhas residências' },
        { to: '/residences/new', label: 'Nova residência' },
      ]
    : [
        { to: '/', label: 'Início' },
        { to: '/login', label: 'Entrar' },
        { to: '/register', label: 'Cadastrar' },
      ];

  const getNavLinkClassName = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-slate-900 text-white'
        : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-semibold tracking-tight text-slate-950">
            UniStay
          </NavLink>

          <nav className="flex items-center gap-2 sm:gap-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getNavLinkClassName}>
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              >
                Sair
              </button>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
