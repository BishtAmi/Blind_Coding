// pages/leaderboard.js
"use client";
// pages/leaderboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/page";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Time Difference</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.timeDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <style jsx>{`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th,
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }

          tbody tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        `}</style>
      </div>
    </>
  );
};

export default Leaderboard;
