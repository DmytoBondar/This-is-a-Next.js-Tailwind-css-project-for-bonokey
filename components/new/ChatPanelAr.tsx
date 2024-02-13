import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import styles from "../../styles/ChatPanelAr.module.scss";
import {
  faFileInvoiceDollar,
  faHome,
  faAppleWhole,
  faCar,
  faGasPump,
  faDumbbell,
  faFilm,
  faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThreeDotsLoader from "./ThreeDotsLoader";

export type expenseObjectType = {
  bill: number;
  rent: number;
  food: number;
  car_insurance: number;
  fuel: number;
  gym: number;
  entertainment: number;
  other: number;
};

type Props = {
  apr: string;
  loanAmount: string;
  salaryAmount: number;
  durationYear: number;
  expenseAutoFill: expenseObjectType;
  setExpenseAutoFill: Function;
};

const ChatPanelDiv = styled.div`
  margin: 50px;
`;

const Answer = styled.div`
  margin: 10px;
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  border-color: rgb(169, 173, 220);
  color: rgb(75 104 231);
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  display: table;
  margin-left: auto;
`;

const AnswerInput = styled.input`
  margin: 10px;
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  border-color: rgb(169, 173, 220);
  color: rgb(75 104 231);
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  display: table;
  width: 298px;
  margin-left: auto;
`;

const Ask = styled.h2`
  margin-bottom: 20px;
  text-align: right;
`;

const QuestionContainer = styled.div`
  margin-bottom: 60px;
`;

function CashInput(props) {
  const [inputType, setInputType] = React.useState("text");
  const [amount, setAmount] = React.useState(props.amount);
  const inputRef = useRef();

  return (
    <input
      type={inputType}
      ref={inputRef}
      value={inputType == "number" ? amount : amount.toString() + " SAR"}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(e.target.value == "" ? "0" : e.target.value)),
          props.setAmount(
            parseInt(e.target.value == "" ? "0" : e.target.value)
          );
      }}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        setInputType("text");
      }}
      onFocus={(e) => {
        setInputType("number");
      }}
      className={styles.inputBox}
      disabled={props.disabled}
    />
  );
}

const RestQuestions = (props) => {
  const arabQuestion = {
    "What is the suitable loan amount that I can repay better?":
      "ما هو مبلغ القرض المناسب الذي يمكنني سداده بشكل أفضل؟",
    "Calculate my DBR for the coming 5 years.":
      "احسب مقدرتي المالية على السداد(نسبة عبء الدين) الخاص بي للسنوات الخمس القادمة",
  };
  return (
    <QuestionContainer>
      {props.questions.map((question, key) => (
        <Answer
          key={key}
          onClick={() => {
            if (!props.loading) {
              props.setQuestion(question);
            }
          }}
          className={props.curQuestion == question && styles.selectedStyle}
        >
          {arabQuestion[question]}
        </Answer>
      ))}
    </QuestionContainer>
  );
};

const AskedQuestion = (props) => {
  const arabQuestion = {
    "What is the suitable loan amount that I can repay better?":
      "ما هو مبلغ القرض المناسب الذي يمكنني سداده بشكل أفضل؟",
    "Calculate my DBR for the coming 5 years.":
      "DBR احسب نسبة عبء الدين الخاص بي للسنوات الخمس القادمة",
  };
  return (
    <QuestionContainer>
      <Answer className={styles.selectedStyle}>
        {arabQuestion[props.question]}
      </Answer>
    </QuestionContainer>
  );
};

const HelpWayQuestion = (props) => (
  <QuestionContainer>
    <Ask style={{ marginBottom: "20px" }}>مرحبا، كيف أقدر أساعدك؟</Ask>
    <Answer
      onClick={() => {
        props.currentStep == 1 &&
          (props.setCurrentStep(2),
          props.setValue("Should I proceed with this loan?"));
      }}
      className={
        props.value == "Should I proceed with this loan?" &&
        styles.selectedStyle
      }
    >
      {" "}
      كيف راح يكون وضعي بعد ماخذ القرض؟
    </Answer>
    <AnswerInput
      onKeyUp={(e) => {
        if (e.key == "Enter" && e.keyCode == 13) {
          // @ts-ignore
          props.currentStep == 1 &&
            // @ts-ignore
            (props.setCurrentStep(2), props.setValue(e.target.value));
        }
      }}
      className={
        props.value !== "" &&
        props.value !== "Should I proceed with this loan?" &&
        styles.selectedStyle
      }
      type="text"
      placeholder={"شيئ آخر"}
      disabled={props.currentStep != 1}
    />
  </QuestionContainer>
);

const ExpenseRequestQuestion = (props) => {
  const [authData, setAuthData] = useState(null);
  const getToken = async () => {
    try {
      const res = await fetch("/api/getToken", {
        method: "POST",
      });
      const json = await res.json();
      setAuthData(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <QuestionContainer>
      <Ask>ادخل مصروفاتك الشهرية</Ask>
      <Answer>بالتأكيد، لدي كشف الحساب</Answer>
      <Answer
        onClick={async () => {
          try {
            const res = await fetch(`/api/createIntent`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: authData.accessToken }),
            });
            const json = await res.json();
            console.log(json);
            if (json.connectUrl) {
              window.open(json.connectUrl, "_blank");
            }
          } catch (error) {}
        }}
      >
        نعم، يمكنني الربط مباشرة مع البنك
      </Answer>
      <Answer
        onClick={() => {
          props.currentStep == 2 &&
            (props.setCurrentStep(3), props.setValue("fill"));
        }}
        className={props.value == "fill" && styles.selectedStyle}
      >
        لدي قائمة بالمصروفات
      </Answer>
    </QuestionContainer>
  );
};

const ExpenseFillInQuestion = (props) => {
  const expenses = [
    { icon: faFileInvoiceDollar, text: "الفواتير", valueName: "bill" },
    { icon: faHome, text: "الإيجار", valueName: "rent" },
    { icon: faAppleWhole, text: "الطعام", valueName: "food" },
    { icon: faCar, text: "تأمين السيارة", valueName: "car_insurance" },
    { icon: faGasPump, text: "الوقود", valueName: "fuel" },
    { icon: faDumbbell, text: "الصالة الرياضية", valueName: "gym" },
    { icon: faFilm, text: "الترفيه", valueName: "entertainment" },
    { icon: faCommentDollar, text: "أخرى", valueName: "other" },
  ];

  return (
    <QuestionContainer>
      <Ask>بشكل تقريبي، ماهي المصروفات وااللتزامات الشهرية لديك؟</Ask>

      {expenses.map((expense, index) => (
        <div key={index}>
          <div className={styles.inputRow}>
            <FontAwesomeIcon
              icon={expense.icon}
              style={{ marginRight: "15px", width: "30px" }}
            />{" "}
            {expense.text}{" "}
            <CashInput
              amount={props.value[expense.valueName]}
              setAmount={(val: number) => {
                let newValue = props.value;
                newValue[expense.valueName] = val;
                props.setValue(newValue);
              }}
              disabled={props.currentStep !== 3}
            ></CashInput>
          </div>
          <div style={{ width: "400px", marginLeft: "auto" }}>
            <hr />
          </div>
        </div>
      ))}

      <Answer
        onClick={() => {
          props.setCurrentStep(4);
          props.setExpenseAutoFill(props.value);
        }}
        className={props.currentStep > 3 && styles.selectedStyle}
      >
        السؤال التالي
      </Answer>
    </QuestionContainer>
  );
};

const SalaryIncreaseQuestion = (props) => (
  <QuestionContainer>
    <Ask>هل لديك زيادة سنوية في الراتب؟</Ask>
    <Answer
      onClick={() => {
        props.currentStep == 4 &&
          (props.setCurrentStep(5), props.setValue(true));
      }}
      className={props.value == true && styles.selectedStyle}
    >
      نعم
    </Answer>
    <Answer
      onClick={() => {
        props.currentStep == 4 &&
          (props.setCurrentStep(5), props.setValue(false));
      }}
      className={props.value == false && styles.selectedStyle}
    >
      لا
    </Answer>
  </QuestionContainer>
);

const SalaryIncAmountQuestion = (props) => {
  const [error, setError] = React.useState(false);

  return (
    <QuestionContainer>
      <Ask>ماهو مقدار الزيادة المتوقع (شهري)؟</Ask>
      <Answer
        onClick={() => {
          props.currentStep == 5 &&
            (props.setCurrentStep(6),
            props.setValue("500 SAR"),
            props.setInputType("fixed"));
        }}
        className={
          props.value == "500 SAR" &&
          props.inputType == "fixed" &&
          styles.selectedStyle
        }
      >
        500 SAR{" "}
      </Answer>
      <Answer
        onClick={() => {
          props.currentStep == 5 &&
            (props.setCurrentStep(6),
            props.setValue("1000 SAR"),
            props.setInputType("fixed"));
        }}
        className={
          props.value == "1000 SAR" &&
          props.inputType == "fixed" &&
          styles.selectedStyle
        }
      >
        1000 SAR
      </Answer>
      <Answer
        onClick={() => {
          props.currentStep == 5 &&
            (props.setCurrentStep(6),
            props.setValue("3000 SAR"),
            props.setInputType("fixed"));
        }}
        className={
          props.value == "3000 SAR" &&
          props.inputType == "fixed" &&
          styles.selectedStyle
        }
      >
        3000 SAR
      </Answer>

      <AnswerInput
        onKeyUp={(e) => {
          if (e.key == "Enter" && e.keyCode == 13) {
            // @ts-ignore
            if (Number(e.target.value) > 3000 || Number(e.target.value) < 100) {
              setError(true);
              return;
            }
            setError(false);
            // @ts-ignore
            e.target.type = "text";
            // @ts-ignore
            e.target.value = e.target.value + " SAR";
            // @ts-ignore
            props.currentStep == 5 &&
              (props.setCurrentStep(6),
              // @ts-ignore
              props.setValue(e.target.value),
              props.setInputType("manual"));
          }
        }}
        className={props.inputType == "manual" && styles.selectedStyle}
        type={props.inputType == "manual" ? "text" : "number"}
        placeholder={"أو اكتب هنا"}
        style={{ width: "123px" }}
        disabled={props.inputType == "manual"}
      />
      {error && (
        <p style={{ color: "#883433", marginLeft: "20px", fontWeight: "800" }}>
          الرجاء إدخال قيمة في حدود 100 و 3000؟
        </p>
      )}
    </QuestionContainer>
  );
};

const GPTAnswer = (props) => {
  return (
    <QuestionContainer>
      <Ask>{props.question}</Ask>
      {props.answer &&
        props.answer.split("\n").map((line, index) => (
          <p
            key={index}
            style={{
              color: "rgb(45, 155, 241)",
              lineHeight: "25px",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            {line.length == 0 ? <br /> : line}
          </p>
        ))}
    </QuestionContainer>
  );
};

function ChatPanel(props: Props) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [curQuestion, setCurQuestion] = React.useState("");
  const [selectedQuestion, setSelectedQuestion] = React.useState("");
  const [expenseRequest, setExpenseRequest] = React.useState("");
  const [expenseData, setExpenseData] = React.useState(props.expenseAutoFill);
  const [salaryIncrease, setSalaryIncrease] = React.useState(false);
  const [salaryIncreaseAmount, setSalaryIncreaseAmount] = React.useState("");
  const [showGPTAnswer, setShowGPTAnswer] = React.useState(false);
  const [loadingGPT, setLoadingGPT] = React.useState(false);
  const [restQuestions, setRestQuestions] = React.useState([
    // "هل يجب علي المضي قدما في هذا القرض؟",
    "What is the suitable loan amount that I can repay better?",
    "Calculate my DBR for the coming 5 years.",
  ]);
  const [askedQuestions, setAskedQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [inputType, setInputType] = React.useState("fixed");
  const [isMessageStreamming, setIsMessageStreamming] = React.useState(false);

  const ExpenseRequestRef = useRef(null);
  const ExpenseFillInRef = useRef(null);
  const SalaryIncreaseRef = useRef(null);
  const SalaryIncAmountRef = useRef(null);
  const ChatGPTAnswerRef = useRef(null);
  const RestQuestionsRef = useRef(null);

  const [questionStep, setQuestionStep] = React.useState(0);

  const makePrompt = async (question, increaseAmount) => {
    const prompt = `Please act as a financial advisor for personal loan and answer in arabic.
        I need a loan amount of ${props.loanAmount} SRA.
        My salary is ${props.salaryAmount} SRA, the term will be ${
      props.durationYear
    } years, and annual percentage rate is ${props.apr}%.
        
        ${
          salaryIncrease
            ? "Each year my monthly salary increases by " + increaseAmount + "."
            : "I have no salary increasing."
        }
        
        My expense is like below.
        1. ${expenseData.bill} SRA/month for bill.
        2. ${expenseData.rent} SRA/month for rent.
        3. ${expenseData.food} SRA/month for food.
        4. ${expenseData.car_insurance} SRA/month for car insurance.
        5. ${expenseData.fuel} SRA/month for fuel.
        6. ${expenseData.gym} SRA/month for gym.
        7. ${expenseData.entertainment} SRA/month for entertainment.
        8. ${expenseData.other} SRA/month as extra.
        
        `;

    console.log(expenseData);

    setSelectedQuestion(question);

    try {
      setShowGPTAnswer(true);
      setLoadingGPT(true);
      const response = await fetch("/api/getAdvice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt + "\n" + question,
        }),
      });
      if (!response.ok) {
        console.log("failed");
        throw (
          response.statusText ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = response.body;
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";
      setLoadingGPT(false);
      setAskedQuestions([...askedQuestions, question]);
      const lastAnswers = answers;
      setRestQuestions(restQuestions.filter((quest) => question != quest));
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        text += chunkValue;
        setAnswers([...lastAnswers, text]);
        setIsMessageStreamming(true);
      }
      setIsMessageStreamming(false);

      setQuestionStep(questionStep + 1);
      //Scroll to next question
      // const topOffset = RestQuestionsRef.current.offsetTop; // Subtract header height from top offset
      // window.scrollTo({ top: topOffset, behavior: "smooth" }); // Scroll to target div
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChatPanelDiv>
      {currentStep >= 1 && (
        <HelpWayQuestion
          currentStep={currentStep}
          setCurrentStep={(n: number) => {
            setCurrentStep(n);
            if (ExpenseRequestRef.current) {
              const topOffset = ExpenseRequestRef.current.offsetTop; // Subtract header height from top offset
              window.scrollTo({ top: topOffset, behavior: "smooth" }); // Scroll to target div
            }
          }}
          value={curQuestion}
          setValue={setCurQuestion}
        />
      )}
      <div ref={ExpenseRequestRef}>
        {" "}
        {currentStep >= 2 && (
          <ExpenseRequestQuestion
            currentStep={currentStep}
            setCurrentStep={(n: number) => {
              setCurrentStep(n);
              if (ExpenseFillInRef.current) {
                const topOffset = ExpenseFillInRef.current.offsetTop; // Subtract header height from top offset
                window.scrollTo({ top: topOffset, behavior: "smooth" }); // Scroll to target div
              }
            }}
            value={expenseRequest}
            setValue={setExpenseRequest}
          />
        )}
      </div>
      <div ref={ExpenseFillInRef}>
        {" "}
        {currentStep >= 3 && (
          <ExpenseFillInQuestion
            setExpenseAutoFill={props.setExpenseAutoFill}
            currentStep={currentStep}
            setCurrentStep={(n: number) => {
              setCurrentStep(n);
              if (SalaryIncreaseRef.current) {
                const topOffset = SalaryIncreaseRef.current.offsetTop; // Subtract header height from top offset
                window.scrollTo({ top: topOffset, behavior: "smooth" }); // Scroll to target div
              }
            }}
            value={expenseData}
            setValue={setExpenseData}
          />
        )}
      </div>
      <div ref={SalaryIncreaseRef}>
        {" "}
        {currentStep >= 4 && (
          <SalaryIncreaseQuestion
            currentStep={currentStep}
            setCurrentStep={(n: number) => {
              setCurrentStep(n);
              if (SalaryIncAmountRef.current) {
                const topOffset = SalaryIncAmountRef.current.offsetTop; // Subtract header height from top offset
                window.scrollTo({ top: topOffset, behavior: "smooth" }); // Scroll to target div
              }
            }}
            value={salaryIncrease}
            setValue={(val) => {
              setSalaryIncrease(val);
              if (val === false) {
                setSalaryIncreaseAmount("0");
                makePrompt(curQuestion, "");
              }
            }}
          />
        )}
      </div>
      <div ref={SalaryIncAmountRef}>
        {currentStep >= 5 && salaryIncrease === true && (
          <SalaryIncAmountQuestion
            inputType={inputType}
            setInputType={setInputType}
            currentStep={currentStep}
            setCurrentStep={(n: number) => {
              setCurrentStep(n);
              // if (ExpenseRequestRef.current) {
              //     const topOffset = ExpenseRequestRef.current.offsetTop; // Subtract header height from top offset
              //     window.scrollTo({ top: topOffset, behavior: 'smooth' }); // Scroll to target div
              // }
            }}
            value={salaryIncreaseAmount}
            setValue={(val) => {
              console.log(val),
                setSalaryIncreaseAmount(val),
                makePrompt(curQuestion, val);
            }}
          />
        )}
      </div>
      <div ref={ChatGPTAnswerRef}>
        {showGPTAnswer && (
          <GPTAnswer
            question={"سيكون وضعك بعد اخذ القرض كالتالي"}
            answer={answers[0]}
          />
        )}
      </div>

      {askedQuestions.map(
        (question, index) =>
          index > 0 && (
            <div>
              <AskedQuestion question={question} />
              <GPTAnswer question={""} answer={answers[index]} />
            </div>
          )
      )}
      {questionStep >= 1 && questionStep <= 3 && !isMessageStreamming && (
        <RestQuestions
          loading={loadingGPT}
          questions={restQuestions}
          setQuestion={(val) => {
            makePrompt(val, salaryIncreaseAmount);
          }}
          curQuestion={selectedQuestion}
        ></RestQuestions>
      )}
      {loadingGPT && (
        <div
          ref={RestQuestionsRef}
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <ThreeDotsLoader />
        </div>
      )}
    </ChatPanelDiv>
  );
}

export default ChatPanel;
