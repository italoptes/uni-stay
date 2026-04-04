import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { User } from "lucide-react";
import { useEffect, useRef } from 'react';

function Layout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = isAuthenticated
    ? [
      { to: '/', label: 'Início' },
      { to: '/residences/new', label: 'Nova residência' },
    ]
    : [
      { to: '/', label: 'Início' },
      { to: '/login', label: 'Entrar' },
      { to: '/register', label: 'Cadastrar' },
    ];

  const getNavLinkClassName = ({ isActive }) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition ${isActive
      ? 'bg-green-600 text-white'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
    }`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 px-4 py-3">

          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="UniStay" className="h-12 w-auto" />
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              Uni<span className="text-green-500">Stay</span>
            </span>
          </NavLink>


          {isAuthenticated && (
            <div ref={dropdownRef} className="relative flex items-center gap-2">
              <NavLink
                to="/residences/new"
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700"
              >
                + Nova
              </NavLink>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User size={22} className="text-green-600" />
                Olá, {user?.username || 'Usuário'}
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-md">                  <button
                  onClick={() => {
                    setOpen(false);
                    navigate('/');
                  }}
                  className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Início
                </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate('/my-residences');
                    }}
                    className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Minhas residências
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Cadastrar
              </NavLink>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
