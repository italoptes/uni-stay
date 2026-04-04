import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateResidence from '../pages/CreateResidence';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/residences/new"
          element={
            <ProtectedRoute>
              <CreateResidence />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
