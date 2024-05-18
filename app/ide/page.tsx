"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../navbar/page";
import { Suspense } from "react";

export default function QuestionForm() {
  const params = useSearchParams();
  const id = params.get("id");
  const user = params.get("username");

  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(user ?? ""); // Provide a fallback value if user is null
  }, [id, user]); // Include user in the dependency array to update username when it changes

  const [startTime, setStart] = useState(new Date());
  const [endTime, setEnd] = useState(new Date());
  const [language, setLanguage] = useState(""); // language as number
  const [question, setQuestion] = useState(""); // question as string
  const [code, setCode] = useState(""); // code as string
  const [status, setStatus] = useState(1);
  const [err, setErr] = useState("");
  const [data, setData] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "language":
        setLanguage(value);
        break;
      case "code":
        setCode(value);
        break;
      default:
        break;
    }
  };

  const handelSubmitLeader = async () => {
    try {
      console.log("start", startTime);
      console.log("end", endTime);
      const diff = endTime.getTime() - startTime.getTime();
      console.log("difference frontend:", diff);
      const res = await axios.post("/api/leaderboard", {
        username,
        diff,
      });
      console.log("leaderboard:", res);
    } catch (error) {
      console.log("leaderboard error:", error);
    }
  };

  const handelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLanguage(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      language: language,
      question: question,
      code: code,
    };

    try {
      console.log("form data:", formData);
      const response = await axios.post("/api/judge", formData);
      console.log("response:", response);
      setStatus(response.data.status);
      if (!status) setErr(response.data.error.stderr);
      else {
        setData(response.data.output);
        setEnd(new Date());
        console.log("id", id);
        handelSubmitLeader();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Suspense>
      <div>
        <Navbar />
        <h3>Code Editor</h3>
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "5px", fontSize: "17px" }}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={username}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                onChange={(e) => setUsername(e.target.value)} // Allow updating the username
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <select
                onChange={handelSelect}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select Language:</option>
                <option value="cpp">C++</option>
                <option value="py">Python</option>
              </select>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <textarea
                className="textarea"
                name="code"
                value={code}
                onChange={handleChange}
                placeholder="Write your code here"
              />
            </div>
            <button
              type="submit"
              className="w-auto bg-gray-800 text-white rounded-md px-4 py-2"
              style={{ width: "50%" }}
            >
              Submit
            </button>
            <div>
              <b className="font-semibold">
                {status ? <p>Output:</p> : <p>Error:</p>}
              </b>
              {status ? data : err}
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
