import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import Articles from "./pages/Articles";
import LandingPage from "./pages/LandingPage";
import { ProtectedRoute } from "./routes/ProtectTedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
