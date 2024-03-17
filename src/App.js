import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import CreateAirdrop from "./pages/create-airdrop";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-airdrop" element={<CreateAirdrop />} />
        <Route path="/faq" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
