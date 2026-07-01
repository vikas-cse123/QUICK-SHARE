import { useEffect, useState } from "react";
import { GoogleLoginButton } from "./features/auth/components/GoogleLoginButton";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
const notify = (data) => toast.error(data);

const selectInputsData = [
  {
    kind: "select",
    label: "Category",
    options: [
      "None",
      "Cryptocurrency",
      "Cybersecurity",
      "Fixit",
      "Food",
      "Gaming",
      "Haiku",
      "Help",
      "History",
      "Housing",
      "Jokes",
      "Legal",
      "Money",
      "Movies",
      "Music",
      "Pets",
      "Photo",
      "Science",
      "Software",
      "Source Code",
      "Spirit",
      "Sports",
      "Travel",
      "TV",
      "Writing",
    ],
  },
  {
    kind: "select",
    label: "Paste Expiration",
    options: [
      "Never",
      "1 min",
      "2 min",
      "5 min",
      "10 min",
      "1 Hour",
      "1 Day",
      "1 Week",
      "2 Week",
      "1 Month",
      "6 month",
      "1 Year",
    ],
  },
  {
    kind: "select",
    label: "Paste Exposure",
    options: ["Public", "Unlisted"],
  },
  {
    kind: "input",
    type: "password",
    label: "Password",
  },
  {
    kind: "input",
    type: "input",
    label: "Paste Name / Title",
  },
];



const createNotePage = () => {
  console.log("Rendering app component");
  const [content, setContent] = useState("A");
  const [user, setUser] = useState();
  const [windowSize, setWindowSize] = useState({
    height: "600px",
    width: "600px",
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("a");
      setWindowSize({
        height: window.innerHeight * 0.6,
        width: window.innerWidth * 0.6,
      });
    });
  }, []);
const handleChange = (e) => {
  setContent(e.target.value);
};
  const createNote = async() => {
    console.log("Running create note fn");
    if (!content || content.length === 0) {
      return notify("You cannot create an empty paste.");
    }

    console.log(result);
    if(result.success){
      console.log(result.data.id);
    }
  };

  return (
    // <GoogleLoginButton/>
    <>
      <Toaster />
      <textarea
        onChange={handleChange}
        className="new-paste-container"
        value={content}
        style={{ height: windowSize.height, width: windowSize.width }}
      ></textarea>
      <div className="paste-settings-container">
        <h2>Optional Paste Settings</h2>
        {selectInputsData.map((data, i) => {
          return (
            <div key={i}>
              <label htmlFor="">{data.label}:</label>
              {data.kind === "select" ? (
                <select name="" id="">
                  {data.options.map((option, i) => {
                    return <option key={i}>{option}</option>;
                  })}
                </select>
              ) : (
                <input type={data.type} name="" id="" />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={createNote}>Create New Paste</button>
      </div>
    </>
  );
};

export default createNotePage;


