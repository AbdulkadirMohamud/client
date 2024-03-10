import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  // Kamer State
  const [kamer, setKamer] = useState("");

  // Berichten States
  const [bericht, setBericht] = useState("");
  const [berichtontvangen, setBerichtontvangen] = useState("");

  const deelnemenkamer = () => {
    if (kamer !== "") {
      socket.emit("deelnemen_kamer", kamer);
    }
  };

  const verstuurBericht = () => {
    socket.emit("verstuur_bericht", { bericht, kamer });
  };

  useEffect(() => {
    socket.on("bericht_ontvangen", (data) => {
      setBerichtontvangen(data.bericht);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Kamer Nummer..."
        onChange={(event) => {
          setKamer(event.target.value);
        }}
      />
      <button onClick={deelnemenkamer}>deelnemen Kamer</button>
      <input
        placeholder="Bericht..."
        onChange={(event) => {
          setBericht(event.target.value);
        }}
      />
      <button onClick={verstuurBericht}>berichtversturen</button>
      <h1>bericht:</h1>
      {berichtontvangen}
    </div>
  );
}

export default App;
