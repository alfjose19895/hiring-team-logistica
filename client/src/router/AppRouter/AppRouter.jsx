import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthPublicLayout, PrivateLayout } from '../../layouts';

import { LoginPage, RegisterPage } from '../../auth/pages';
import { ProductsPage } from '../../dashboard/products';
import { useAuthStore } from '../../hooks';
import { LoaderSpinner } from '../../ui/loaders';
import { CategoriesPage } from '../../dashboard/categories';

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') return <LoaderSpinner />;

  return (
    <BrowserRouter>
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path="/" element={<AuthPublicLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<PrivateLayout />}>
              <Route index element={<ProductsPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
