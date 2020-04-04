import React, {useState} from 'react';

import MyButton from '../components/MyButton';
import Display from '../components/Display';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Calculator(){
    const [value1, setValue1] = useState("0");
    const [value2, setValue2] = useState("0");
    const [operator, setOperator] = useState(false);
    const [isAllClear, setIsAllClear] = useState(true);
    const [isDicimalInput, setIsDicimalInput] = useState(false);
    const [isAnswerDisplay, setIsAnswerDisplay] = useState(false);

    const handleNumberClick = (num) => {
        if(isAnswerDisplay){
            setValue1(num);
            setValue2("0");
            setOperator(false);
            setIsAnswerDisplay(false);
            setIsDicimalInput(false);
        } else {
            if(!operator){
                if(isDicimalInput){
                    setValue1(String(value1) + String(num))
                } else {
                    setValue1(String(Number(value1)*10+num));
                }
                
            } else {
                if(isDicimalInput){
                    setValue2(String(value2) + String(num))
                } else {
                    setValue2(String(Number(value2)*10+num));
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
                setValue1(String(value1) + "00")
            } else {
                setValue1(String(Number(value1)*100));
            }
        } else {
            if(isDicimalInput){
                setValue2(String(value2) + "00")
            } else {
                setValue2(String(Number(value2)*100));
            }
        }
    }

    const handleClearClick = () => {
        setIsDicimalInput(false);
        if(isAllClear){
            setValue1("0");
            setOperator(false);
            setIsAnswerDisplay(false)
        } else {
            setIsAllClear(true);
            if(isAnswerDisplay){
                setValue1("0")
            } else{
                if(!operator){
                    setValue1("0");
                } else {
                    setValue2("0");
                }
            }
        }
    }

    const handleMinusPlusClick = () => {
        if(isAnswerDisplay){
            setValue1(-1 * Number(value1));
        } else {
            if(!operator){
                setValue1(-1 * Number(value1));
            } else {
                setValue2(-1 * Number(value2));
            }
        }
        
    }

    const handlePercentageClick = () => {
        if(isAnswerDisplay){
            setValue1(Number(value1) * 0.01);
        } else {
            if(!operator){
                setValue1(Number(value1) * 0.01);
            } else {
                setValue2(Number(value2) * 0.01);
            }
        }
    }

    const handleOperatorClick = (a) => {
        if(isAnswerDisplay){
            setIsAnswerDisplay(false);
        } else {
            if(value2 !== "0"){
                if(operator === "add"){
                    setValue1(Number(value1) + Number(value2))
                } else if(operator === "subtract"){
                    setValue1(Number(value1) - Number(value2))
                } else if(operator === "divide"){
                    setValue1(Number(value1) / Number(value2))
                } else if(operator === "multiply"){
                    setValue1(Number(value1) * Number(value2))
                }
            }
        }
        setIsDicimalInput(false);
        setOperator(a);
        setValue2("0")
    }

    const handleDicimalPointClick = () => {
        if(isDicimalInput) return;

        setIsDicimalInput(true);
        if(!operator){
            setValue1(String(value1) + '.')
        } else {
            setValue2(String(value2) + '.')
        }
    }

    const handleAnswerClick = () => {
        setIsDicimalInput(false);
        setIsAnswerDisplay(true);
        if(operator === "add") {
            if(value2 === "0"){
                setValue2(value1)
                setValue1(Number(value1) + Number(value1))
            } else {
                setValue1(Number(value1) + Number(value2))
            }
        } else if(operator === "subtract") {
            if(value2 === "0"){
                setValue2(Number(value1))
                setValue1(Number(value1) - Number(value1))
            } else {
                setValue1(Number(value1) - Number(value2))
            }
        } else if(operator === "divide") {
            if(value2 === "0"){
                setValue2(Number(value1))
                setValue1(Number(value1) / Number(value1))
            } else {
                setValue1(Number(value1) / Number(value2))
            }
        } else if(operator === "multiply"){
            if(value2 === "0"){
                setValue2(Number(value1))
                setValue1(Number(value1) * Number(value1))
            } else {
                setValue1(Number(value1) * Number(value2))
            }
        }
    }


    const displayMarkup = isAnswerDisplay ? (
        value1
    ) : (
        operator ? (
            value2
        ) : (
            value1
        )
    );

    const clearButtonMarkup = isAllClear ? (
        "AC"
    ) : (
        "C"
    )
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