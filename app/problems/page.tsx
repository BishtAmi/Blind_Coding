"use client";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-c_cpp";

// import "ace-builds/src-noconflict/theme-monokai";
// import { useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// export default function Problems(
//   username: String,
//   ready: boolean,
//   qid: BigInteger
// ) {
//   //const [ready, setReady] = useState(false);
//   const [data, setData] = useState<any>(null); // Initialize with null
//   const [starTime, setStart] = useState("");
//   const [endTime, setEnd] = useState("");
//   const handleReadyClick = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const st = new Date();
//     setStart(st.toISOString());
//     RandomQuestiongenrator(qid);
//   };
//   const code = "abkbakjd";
//   const setCode = "asadaad";
//   const RandomQuestiongenrator = async (qid: any) => {
//     try {
//       console.log("qid from client:", qid);
//       const question = await axios.get(`/api/randomQ/${qid}`);
//       console.log("qid from server:", question.data.randomQuestion.qid);
//       setData(question.data.randomQuestion);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const handelSubmit = async () => {
//     try {
//       const en = new Date();
//       setEnd(en.toISOString());
//       console.log(endTime);
//       const res = await axios.post("/api/leaderboard", {
//         username,
//         starTime,
//         endTime,
//       });
//       console.log(res);
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   return (
//     <div className="h-screen w-screen md:overflow-hidden bg-black absolute -z-10 text-white">
//       <div className="h-screen md:flex relative ">
//         <div className="problemSection overflow-x-hidden rounded h-3/4 p-5 md:w-5/12 mt-3 ml-1  overflow-scroll  ">
//           <div className=" flex items-center justify-between sticky -top-6 bg-black -pt-7 ">
//             {/* <div className="h-screen flex items-center justify-center bg-black text-white">
//       <div className="problemSection overflow-x-hidden rounded p-5 md:w-5/12 mt-3 ml-1 overflow-scroll">
//         <div className="flex items-center justify-between sticky top-0 bg-black pt-3"> */}
//             <p className="font-bold">Problem Statement</p>
//             <div className="flex">
//               <p className="text-green-400 m-3">Easy</p>
//               <p className="text-white pr-5 pl-1 font-bold"></p>
//             </div>
//           </div>
//           {data && data.question ? (
//             <p className="description pb-12">{data.question}</p>
//           ) : (
//             <p className="description pb-12">Loading...</p>
//           )}

//           <p className="mb-3 font-bold">Example:</p>
//           <div className="rounded-lg text-sm p-6 bg-neutral-800">
//             <p>
//               <b className="font-semibold">Input: </b>
//               {data && data.input ? data.input : <p>Loading...</p>}
//             </p>
//           </div>
//           <br></br>
//           <div className="rounded-lg text-sm p-6 bg-neutral-800">
//             <p>
//               <b className="font-semibold">Output: </b>
//               {data && data.output ? data.output : <p>Loading...</p>}
//             </p>
//           </div>
//           <br></br>
//           <div className="solutionSection relative rounded h-3/4 bg-black  md:w-7/12  md:m-6 outline-none overflow-hidden">
//             <div className="text-container mt-10 absolute h-3/4 w-full">
//               <AceEditor
//                 //   mode={selectedLanguage.toLowerCase()}
//                 theme="monokai"
//                 value={code}
//                 //onChange={setCode}
//                 fontSize={16}
//                 width="100%"
//                 height="100%"
//                 className="custom-ace-editor"
//                 editorProps={{ $blockScrolling: true }}
//               />
//             </div>
//           </div>
//           {/* <button className="submitBtn" onClick={handelSubmit}>
//               submit
//             </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-c_cpp";
// import "ace-builds/src-noconflict/theme-monokai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../navbar/page";

export default function Problems() {
  const params = useSearchParams();
  const router = useRouter();
  const username = params.get("username");
  const qid = params.get("qid");
  console.log("username", username);
  const [data, setData] = useState(null);
  const [starTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [id, setId] = useState();
  useEffect(() => {
    RandomQuestiongenrator(qid);
  }, [qid]);
  const handleReadyClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const st = new Date();
    setStart(st.toISOString());
    RandomQuestiongenrator(qid);
  };
  const RandomQuestiongenrator = async (qid) => {
    try {
      console.log("qid==>", qid);
      const question = await axios.get(`/api/randomQ/${qid}`);
      setData(question.data.randomQuestion);
      setId(question.data.randomQuestion.id);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handelSubmit = async () => {
    try {
      router.push(`/ide?id=${id}&&username=${username}`);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="problemSection overflow-x-hidden rounded p-5 md:w-5/12 mt-3 ml-1 overflow-scroll">
          <div className="flex items-center justify-between sticky top-0 bg-black pt-3">
            <div className="font-bold">Problem Statement</div>
            <div className="flex">
              <div className="text-green-400 m-3">Easy</div>
              <div className="text-white pr-5 pl-1 font-bold"></div>
            </div>
          </div>

          {data && data.question ? (
            <div className="description pb-12">{data.question}</div>
          ) : (
            <div className="description pb-12">Loading...</div>
          )}

          <div className="mb-3 font-bold">Example:</div>
          <div className="rounded-lg text-sm p-6 bg-neutral-800">
            <div>
              <div className="font-semibold">Input: </div>
              {data && data.input ? data.input : <p>Loading...</p>}
            </div>
          </div>
          <br></br>
          <div className="rounded-lg text-sm p-6 bg-neutral-800">
            <div>
              <div className="font-semibold">Output: </div>
              {data && data.output ? data.output : <p>Loading...</p>}
            </div>
          </div>
          <br></br>
          <button
            className="w-auto bg-gray-800 text-white rounded-md px-4 py-2"
            type="submit"
            style={{ width: "50%" }}
            onClick={handelSubmit}
          >
            Submit code
          </button>
        </div>
      </div>
    </>
  );
}
