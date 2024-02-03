import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style/global.css";

function App() {
  return (
    <div>
      <Layout></Layout>
      <Login />
      <Register />
      <Dashboard />
    </div>
  );
}

export default App;
