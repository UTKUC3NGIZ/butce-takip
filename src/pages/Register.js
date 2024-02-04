import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import moneyImage from "../images/—Pngtree—gold coin 3d elements_5904489.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );
      if (response.data.includes("successful")) {
        toast.success(response.data);
        navigate(`/`);
      }
    } catch (error) {
      toast.error("Registration failed:", error);
    }
  };
  return (
    <div className="loginPage">
      <div>
        <h1>Kayıt Olun</h1>
        <h2>Islem yapabilmek için lütfen kayıt olun.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="İsim"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            onChange={handleInputChange}
            value={formData.password}
          />
          <button type="submit">Kayıt Ol</button>
        </form>
        <span>
          Hesabınız var mı? <Link to="/Login">Giriş Yapın</Link>
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

export default Register;
