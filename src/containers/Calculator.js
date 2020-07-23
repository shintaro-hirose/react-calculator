import React, {useState} from 'react';

import MyButton from '../components/MyButton';
import Display from '../components/Display';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Calculator(){
    const [firstNumber, setFirstNumber] = useState("0");
    const [secondNumber, setSecondNumber] = useState("0");
    const [operator, setOperator] = useState(false);
    const [isAllClear, setIsAllClear] = useState(true);
    const [isDicimalInput, setIsDicimalInput] = useState(false);
    const [isAnswerDisplay, setIsAnswerDisplay] = useState(false);

    const handleNumberClick = (num) => {
        if(isAnswerDisplay){
            setFirstNumber(num);
            setSecondNumber("0");
            setOperator(false);
            setIsAnswerDisplay(false);
            setIsDicimalInput(false);
        } else {
            if(!operator){
                if(isDicimalInput){
                    setFirstNumber(String(firstNumber) + String(num));
                } else {
                    setFirstNumber(String(Number(firstNumber)*10+num));
                }
                
            } else {
                if(isDicimalInput){
                    setSecondNumber(String(secondNumber) + String(num))
                } else {
                    setSecondNumber(String(Number(secondNumber)*10+num));
                }
            }
        }
        if(num !== 0){
            setIsAllClear(false);
        }
    }

    const handleDoubleZeroClick = () => {
        if(!operator){
            if(isDicimalInput){
                setFirstNumber(String(firstNumber) + "00")
            } else {
                setFirstNumber(String(Number(firstNumber)*100));
            }
        } else {
            if(isDicimalInput){
                setSecondNumber(String(secondNumber) + "00")
            } else {
                setSecondNumber(String(Number(secondNumber)*100));
            }
        }
    }

    const handleClearClick = () => {
        setIsDicimalInput(false);
        if(isAllClear){
            setFirstNumber("0");
            setOperator(false);
            setIsAnswerDisplay(false)
        } else {
            setIsAllClear(true);
            if(isAnswerDisplay){
                setFirstNumber("0")
            } else{
                if(!operator){
                    setFirstNumber("0");
                } else {
                    setSecondNumber("0");
                }
            }
        }
    }

    const handleMinusPlusClick = () => {
        if(isAnswerDisplay){
            setFirstNumber(-1 * Number(firstNumber));
        } else {
            if(!operator){
                setFirstNumber(-1 * Number(firstNumber));
            } else {
                setSecondNumber(-1 * Number(secondNumber));
            }
        }
        
    }

    const handlePercentageClick = () => {
        if(isAnswerDisplay){
            setFirstNumber(Number(firstNumber) * 0.01);
        } else {
            if(!operator){
                setFirstNumber(Number(firstNumber) * 0.01);
            } else {
                setSecondNumber(Number(secondNumber) * 0.01);
            }
        }
    }

    const handleOperatorClick = (a) => {
        if(isAnswerDisplay){
            setIsAnswerDisplay(false);
        } else {
            if(secondNumber !== "0"){
                if(operator === "add"){
                    setFirstNumber(Number(firstNumber) + Number(secondNumber));
                } else if(operator === "subtract"){
                    setFirstNumber(Number(firstNumber) - Number(secondNumber));
                } else if(operator === "divide"){
                    setFirstNumber(Number(firstNumber) / Number(secondNumber));
                } else if(operator === "multiply"){
                    setFirstNumber(Number(firstNumber) * Number(secondNumber));
                }
            }
        }
        setIsDicimalInput(false);
        setOperator(a);
        setSecondNumber("0");
    }

    const handleDicimalPointClick = () => {
        if(isDicimalInput) return;

        setIsDicimalInput(true);
        if(!operator){
            setFirstNumber(String(firstNumber) + '.');
        } else {
            setSecondNumber(String(secondNumber) + '.');
        }
    }

    const handleAnswerClick = () => {
        setIsDicimalInput(false);
        setIsAnswerDisplay(true);
        if(operator === "add") {
            if(secondNumber === "0"){
                setSecondNumber(firstNumber);
                setFirstNumber(Number(firstNumber) + Number(firstNumber));
            } else {
                setFirstNumber(Number(firstNumber) + Number(secondNumber));
            }
        } else if(operator === "subtract") {
            if(secondNumber === "0"){
                setSecondNumber(Number(firstNumber));
                setFirstNumber(Number(firstNumber) - Number(firstNumber));
            } else {
                setFirstNumber(Number(firstNumber) - Number(secondNumber));
            }
        } else if(operator === "divide") {
            if(secondNumber === "0"){
                setSecondNumber(Number(firstNumber));
                setFirstNumber(Number(firstNumber) / Number(firstNumber));
            } else {
                setFirstNumber(Number(firstNumber) / Number(secondNumber));
            }
        } else if(operator === "multiply"){
            if(secondNumber === "0"){
                setSecondNumber(Number(firstNumber));
                setFirstNumber(Number(firstNumber) * Number(firstNumber));
            } else {
                setFirstNumber(Number(firstNumber) * Number(secondNumber));
            }
        }
    }

    const fixDigits = (num) => {
        if((num) >= 10e8){
            return num.toExponential(2);
        } else {
            return Math.round(num*1000000)/1000000;
        }
        return 0;
    }
    const displayMarkup = (!isAnswerDisplay && operator ) ? fixDigits(Number(secondNumber)) : fixDigits(Number(firstNumber));
    const clearButtonMarkup = isAllClear ? "AC" : "C";

    return(
        <div>
            <Typography variant="h5">
                React Calculator
            </Typography>
            <Display>
                {displayMarkup}
            </Display>
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="center">
                    <MyButton backgroundColor="gray" onClick={handleClearClick}>
                        <Typography variant="h5">{clearButtonMarkup}</Typography>
                    </MyButton>
                    <MyButton backgroundColor="gray" onClick={handleMinusPlusClick}>
                        <Typography variant="h5">-/+</Typography>
                    </MyButton>
                    <MyButton backgroundColor="gray" onClick={handlePercentageClick}>
                        <Typography variant="h5">%</Typography>
                    </MyButton>
                    <MyButton backgroundColor="orange" onClick={() => handleOperatorClick("divide")}>
                        <Typography variant="h5" >÷</Typography>
                    </MyButton>
                </Box>
                <Box display="flex" justifyContent="center" >
                    <MyButton onClick={() => handleNumberClick(7)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">7</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(8)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">8</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(9)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">9</Typography>
                    </MyButton>
                    <MyButton backgroundColor="orange" onClick={() => handleOperatorClick("multiply")}>
                        <Typography variant="h5" >×</Typography>
                    </MyButton>
                </Box>
                <Box display="flex" justifyContent="center">
                    <MyButton onClick={() => handleNumberClick(4)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">4</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(5)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">5</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(6)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">6</Typography>
                    </MyButton>
                    <MyButton backgroundColor="orange" onClick={() => handleOperatorClick("subtract")}>
                        <Typography variant="h5" >-</Typography>
                    </MyButton>
                </Box>
                <Box display="flex" justifyContent="center">
                    <MyButton onClick={() => handleNumberClick(1)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">1</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(2)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">2</Typography>
                    </MyButton>
                    <MyButton onClick={() => handleNumberClick(3)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">3</Typography>
                    </MyButton>
                    <MyButton backgroundColor="orange" onClick={() => handleOperatorClick("add")}>
                        <Typography variant="h5" >+</Typography>
                    </MyButton>
                </Box>
                <Box display="flex" justifyContent="center">
                    <MyButton onClick={() => handleNumberClick(0)} backgroundColor="#e0e0e0">
                        <Typography variant="h5">0</Typography>
                    </MyButton>
                    <MyButton onClick={handleDoubleZeroClick} backgroundColor="#e0e0e0">
                        <Typography variant="h5">00</Typography>
                    </MyButton>
                    <MyButton onClick={handleDicimalPointClick} backgroundColor="#e0e0e0">
                        <Typography variant="h5" >.</Typography>
                    </MyButton>
                    <MyButton backgroundColor="orange" onClick={handleAnswerClick}>
                        <Typography variant="h5" >=</Typography>
                    </MyButton>
                </Box>
            </Box>
        </div>
    )
};

export default Calculator;