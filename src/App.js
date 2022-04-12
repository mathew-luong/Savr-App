import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SavingsPage from "./pages/SavingsPage";
import StartPage from "./pages/StartPage";
import ExpensesPage from "./pages/ExpensesPage";
import DashboardPage from "./pages/DashboardPage";
import SupportPage from "./pages/SupportPage";
import SignUpPage from "./pages/SignUpPage";


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/start-up" element={<StartPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
    </div>
  );
}

export default App;
