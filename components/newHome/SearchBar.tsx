import { brandColors, uiBreakpoint, urlPathsEn } from "../../utils/helpers";
import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Sector } from "@prisma/client";

type Props = {
  isOnHomePage: boolean;
  searchFunction: (
    processedMonthlySalary: number,
    processedLoanAmount: number,
    processedJobSector: string,
    processedDuration: number,
    processedUseMaxLoan: boolean
  ) => Promise<void> | null;

  monthlySalary: number;
  useMaxLoan: boolean;
  loanAmount: number;
  jobSector: string;
  duration: number;
};

const ContentContainerDiv = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  padding: 0 12px;
`;

const SearchBarDiv = styled.div`
  width: 100%;
  background-color: ${brandColors.white};
  border-radius: 10px;

  box-shadow: 0px 0px 12px 5px ${brandColors.black}12;
  padding: 24px;
  z-index: 991;
  position: relative;
`;

const InputGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  // gap: 6px;
  height: 100%;

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    grid-template-columns: 1fr;
  }
`;

const InputDiv = styled.div<{ selected: boolean }>`
  height: 100%;
  background-color: ${(props) =>
    props.selected ? brandColors.captionBlack + "32" : brandColors.transparent};
  border-radius: 5px;
  padding: 8px 24px;
  display: grid;
  /* align-content: center; */

  gap: 6px;
`;

const InputHeadline = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${brandColors.black}80;
`;

const TextInput = styled.input`
  all: unset;
  width: 100%;

  font-size: 1rem;
  font-weight: 500;
  color: ${brandColors.black};

  border: none;
  padding-bottom: 6px;
  border-bottom: 2px solid ${brandColors.black}25;

  &:focus {
    border-bottom: 2px solid ${brandColors.black};
  }

  &:disabled {
    color: ${brandColors.captionBlack};
  }
`;

const JobSectorSelect = styled.select`
  // Removes all styles except for the down arrow
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;

  cursor: pointer;

  font-size: 1rem;
  font-weight: 500;
  color: ${brandColors.black};
  width: 180px;
`;

const DurationRangeInput = styled.input`
  appearance: none;
  cursor: pointer;
  background-color: ${brandColors.transparent};
  width: 100%;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    border-radius: 2.5px;

    background: linear-gradient(
      90deg,
      ${brandColors.purple} 0%,
      ${brandColors.lighterPurple} 100%
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    border: 2px solid ${brandColors.white};
    background-color: ${brandColors.purple};
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -5px;
  }
`;

const SearchButton = styled.button`
  all: unset;
  cursor: pointer;
  color: ${brandColors.white};
  //     background-color: ${brandColors.purple};
  background: linear-gradient(
    90deg,
    ${brandColors.purple} 0%,
    ${brandColors.lighterPurple} 100%
  );

  padding: 10px;
  border-radius: 5px;
  text-align: center;

  &:hover:enabled {
    background: none;
    color: ${brandColors.black};
    outline: 3px solid ${brandColors.purple};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

const CheckBoxInput = styled.input`
  cursor: pointer;

  &:checked {
    accent-color: ${brandColors.purple};
  }
`;

function SearchBar(props: Props) {
  const [monthlySalary, setMonthlySalary] = React.useState(
    props.monthlySalary ? props.monthlySalary.toString() : "8500"
  );
  const [monthlySalaryFocused, setMonthlySalaryFocused] = React.useState(false);
  const [isEditingMonthlySalary, setIsEditingMonthlySalary] =
    React.useState(false);
  const monthlySalaryInputRef = useRef<HTMLInputElement>(null);

  const [useMaxLoan, setUseMaxLoan] = React.useState(props.useMaxLoan ?? false);
  const [loanAmount, setLoanAmount] = React.useState(
    props.loanAmount ? props.loanAmount.toString() : "100000"
  );
  const [loanAmountFocused, setLoanAmountFocused] = React.useState(false);
  const [isEditingLoanAmount, setIsEditingLoanAmount] = React.useState(false);
  const loanAmountInputRef = useRef<HTMLInputElement>(null);
  const loanAmountHandleInputClick = () => {
    if (loanAmountInputRef.current) {
      loanAmountInputRef.current.setSelectionRange(
        loanAmountInputRef.current.value.lastIndexOf("SAR") - 1,
        loanAmountInputRef.current.value.lastIndexOf("SAR") - 1
      );
    }
  };

  const [jobSector, setJobSector] = React.useState(
    props.jobSector ? props.jobSector : "Government"
  );
  const [jobSectorFocused, setJobSectorFocused] = React.useState(false);

  const [duration, setDuration] = React.useState(
    props.duration ? props.duration : 5
  );
  const [durationFocused, setDurationFocused] = React.useState(false);

  const enableSearchButton =
    Number(monthlySalary) > 0 && Number(loanAmount) > 0;

  return (
    <ContentContainerDiv>
      <SearchBarDiv
        data-aos={props.isOnHomePage ? "fade-up" : ""}
        data-aos-delay={props.isOnHomePage ? "300" : ""}
      >
        <InputGridDiv>
          <InputDiv selected={monthlySalaryFocused}>
            <InputHeadline>Monthly salary</InputHeadline>
            {isEditingMonthlySalary ? (
              <div style={{ display: "flex", width: "100%" }}>
                <TextInput
                  ref={monthlySalaryInputRef}
                  placeholder="Salary"
                  onBlur={() => {
                    setMonthlySalaryFocused(false);
                    setIsEditingMonthlySalary(false);
                  }}
                  value={`${monthlySalary ? Number(monthlySalary) : ""}`}
                  onChange={(event) => {
                    const regex = /^[0-9]+$/;
                    const value = event.target.value;

                    const modValue = value
                      .replace("SAR", "")
                      .replaceAll(" ", "");
                    if (modValue === "" || regex.test(modValue)) {
                      setMonthlySalary(
                        Number(modValue) > 90000
                          ? Number(90000).toString()
                          : modValue
                      );
                    }
                  }}
                  style={{ width: "120px" }}
                />
                <div style={{ marginLeft: "-32px" }}>
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>SAR</p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", width: "100%" }}>
                <TextInput
                  ref={monthlySalaryInputRef}
                  placeholder="Salary"
                  onFocus={() => {
                    setMonthlySalaryFocused(true);
                    setIsEditingMonthlySalary(true);
                  }}
                  value={`${
                    monthlySalary
                      ? Number(monthlySalary).toLocaleString(undefined)
                      : ""
                  }`}
                  style={{ width: "120px" }}
                />
                <div style={{ marginLeft: "-32px" }}>
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>SAR</p>
                </div>
              </div>
            )}
          </InputDiv>

          <InputDiv selected={loanAmountFocused}>
            <InputHeadline>Loan amount</InputHeadline>
            {isEditingLoanAmount ? (
              <div style={{ display: "flex" }}>
                <TextInput
                  ref={loanAmountInputRef}
                  placeholder="Loan amount"
                  onBlur={() => {
                    setLoanAmountFocused(false);
                    setIsEditingLoanAmount(false);
                  }}
                  value={`${loanAmount ? Number(loanAmount) : ""}`}
                  onChange={(event) => {
                    const regex = /^[0-9]+$/;
                    const value = event.target.value;

                    const modValue = value
                      .replace("SAR", "")
                      .replaceAll(" ", "");
                    if (modValue === "" || regex.test(modValue)) {
                      setLoanAmount(
                        Number(modValue) > 1000000
                          ? Number(1000000).toString()
                          : modValue
                      );
                    }
                  }}
                  onClick={loanAmountHandleInputClick}
                  style={{ paddingRight: "55px", width: "120px" }}
                />
                <div
                  style={{
                    marginLeft: "-89px",
                    paddingBottom: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onClick={() => setUseMaxLoan(!useMaxLoan)}
                >
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>SAR</p>
                  <CheckBoxInput type="checkbox" checked={useMaxLoan} />
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>max</p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", width: "100%" }}>
                <TextInput
                  ref={loanAmountInputRef}
                  placeholder="Loan amount"
                  onFocus={() => {
                    setLoanAmountFocused(true);
                    setIsEditingLoanAmount(true);
                  }}
                  value={`${
                    loanAmount
                      ? Number(loanAmount).toLocaleString(undefined)
                      : ""
                  }`}
                  style={{ paddingRight: "55px", width: "120px" }}
                  disabled={useMaxLoan}
                />
                <div
                  style={{
                    marginLeft: "-89px",
                    paddingBottom: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onClick={() => setUseMaxLoan(!useMaxLoan)}
                >
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>SAR</p>
                  <CheckBoxInput type="checkbox" checked={useMaxLoan} />
                  <p style={{ fontSize: "1rem", fontWeight: "400" }}>max</p>
                </div>
              </div>
            )}
          </InputDiv>

          <InputDiv selected={jobSectorFocused}>
            <InputHeadline>Job sector</InputHeadline>
            <JobSectorSelect
              onFocus={() => setJobSectorFocused(true)}
              onBlur={() => setJobSectorFocused(false)}
              onChange={(event) => {
                const value = event.target.value;
                setJobSector(value);
              }}
              defaultValue={jobSector}
            >
              <option key={0} value="Government">
                Government
              </option>
              <option key={1} value="Semi-government">
                Semi-government
              </option>
              <option key={2} value="Private">
                Private
              </option>
              <option key={3} value="Military">
                Military
              </option>
            </JobSectorSelect>
          </InputDiv>

          <InputDiv selected={durationFocused}>
            <InputHeadline>Duration (yrs)</InputHeadline>
            <div style={{ display: "flex" }}>
              <DurationRangeInput
                type="range"
                min={1}
                max={5}
                step={1}
                defaultValue={duration}
                onFocus={() => setDurationFocused(true)}
                onBlur={() => setDurationFocused(false)}
                onChange={(event) => {
                  const value = event.target.value;
                  setDuration(Number(value));
                }}
              />
              <p style={{ marginLeft: "6px", marginTop: "3px" }}>{duration}</p>
            </div>
          </InputDiv>

          <InputDiv selected={false}>
            {props.isOnHomePage && !props.searchFunction ? (
              <Link
                href={{
                  pathname: urlPathsEn.compare,
                  query: {
                    loanAmount: Number(loanAmount),
                    monthlySalary: Number(monthlySalary),
                    salaryGroup: jobSector,
                    useMaxLoan: useMaxLoan,
                    jobSector: jobSector,
                    duration: duration,
                  },
                }}
              >
                <SearchButton disabled={!enableSearchButton}>
                  Search
                </SearchButton>
              </Link>
            ) : (
              <SearchButton
                disabled={!enableSearchButton}
                onClick={() => {
                  props.searchFunction(
                    Number(monthlySalary),
                    Number(loanAmount),
                    jobSector,
                    Number(duration),
                    useMaxLoan
                  );
                }}
              >
                Search
              </SearchButton>
            )}
          </InputDiv>
        </InputGridDiv>
      </SearchBarDiv>
    </ContentContainerDiv>
  );
}

export default SearchBar;
