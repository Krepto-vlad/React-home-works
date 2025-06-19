import { Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/menuPage";
import { HomePage } from "./pages/homePage";
import { LoginPage } from "./pages/loginPage";
import { AuthRequire } from "./components/authRequire";
import { OrderPage } from "./pages/orderPage";
import { NotFoundPage } from "./pages/notFoundPage";

export default function MyApp() {
   return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/order"
        element={
          <AuthRequire>
            <OrderPage />
          </AuthRequire>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
