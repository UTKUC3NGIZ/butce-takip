import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../style/authentication.css";
import moneyImage from "../images/—Pngtree—gold coin 3d elements_5904489.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        formData
      );

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      navigate(`/`);
    } catch (error) {}
  };

  return (
    <div className="loginPage">
      <div>
        <h1>Oturum Açın</h1>
        <h2>Islem yapabilmek için lütfen giris yapın.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Giriş</button>
        </form>
        <span>
          Hesabınız yok mu? <Link to="/register">Kayıt olun</Link>
        </span>
      </div>
      <div>
        <span>
          <img src={moneyImage} alt="" />
          <div>
            <p>"Para Para Para"</p>
            <span>Napolyon Bonapart</span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Login;
