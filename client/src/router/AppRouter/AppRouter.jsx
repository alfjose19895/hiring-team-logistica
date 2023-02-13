import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthPublicLayout } from '../../layouts';

import { LoginPage, RegisterPage } from '../../auth/pages';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
