import './Sp.css';
import React, { useEffect,useState } from 'react';

function Sp() {
    const pitcherIds = [669203, 680570, 669330, 665152, 608344, 
                        641482 ,607074, 573186, 657376, 661563,
                        592332, 621244, 605135, 579328, 670102,
                        621107, 650644, 641793, 641302, 686752,
                        678394, 601713, 676710, 676477, 656557,
                        669456, 663474, 676440, 671106, 471911,
                        676979, 647336, 607200, 623167, 680897,
                        666142, 607625, 608379, 663903, 679525,
                        641154, 657746, 641927, 663978, 686973,
                        669373, 628317, 656427, 663554, 681857,
                        663776, 672282, 681217, 542881, 656288,
                        622072, 621112, 676664, 548389, 671212,
                        664285, 664299, 686613, 641585, 669854,
                        622491, 669923, 669302, 682243, 676106,
                        543135, 592351, 571760, 641540, 674003,
                        608331, 693821, 450203, 519242, 625643,
                        500779, 622663, 640455, 605288, 676130,
                        554430, 605400, 624133, 650911, 605513,
                        666200, 665795, 677960, 669432, 664350,
                        680686, 669022, 571578, 663623, 592866,
                        543243, 571945, 458681, 502043, 571927,
                        684007, 696136, 592791, 665871, 676962,
                        593423, 668881, 668933, 671096, 666157,
                        656605, 527048, 683003, 663559, 594835,
                        642547, 669084, 607067, 596001, 605452,
                        808967, 607192, 676272, 572020, 642232,
                        605397, 656302, 650633, 663362, 681190,
                        668678, 518876, 656756, 694297, 663531,
                        657277, 605483, 690986, 663855, 666808,
                        607536, 615698, 596295, 663372, 641712                   
        ];

    const [pitchersData, setPitchersData] = useState([]);

    function getSPFromApi() {
        const promises = pitcherIds.map((pitcherId) => {
          const url = `https://statsapi.mlb.com/api/v1/people/${pitcherId}?hydrate=stats(group=[pitching],type=[byDateRange],startDate=01/01/2024,endDate=10/01/2024,season=2024)`;
          return fetch(url)
            .then((response) => response.json());
        });
    
        //handles multiple operations simultaneously
        Promise.all(promises)
          .then((data) => {
            setPitchersData(data);
          })
          .catch((error) => {
            console.error(error);
          });
    }


useEffect(() => {
    getSPFromApi();
  }, []);

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
          {pitchersData.map((pitcherData, index) => {
            const playerstat = pitcherData.people[0].stats[0].splits[0].stat;
            const playerName = pitcherData.people[0].fullName;
            const teamName = pitcherData.people[0].stats[0].splits[1].team.name;

            return (
              <tr key={index}>
                <td>{playerName}</td>
                <td>{teamName}</td>
                <td>{playerstat.gamesStarted}</td>
                <td>{playerstat.wins}</td>
                <td>{playerstat.losses}</td>
                <td>{playerstat.era}</td>
                <td>{playerstat.avg}</td>
                <td>{playerstat.obp}</td>
                <td>{playerstat.slg}</td>
                <td>{playerstat.ops}</td>
                <td>{playerstat.whip}</td>
                <td>{playerstat.strikePercentage}</td>
                <td>{playerstat.strikeoutWalkRatio}</td>
                <td>{playerstat.walksPer9Inn}</td>
                <td>{playerstat.homeRunsPer9}</td>
                <td>{playerstat.strikeoutsPer9Inn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Sp;