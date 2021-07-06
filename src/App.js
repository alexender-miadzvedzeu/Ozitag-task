import './App.css';
import LoginPage from "./components/LogInPage";
import { useState } from "react";
import UserPage from "./components/UserPage";

function App() {

  const [loged, setLoged] = useState(false);
  const [data, setData] = useState({});

  return (
    <div className="App">
      {!loged ? <LoginPage setData={setData} setLoged={setLoged} /> : <UserPage setLoged={setLoged} {...data} />}
    </div>
  );
}

export default App;
