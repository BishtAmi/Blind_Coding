"use client";
// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
export default function QuestionForm() {
  const [qid, setQid] = useState(1); // qid as number
  const [question, setQuestion] = useState(""); // question as string
  const [input, setInput] = useState(""); // input as string
  const [output, setOutput] = useState(""); // output as string

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "qid":
        setQid(Number(value));
        break;
      case "question":
        setQuestion(value);
        break;
      case "input":
        setInput(value);
        break;
      case "output":
        setOutput(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      qid: qid,
      question: question,
      input: input,
      output: output,
    };

    try {
      const response = await axios.post("/api/randomQ", formData);
      console.log("Form submitted:", response.data);
      // Handle success, reset the form, show success message, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h3>Question form</h3>
      <h2>qid 1- C++ , 2-Java , 3-python , 4-other</h2>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>QID:</label>
            <input
              type="number"
              name="qid"
              value={qid}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Question:</label>
            <textarea
              name="question"
              value={question}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Input:</label>
            <textarea name="input" value={input} onChange={handleChange} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Output:</label>
            <textarea name="output" value={output} onChange={handleChange} />
          </div>
          <button
            type="submit"
            className="w-auto bg-gray-800 text-white rounded-md px-4 py-2"
            style={{ width: "50%" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
