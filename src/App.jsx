import { Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Routes from "./Routes";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
}
