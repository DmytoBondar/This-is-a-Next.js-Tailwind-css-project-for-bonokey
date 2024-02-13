import React, { ReactEventHandler, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import styles from "../../styles/ChatPanel.module.scss";
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
  width: 316px;
`;

const Ask = styled.h2`
  margin-bottom: 20px;
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
          {question}
        </Answer>
      ))}
    </QuestionContainer>
  );
};

const AskedQuestion = (props) => (
  <QuestionContainer>
    <Answer className={styles.selectedStyle}>{props.question}</Answer>
  </QuestionContainer>
);

const HelpWayQuestion = (props) => (
  <QuestionContainer>
    <Ask style={{ marginBottom: "20px" }}>Hi, How can I help you?</Ask>
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
      Should I proceed with this loan?
    </Answer>
    <AnswerInput
      onKeyUp={(e) => {
        if (e.key == "Enter" && e.keyCode == 13) {
          // @ts-ignore
          props.currentStep == 1 &&
            // @ts-ignore
            (props.setCurrentStep(2), props.setValue(e.target?.value || ""));
        }
      }}
      className={
        props.value !== "" &&
        props.value !== "Should I proceed with this loan?" &&
        styles.selectedStyle
      }
      type="text"
      placeholder={"Or type your question here."}
      disabled={props.currentStep != 1}
    />
  </QuestionContainer>
);

const ExpenseRequestQuestion = (props) => (
  <QuestionContainer>
    <Ask>Can you please let us know more about your monthly expenses?</Ask>
    <Answer>Sure, I will upload my banks statements.</Answer>
    <Answer
      onClick={() => {
        if (typeof window !== "undefined") {
          const lean = (window as any).Lean;
          if (lean) {
            lean.connect({
              app_token: "6f9b5c3f-4cd0-424a-b4c5-ab1f855e9104",
              permissions: [
                "identity",
                "accounts",
                "balance",
                "transactions",
                "identities",
                "scheduled_payments",
                "standing_orders",
                "direct_debits",
                "beneficiaries",
              ],
              customer_id: "f366bdcf-a9c9-4edc-8b7e-d3107cbce93e",
              sandbox: true,
              fail_redirect_url: "https://bonokey.herokuapp.com/",
              success_redirect_url:
                "https://bonokey.herokuapp.com/lean-success",
            });
          }
        }
      }}
    >
      Yes, I can connect you with my bank.
    </Answer>
    <Answer
      onClick={() => {
        props.currentStep == 2 &&
          (props.setCurrentStep(3), props.setValue("fill"));
      }}
      className={props.value == "fill" && styles.selectedStyle}
    >
      I will fill in my expenses.
    </Answer>
  </QuestionContainer>
);

const ExpenseFillInQuestion = (props) => {
  const expenses = [
    { icon: faFileInvoiceDollar, text: "Bill", valueName: "bill" },
    { icon: faHome, text: "Rent", valueName: "rent" },
    { icon: faAppleWhole, text: "Food", valueName: "food" },
    { icon: faCar, text: "Car Insurance", valueName: "car_insurance" },
    { icon: faGasPump, text: "Fuel", valueName: "fuel" },
    { icon: faDumbbell, text: "Gym", valueName: "gym" },
    { icon: faFilm, text: "Entertainment", valueName: "entertainment" },
    { icon: faCommentDollar, text: "Other", valueName: "other" },
  ];

  return (
    <QuestionContainer>
      <Ask>
        Please fill in the following Monthly expenses, base on your best
        knowledge.
      </Ask>

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
          <div style={{ width: "400px" }}>
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
        Next question.
      </Answer>
    </QuestionContainer>
  );
};

const SalaryIncreaseQuestion = (props) => (
  <QuestionContainer>
    <Ask>Do you expect a salary raise/promotion next year?</Ask>
    <Answer
      onClick={() => {
        props.currentStep == 4 &&
          (props.setCurrentStep(5), props.setValue(true));
      }}
      className={props.value == true && styles.selectedStyle}
    >
      Yes
    </Answer>
    <Answer
      onClick={() => {
        props.currentStep == 4 &&
          (props.setCurrentStep(5), props.setValue(false));
      }}
      className={props.value == false && styles.selectedStyle}
    >
      No
    </Answer>
  </QuestionContainer>
);

const SalaryIncAmountQuestion = (props) => {
  const [error, setError] = React.useState(false);

  return (
    <QuestionContainer>
      <Ask>How much you expect to get increase?</Ask>
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
        {" "}
        500 SAR
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
        placeholder={"Or more."}
        style={{ width: "123px" }}
        disabled={props.inputType == "manual"}
      />
      {error && (
        <p style={{ color: "#883433", marginLeft: "20px", fontWeight: "800" }}>
          Would you mind inputting a value that is in the range of 100 and 3000?
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
    // "Should I proceed with this loan?",
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
    const prompt = `Please act as a financial advisor for personal loan.
        I need a loan amount of ${props.loanAmount} SAR.
        My salary is ${props.salaryAmount} SAR, the term will be ${props.durationYear} years, and annual percentage rate is ${props.apr}%.
        
        ${
          salaryIncrease
            ? "Each year my monthly salary increases by " + increaseAmount + "."
            : "I have no salary increasing."
        }
        
        My expense is like below.
        1. ${expenseData.bill} SAR/month for bill.
        2. ${expenseData.rent} SAR/month for rent.
        3. ${expenseData.food} SAR/month for food.
        4. ${expenseData.car_insurance} SAR/month for car insurance.
        5. ${expenseData.fuel} SAR/month for fuel.
        6. ${expenseData.gym} SAR/month for gym.
        7. ${expenseData.entertainment} SAR/month for entertainment.
        8. ${expenseData.other} SAR/month as extra.
        
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
            question={"Here how you life will be."}
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
        <div ref={RestQuestionsRef}>
          <ThreeDotsLoader />
        </div>
      )}
    </ChatPanelDiv>
  );
}

export default ChatPanel;
