"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
export default function Home() {
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);
  const [data, setData] = useState("");
  const [starTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [qid, setqid] = useState(1);
  const handleReadyClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReady(true);
    const st = new Date();
    setStart(st.toISOString());
    RandomQuestiongenrator(qid);
  };
  const handelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value; // Convert the string to a number
    setqid(value);
  };
  const RandomQuestiongenrator = async (qid) => {
    try {
      console.log("qid from client:", qid);
      const question = await axios.get(`/api/randomQ/${qid}`);
      console.log("qid from server:", question.data.randomQuestion.qid);
      setData(question.data.randomQuestion);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handelSubmit = async () => {
    try {
      const en = new Date();
      setEnd(en.toISOString());
      console.log(endTime);
      const res = await axios.post("/api/leaderboard", {
        username,
        starTime,
        endTime,
      });
      console.log(res);
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
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
        </div>
      )}
      {!ready && (
        <div
          style={{ textAlign: "center", marginTop: "10px", marginRight: "5px" }}
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
            {/* <label htmlFor="language">Preferred Language:</label> */}
            <select
              onChange={handelSelect}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value={1}>Select Language:</option>
              <option value={1}>C++</option>
              <option value={2}>Java</option>
              <option value={3}>python</option>
              <option value={4}>Rust</option>
            </select>
          </div>
          <button
            onClick={handleReadyClick}
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
      )}

      {ready && (
        <div className="h-screen flex items-center justify-center bg-black text-white">
          <div className="problemSection overflow-x-hidden rounded p-5 md:w-5/12 mt-3 ml-1 overflow-scroll">
            <div className="flex items-center justify-between sticky top-0 bg-black pt-3">
              <p className="font-bold">Problem Statement</p>
              <div className="flex">
                <p className="text-green-400 m-3">Easy</p>
                <p className="text-white pr-5 pl-1 font-bold"></p>
              </div>
            </div>
            {data && data.question ? (
              <p className="description pb-12">{data.question}</p>
            ) : (
              <p className="description pb-12">Loading...</p>
            )}

            <p className="mb-3 font-bold">Example:</p>
            <div className="rounded-lg text-sm p-6 bg-neutral-800">
              <p>
                <b className="font-semibold">Input: </b>
                {data && data.input ? data.input : <p>Loading...</p>}
              </p>
            </div>
            <br></br>
            <div className="rounded-lg text-sm p-6 bg-neutral-800">
              <p>
                <b className="font-semibold">Output: </b>
                {data && data.output ? data.output : <p>Loading...</p>}
              </p>
            </div>
            <br></br>
            <button className="submitBtn" onClick={handelSubmit}>
              submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
