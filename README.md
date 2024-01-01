# WineStats React Component

The `WineStats` component is designed to calculate and display statistical measures for the "Flavanoids" and "Gamma" properties of wine data. It includes calculations for Mean, Median, and Mode for each class in the data.

## Usage

To use the `WineStats` component, follow these steps:

1. Import the component in your React application:

   ```jsx
   import WineStats from "./path/to/WineStats";
   ```

2. Use the `WineStats` component in your JSX, passing the wine data as a prop:

   ```jsx
   import React from 'react';

   const YourComponent = () => {
     // Your wine data
     const wineData = [...]; // Replace with your actual data

     return (
       <div>
         {/* Other components or content */}
         <WineStats data={wineData} />
       </div>
     );
   };

   export default YourComponent;
   ```

## Props

### `data` (required)

- Type: Array
- Description: An array of objects representing wine data. Each object should have properties like "Alcohol," "Flavanoids," "Gamma," etc.

## How it Works

- The component calculates statistical measures (Mean, Median, Mode) for the "Flavanoids" property and the derived "Gamma" property based on the provided wine data.
- The results are displayed in tables, organized by wine class.

## Dependencies

- React
- useState and useEffect hooks

## License

This component is open-source and available under the [MIT License](LICENSE).
