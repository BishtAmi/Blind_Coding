"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../navbar/page";
import Image from "next/image";
import axios from "axios";

const CodeArena = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [qid, setQid] = useState(1);

  const handleReadyClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === "") {
      setError("Username is required");
      return;
    }
    setError("");
    setReady(true);
    const st = new Date();
    setStart(st.toISOString());
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;
    setQid(value);
  };

  const handleProblem = () => {
    const us = username;
    const id = qid;
    router.push(`/problems?username=${us}&qid=${id}`);
  };

  return (
    <>
      <Navbar />
      {!ready && (
        <div
          style={{ textAlign: "center", marginTop: "200px", fontSize: "17px" }}
        >
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
      {!ready && (
        <form onSubmit={handleReadyClick}>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginRight: "5px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "20px",
                marginBottom: "10px",
                borderColor: "black",
              }}
            >
              <select
                onChange={handleSelect}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value={1}>Select Language:</option>
                <option value={1}>C++</option>
                <option value={1}>Java</option>
                <option value={2}>Python</option>
                <option value={2}>Others</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Are you ready?
            </button>
          </div>
        </form>
      )}
      {ready && handleProblem()}
    </>
  );
};

export default CodeArena;
