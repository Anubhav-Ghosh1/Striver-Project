import { Routes,Route } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Flashcard from "./components/flashbard/FlashCard";
import Error from "./components/Error/Error";

function App() {
      return (
        // <div className="app">
          <div>
          <Routes>
            <Route path="/" element={<Flashcard/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
          </Routes>
            {/* <AdminDashboard />  */}
          </div>
        // </div>
      );
  }

export default App;
