import React, { useState, useEffect } from "react";
import WineStats from "./WineStats ";
import { WineData } from "./WineData"; // Import the data directly

const App = () => {
  const [wineData, setWineData] = useState([]);

  useEffect(() => {
    // Simulating an asynchronous data fetch (you can replace this with an actual fetch)
    const fetchData = async () => {
      try {
        // Simulate a delay to mimic an asynchronous operation (replace with actual fetch logic)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setWineData(WineData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <header>
        <h1>Wine Dataset Statistics</h1>
      </header>
      <main>
        {wineData.length > 0 ? (
          <WineStats data={wineData} />
        ) : (
          <p>Loading wine data...</p>
        )}
      </main>
      <footer>
        <p>Powered by React</p>
      </footer>
    </div>
  );
};

export default App;
