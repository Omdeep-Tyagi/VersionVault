import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];//empty array
  let currentDate = new Date(startDate);
  const end = new Date(endDate);//date format mai converted

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);//count btw 0 to 50 //can also bring from database
    data.push({
      date: currentDate.toISOString().split("T")[0], //YYY-MM-DD
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);//update date with +1
  }

  return data;//it is array which contain data about date and count
};

const getPanelColors = (maxCount) => {//for shades of green
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);//shades 255 is max value(0 to 255)
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }

  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});//set : only store unique value

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";//dummy data//later yha api se fetch karna
      const endDate = "2001-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}//double curly braces
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,//how much round//horizontal size of block
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;