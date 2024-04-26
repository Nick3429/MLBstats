import './Sp.css';
import React, { useEffect,useState } from 'react';

function Sp() {
    const ids = [608331,693821,450203,519242,625643];
    const players = [
        {name: "Luis Severino",
        team: "New York Mets"},
        {name: "Gerrit Cole",
        team: "New York Yankees"},
        {name: "Chris Sale",
        team: "Boston Red Sox"}
      ];

      const [pitchers, setPitcher] = useState([]); 

      const buildUrl = (id) => {
        const baseUrl = 'https://statsapi.mlb.com/api/v1/people/';
        const queryParams = '?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2024,endDate=10/01/2024,season=2024)';
        return `${baseUrl}${id}${queryParams}`;
      };
      
      // Function to fetch data from the API using the dynamically built URL
      const fetchData = async (id) => {
        const url = buildUrl(id);
        try {
          const response = await fetch(url);
          const json = await response.json();
          
          // Log the JSON response for debugging
          console.log(json);
      
          // Assuming the JSON contains an array of mov
          if (json.pitchers) {
            setPitcher((prevPitchers) => prevPitchers.concat(json.movies));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      // Iterate over each ID in the array and fetch data
      ids.forEach((id) => {
        fetchData(id);
        print(fetchData(id));
      });

      const tableRows = players.map((player)=>
      <tr><td>{player.name}</td><td>{player.team}</td></tr>)

  return (
    <div>
        <h1 className="Sp-header">
          MLB Starting Pitcher Statistics
        </h1>
        <table>
            <caption>Pitchers</caption>
            <tbody>
                <tr>
                     <th>Name</th>
                     <th>Team</th>
                 </tr>
            {tableRows}
    
            </tbody>
        </table>
    </div>
    
  );
}

export default Sp;





const employees = [
    {name: "Boomer",
    job: "Software Engineer"},
    {name: "Rocky",
    job: "Cloud Architect"},
    {name: "Cocoa",
    job: "UX Designer"}
  ];

  const tableRows = employees.map((employee)=>
  <tr><td>{employee.name}</td><td>{employee.job}</td></tr>)

  // Use the map function to create table rows and table data of 
  // employee name and jobs.
  //Here is what the first table row should look like.
  //<tr><td>Boomer</td><td>Software Engineer</td></tr>
  



