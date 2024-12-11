import React, { useEffect, useState } from "react";
// import useSound from "use-sound";
// import play from "../sounds/src_sounds_play.mp3";
// import correct from "../sounds/src_sounds_correct.mp3";
// import wrong from "../sounds/src_sounds_wrong.mp3";

export default function Trivia({ data, setStop, queNum, setQueNum }) {
  const [que, setQue] = useState(null);
  const [selectedAns, setSelectedAns] = useState(null);
  const [className, setclassName] = useState("answer");
  // const [letsPlay] = useSound(play);
  // const [correctAns] = useSound(correct);
  // const [wrongAns] = useSound(wrong);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);

  useEffect(() => {
    setQue(data[queNum - 1]);
  }, [data, queNum]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer) => {
    setSelectedAns(answer);
    setclassName("answer active");
    delay(3000, () =>
      setclassName(answer?.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (answer?.correct) {
        // correctAns();
        delay(1000, () => {
          setQueNum((prevQueNum) => prevQueNum + 1);
          setSelectedAns(null);
        });
      } else {
        // wrongAns();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{que?.question}</div>
      <div className="answers">
        {que?.answers.map((answer, index) => (
          <div
            className={selectedAns === answer ? className : "answer"}
            key={index}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}
