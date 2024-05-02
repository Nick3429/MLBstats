import './Sp.css';
import React, { useEffect,useState } from 'react';

function Sp() {

      const url= "https://statsapi.mlb.com/api/v1/people/640455?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2024,endDate=10/01/2024,season=2024)"

      const [playerstat, setPlayerstat] = useState({atBats:0}); 
      const [playerName, setPlayerName] = useState({fullName:"Chris Sale"}); 
      const [teamName, setTeamName] = useState({name:"Boston Red Sox"}); 

      function getSPFromApi() {    
        fetch(url)
          .then((response) => response.json())
          .then((json) => {  
            /* view the JSON that's returned in the server log */ 
            const people= json.people;
            const tName = json.people[0].stats[0].splits[1].team;
            console.log(tName)
            setTeamName(tName)
            const pName = json.people[0];
            console.log(pName);
           // console.log(pName);
            setPlayerName(pName);
            const stats= json.people[0].stats;
            setPlayerstat(stats[0].splits[0].stat);
            //const splits= stats[3];
            //const stat= splits.people[0];
           // console.log("api request");
            //console.log(personName);
            //console.log(stats);
            //console.log(stats[0]);
            //console.log(stats[0].splits);
            //console.log(stats[0].splits[0]);
            //console.log(stats[0].splits[0].stat);
            //console.log(stats[0].splits[0].stat.atBats);
            //console.log(json);      
            //console.log(json.pitchers)
            //setPitcher(json.pitchers);
            //console.log(pitchers)
          })
          .catch((error) => {
             console.error(error);
        
          });
        };

     // const buildUrl = (id) => {
     //   const baseUrl = 'https://statsapi.mlb.com/api/v1/people/';
     //   const queryParams = '?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2024,endDate=10/01/2024,season=2024)';
     //   return `${baseUrl}${id}${queryParams}`;
    //  };

 

       // Use useEffect to call the function when the component mounts
      useEffect(() => {
        getSPFromApi();
      }, []);

      //const tableRows = playerstat.map((player)=>
      //<tr><td>{player.atBats}</td><td>{player.team}</td><td>{player.GS}</td><td>{player.Wins}</td><td>{player.losses}</td><td>{player.ERA}</td><td>{player.AVG}</td><td>{player.OBP}</td><td>{player.SLG}</td><td>{player.OPS}</td><td>{player.WHIP}</td><td>{player.StrikePerc}</td><td>{player.KperWalk}</td><td>{player.WalkperNine}</td><td>{player.HRperNine}</td><td>{player.KperNine}</td></tr>)


      const tableRow = <tr><td>{playerName.fullName}</td><td>{teamName.name}</td><td>{playerstat.gamesStarted}</td><td>{playerstat.wins}</td><td>{playerstat.losses}</td><td>{playerstat.era}</td><td>{playerstat.avg}</td><td>{playerstat.obp}</td><td>{playerstat.slg}</td><td>{playerstat.ops}</td><td>{playerstat.whip}</td><td>{playerstat.strikePercentage}</td><td>{playerstat.strikeoutWalkRatio}</td><td>{playerstat.walksPer9Inn}</td><td>{playerstat.homeRunsPer9}</td><td>{playerstat.strikeoutsPer9Inn}</td></tr>

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
                     <th>GS</th>
                     <th>Wins</th>
                     <th>Losses</th>
                     <th>ERA</th>
                     <th>Avg</th>
                     <th>OBP</th>
                     <th>SLG</th>
                     <th>OPS</th>
                     <th>WHIP</th>
                     <th>Strike %</th>
                     <th>K/Walk</th>
                     <th>Walks/9</th>
                     <th>HR/9</th>
                     <th>K/9</th> 
                 </tr>
            {tableRow}
    
            </tbody>
        </table> 
    </div>
    
  );
}

export default Sp;



