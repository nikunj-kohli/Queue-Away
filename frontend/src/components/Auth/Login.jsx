import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, userType } = e.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate(userType.value === "customer" ? "/customer-dashboard" : "/business-dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="userType">
        <option value="customer">Customer</option>
        <option value="business">Business</option>
      </select>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}