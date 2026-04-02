import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/login', label: 'Entrar' },
  { to: '/register', label: 'Cadastrar' },
];

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-semibold tracking-tight text-slate-950">
            UniStay
          </NavLink>

          <nav className="flex items-center gap-2 sm:gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
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
