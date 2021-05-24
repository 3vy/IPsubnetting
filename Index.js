const number = 42;

function validateOtetto(ottetto){

    if(isNaN(ottetto)){
        return false;
     }else{
        if (ottetto < 0 || ottetto > 255){
            return false;
        }
     }

     return true;
}

function classResolver(ottetto1){
    let classResolved = "Undefined class";

    if (ottetto1>=0 &&  ottetto1 <= 127){
        classResolved = "Class A";
    }
    else if (ottetto1> 127 &&  ottetto1 <= 191){
        classResolved = "Class B";
    }
    else if (ottetto1> 191 &&  ottetto1 <= 223){
        classResolved = "Class C";
    }
    else if (ottetto1> 223 &&  ottetto1 <= 239){
        classResolved = "Class D";
    }
    else if (ottetto1> 239 &&  ottetto1 <= 255){
        classResolved = "Class E";
    }

    return classResolved;
}

function dec2OctectBin(dec){
    return dec.toString(2).padStart(8, '0');
}

function calculate() {
    let isValid = false;
    
    document.getElementById("message").innerHTML = "";
    document.getElementById("ipclass").innerHTML = "";

    let _ottetto1 = document.getElementById("ottetto1").value;
    let _ottetto2 = document.getElementById("ottetto2").value;
    let _ottetto3 = document.getElementById("ottetto3").value;
    let _ottetto4 = document.getElementById("ottetto4").value;


    isValid = validateOtetto(_ottetto1);
    if (!isValid){
        document.getElementById("message").innerHTML = "First octect is not valid";
        return;
    }
    let ottetto1 = parseInt(_ottetto1); 

    //TODO validate altri ottetti

    document.getElementById("ipclass").innerHTML = classResolver(ottetto1);
    
    //const str1 = dec2OctectBin(ottetto1);

    //alert(str1.padStart(2, '0'));

    alert(dec2OctectBin(ottetto1));
}