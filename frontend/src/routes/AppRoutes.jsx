import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import CreateResidence from '../pages/CreateResidence';
import EditResidence from '../pages/EditResidence';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import MyResidences from '../pages/MyResidences';
import NotFound from '../pages/NotFound';
import ResidenceDetails from '../pages/ResidenceDetails';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/residences" element={<Home />} />
        <Route path="/residences/:id" element={<ResidenceDetails />} />
        <Route
          path="/residences/new"
          element={
            <ProtectedRoute>
              <CreateResidence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/residences/:id/edit"
          element={
            <ProtectedRoute>
              <EditResidence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-residences"
          element={
            <ProtectedRoute>
              <MyResidences />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
