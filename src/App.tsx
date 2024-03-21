import "./App.css";
import NavLayout from "./layout/NavLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./authRoute/PrivateRoute";
import ServicesPage from "./pages/ServicesPage";
import ClientsPage from "./pages/clients/ClientsPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import ClientsServicesPage from "./pages/ClientsServicePage";
import AddServicesPage from "./pages/AddServicesPage";
import ClientsDetails from "./pages/ClientDetailsPage";
import AddEditContactPage from "./pages/contacts/AddEditContactPage";
import AddEditClientPage from "./pages/clients/AddEditClientPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/details/:id?" element={<AddServicesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/details/:id?" element={<AddEditClientPage />} />
          <Route path="/clients/:id" element={<ClientsDetails />} />
          <Route
            path="/clients/services/:id"
            element={<ClientsServicesPage />}
          />
          <Route
            path="/contacts/details/:id?"
            element={<AddEditContactPage />}
          />
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
