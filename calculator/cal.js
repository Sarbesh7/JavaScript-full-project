const result =document.getElementById("result");

function calculate(value){
  result.value= eval(value);
}

function calculation(entervalue){
    result.value += entervalue;
}
document.addEventListener("keydown",handleKeyPress);

function handleKeyPress(e) {
e.preventDefault();


if (e.key === "0") {
    result.value += "0";
  }

else if (e.key === "1")
 {
    result.value += "1";
  } 
  
else if (e.key === "2")
 {
    result.value += "2";
  }  
  
else if (e.key === "3")
 {
    result.value += "3";
  }  
 
else if (e.key === "4")
 {    result.value += "4";
 } 


else if (e.key === "5")
   { result.value += "5";
  }



else if (e.key === "6")
 {    result.value += "6";}


else if (e.key === "7")
 {
    result.value += "7";
  }


else if (e.key === "8")
 {    result.value += "8";}


else if (e.key === "9")
 {
    result.value += "9";
  }


  if (e.key === "C") {
    result.value = "";
  }



  if (e.key === "+") {
    result.value += "+";
  }

    else if (e.key === "-") {
        result.value += "-";
    } 
    
    else if (e.key === "*") {
        result.value += "*";
    } 
    
    else if (e.key === "/") {
        result.value += "/";
    } 
  


   if (e.key===".") {
        result.value += ".";
    }


    if (e.key === "Enter") {
        calculate(result.value);
    }

    if (e.key === "Backspace") {
        result.value = result.value.slice(0, -1);
    }




}