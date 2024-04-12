import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = {
  innerDiv: {
    width: "100px",
    height: "100px",
    border: "1px solid #fff",
    borderRadius: "3px",
    margin: "2px",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

let data = ["", "", "", "", "", "", "", "", ""];

function TicTocToe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const notify = (winner) =>
    toast.success(
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        Congratulation{" "}
        {winner === "X" ? (
          <ClearIcon style={{ color: "yellow", fontSize: "34px" }} />
        ) : (
          <CircleOutlinedIcon style={{ color: "blue", fontSize: "34px" }} />
        )}{" "}
        is Win
      </div>,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  const setIcon = (index) => {
    if (!lock) {
      if (data[index] !== "") {
        return;
      }
      const newData = [...data];
      newData[index] = count % 2 === 0 ? "X" : "O";
      data = newData;
      setCount(count + 1);
      winLogic();
    }
  };
  useEffect(() => {
    noOneWin();
  }, [count, lock]);

  const noOneWin = () => {
    if (count === 9 && lock) {
      setTimeout(() => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
      }, 1000);
    }
    if (count === 9 && !lock) {
      setTimeout(() => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
      }, 1000);
      toast.warn("It's drow, Play again", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const getIconJSX = (value) => {
    if (value === "X") {
      return <ClearIcon style={{ color: "Yellow", fontSize: "70px" }} />;
    } else if (value === "O") {
      return <CircleOutlinedIcon style={{ color: "blue", fontSize: "70px" }} />;
    }
    return null;
  };

  const winLogic = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };
  const won = (winner) => {
    setLock(true);
    notify(winner);
  };

  const success = () => {
    if (lock === true) {
      return <Confetti width={window.innerWidth} height={window.innerHeight} />;
    }
    return null;
  };
  const resetAll = () => {
    setTimeout(() => {
      setLock(false);
      data = ["", "", "", "", "", "", "", "", ""];
      setCount(0);
    }, 5000);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#000",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            backgroundImage:
              "linear-gradient(rgb(0 64 255) 18%, rgb(255 255 0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontSize: "40px",
          }}
        >
          Tic Tac Toe Game
        </h1>
        <div
          style={{
            padding: "5px",
            border: "1px solid #fff",
            borderRadius: "3px",
            backgroundColor: "rgb(113 113 113)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                style={styles.innerDiv}
                onClick={() => setIcon(item)}
              >
                {getIconJSX(data[item])}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[3, 4, 5].map((item) => (
              <div
                key={item}
                style={styles.innerDiv}
                onClick={() => setIcon(item)}
              >
                {getIconJSX(data[item])}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[6, 7, 8].map((item) => (
              <div
                key={item}
                style={styles.innerDiv}
                onClick={() => setIcon(item)}
              >
                {getIconJSX(data[item])}
              </div>
            ))}
          </div>
          {success()}
          <ToastContainer />
          {lock && resetAll()}
        </div>
      </div>
    </>
  );
}

export default TicTocToe;
