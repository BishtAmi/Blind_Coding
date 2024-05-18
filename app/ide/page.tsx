"use client";
// import { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../navbar/page";
export default function QuestionForm() {
  // const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const user = params.get("username");
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(user);
  }, [id]);

  const [startTime, setStart] = useState(new Date());
  const [endTime, setEnd] = useState(new Date());
  const [language, setLanguage] = useState(""); // language as number
  const [question, setQuestion] = useState(""); // question as string
  const [code, setCode] = useState(""); // code as string
  const [status, setStatus] = useState(1);
  const [err, setErr] = useState("");
  //   const [output, setOutput] = useState(""); // output as string
  const [data, setData] = useState("");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "language":
        setLanguage(value);
        break;
      case "question":
        setQuestion(value);
        break;
      case "code":
        setCode(value);
        break;
      //   case "output":
      //     setOutput(value);
      //     break;
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
      // console.log("endtime:", endTime);
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
    // let en = ;
    // console.log("start time here:", en);
    // setStart(new Date());
    const value = event.target.value;
    setLanguage(value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      language: language,
      question: question,
      code: code,
      //   output: output,
    };

    try {
      console.log("form data:", formData);
      const response = await axios.post("/api/judge", formData);
      console.log("response:", response);
      setStatus(response.data.status);
      if (!status) setErr(response.data.error.stderr);
      else {
        setData(response.data.output);
        //let en = ;
        //console.log("start time here:", en);
        setEnd(new Date());
        // const end = new Date(en);
        //setEnd(en);
        console.log("id", id);
        // const question = await axios.get(`/api/output/${id}`);
        // const output = question.data.randomQuestion.output;
        // console.log("output", output.length);
        // console.log("data", response.data.output.length);
        // console.log("check", output === data);
        // if (output === response.data.output) {
        //   console.log("saved");
        // }
        handelSubmitLeader();
      }
      // Handle success, reset the form, show success message, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <Navbar />
      <><h3>Code Editor</h3></>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              // textAlign: "center",
              marginBottom: "5px",
              fontSize: "17px",
            }}
          >
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
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            {/* <label>QID:</label> */}
            <select
              onChange={handelSelect}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value={"cpp"}>Select Language:</option>
              <option value={"cpp"}>C++</option>
              {/* <option value={"cpp"}>Java</option> */}
              <option value={"py"}>python</option>
              {/* <option value={2}>Others</option> */}
            </select>
          </div>
          {/* <div style={{ marginBottom: "1rem" }}>
            <label>Question:</label>
            <textarea
              name="question"
              value={question}
              onChange={handleChange}
            />
          </div> */}
          <div style={{ marginBottom: "1rem" }}>
            {/* <label>Code:</label> */}
            <textarea
              className="textarea"
              name="code"
              value={code}
              onChange={handleChange}
              placeholder="Write your code here"
            />
          </div>
          {/* <div style={{ marginBottom: "1rem" }}>
            <label>Output:</label>
            <textarea name="output" value={output} onChange={handleChange} />
          </div> */}
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
  );
}
