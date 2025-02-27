import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const serverIp = prompt("Your IP:");
    const username = prompt("Your name:");

    if (username?.trim() && serverIp?.trim()) {
      try {
        const response = axios.post<string, username>(serverIp, { username });
        console.log(response.data);
      } catch (error) {}
    }
  });

  return <></>;
}

export default App;
