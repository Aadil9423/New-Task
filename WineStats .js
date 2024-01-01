import React, { useEffect, useState } from "react";

const WineStats = ({ data }) => {
  const [flavanoidsStats, setFlavanoidsStats] = useState({});
  const [gammaStats, setGammaStats] = useState({});

  useEffect(() => {
    // Utility function to calculate mean, median, and mode
    const calculateStats = (property) => {
      const classValues = {};
      data.forEach((item) => {
        const className = `Class ${item.Alcohol}`;
        if (!classValues[className]) {
          classValues[className] = [];
        }
        classValues[className].push(item[property]);
      });

      const classStats = {};
      Object.entries(classValues).forEach(([className, values]) => {
        const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
        const sortedValues = [...values].sort((a, b) => a - b);
        const middle = Math.floor(sortedValues.length / 2);
        const median =
          sortedValues.length % 2 === 0
            ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
            : sortedValues[middle];
        const modeMap = {};
        let mode = null;
        values.forEach((value) => {
          modeMap[value] = (modeMap[value] || 0) + 1;
          if (!mode || modeMap[value] > modeMap[mode]) {
            mode = value;
          }
        });
        classStats[className] = {
          Mean: mean !== undefined ? mean.toFixed(3) : "N/A",
          Median: median !== undefined ? median.toFixed(3) : "N/A",
          Mode: mode !== undefined ? mode.toFixed(3) : "N/A",
        };
      });

      return classStats;
    };

    // Task a: Calculate Flavanoids stats
    const flavanoidsStats = calculateStats("Flavanoids");
    setFlavanoidsStats(flavanoidsStats);

    // Task b: Calculate Gamma stats
    const calculateGamma = (item) => {
      const denominator = item.Magnesium;
      const result =
        denominator !== 0 ? (item.Ash * item.Hue) / denominator : 0;
      return isFinite(result) ? result : 0; // Use isFinite to handle Infinity and NaN
    };

    const gammaData = data.map((item) => ({
      ...item,
      Gamma: calculateGamma(item),
    }));
    const gammaStats = calculateStats("Gamma");
    setGammaStats(gammaStats);
  }, [data]);

  // Helper function to render table rows
  const renderTableRows = (stats) => {
    return Object.keys(stats).map((className) => (
      <tr key={className}>
        <td>{className}</td>
        <td>{stats[className].Mean}</td>
        <td>{stats[className].Median}</td>
        <td>{stats[className].Mode}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Flavanoids Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(flavanoidsStats).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {renderTableRows(flavanoidsStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[1]}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {renderTableRows(flavanoidsStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[2]}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {renderTableRows(flavanoidsStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[3]}
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Gamma Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(gammaStats).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {renderTableRows(gammaStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[1]}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {renderTableRows(gammaStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[2]}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {renderTableRows(gammaStats).map((row) => (
              <React.Fragment key={row.key}>
                {row.props.children[3]}
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStats;
