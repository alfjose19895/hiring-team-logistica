import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthPublicLayout, PrivateLayout } from '../../layouts';

import { LoginPage, RegisterPage } from '../../auth/pages';
import { ProductsPage } from '../../dashboard/products';
import { UsersPage } from '../../dashboard/users';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<AuthPublicLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          <Route path="/dashboard" element={<PrivateLayout />}>
            <Route index element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="users" element={<UsersPage />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
