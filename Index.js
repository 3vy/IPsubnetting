const number = 42;

var ottetto1 = 0;
var ottetto2 = 0;
var ottetto3 = 0;
var ottetto4 = 0; 

var sub1 = 0;
var sub2 = 0;
var sub3 = 0;
var sub4 = 0; 

var net1 = 0;
var net2 = 0;
var net3 = 0;
var net4 = 0; 


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

function bin2Dec(bstr) { 
    return parseInt((bstr + '')
    .replace(/[^01]/gi, ''), 2);
}

function clear(){
    document.getElementById("message").innerHTML = "";
    document.getElementById("ipclass").innerHTML = "";

    document.getElementById("ottettoBin1").innerHTML = "";
    document.getElementById("ottettoBin2").innerHTML = "";
    document.getElementById("ottettoBin3").innerHTML = "";
    document.getElementById("ottettoBin4").innerHTML = "";
}

function getOctectValue(num){
    var id = "ottetto" + num;

    let _ottetto = document.getElementById(id).value;
    isValid = validateOtetto(_ottetto);

    if (!isValid){
        document.getElementById("message").innerHTML = "Octect number " + num + " is not valid";
        return -1;
    }
 
    var decimal = parseInt(_ottetto);
    document.getElementById("ottettoBin" + num).innerHTML = dec2OctectBin(decimal);
    return decimal; 
}

function getSubValue(num){
    var id = "sub" + num;
    var element = document.getElementById(id); 
    
    element.classList.remove("borderError");
    let _sub = element.value;

    if(isNaN(_sub)){
        return -1;
    }
     
    var dec = parseInt(_sub); 
    var _subBin = dec2OctectBin(dec);

    var isV = _subBin.toString().includes("01"); 
    if (isV){
        element.classList.add("borderError");
        return -1;
    }

    return dec;
}

function setNetValues(){
    net1 = ottetto1 & sub1
    net2 = ottetto2 & sub2
    net3 = ottetto3 & sub3
    net4 = ottetto4 & sub4

    document.getElementById("net1").innerHTML = net1;
    document.getElementById("net2").innerHTML = net2;
    document.getElementById("net3").innerHTML = net3;
    document.getElementById("net4").innerHTML = net4;

    document.getElementById("netBin1").innerHTML = dec2OctectBin(net1);
    document.getElementById("netBin2").innerHTML = dec2OctectBin(net2);
    document.getElementById("netBin3").innerHTML = dec2OctectBin(net3);
    document.getElementById("netBin4").innerHTML = dec2OctectBin(net4);
}

function setBroadcastValues(){
    var bitsSubnet =  (dec2OctectBin(sub1).toString() + dec2OctectBin(sub2).toString() + dec2OctectBin(sub3).toString() + dec2OctectBin(sub4).toString()).replaceAll("0", "");
    var nbit = bitsSubnet.length;
    
    var bitsNetwork = (dec2OctectBin(net1).toString() + dec2OctectBin(net2).toString() + dec2OctectBin(net3).toString() + dec2OctectBin(net4).toString());

    var t1 = bitsNetwork.substring(0, nbit).padEnd(32, '1');

    var _bro1 = t1.substring(0, 8); 
    var _bro2 = t1.substring(8, 16); 
    var _bro3 = t1.substring(16, 24); 
    var _bro4 = t1.substring(24, 32); 
    // expected output: "Breaded Mushrooms........"
 
    var bro1 = bin2Dec(_bro1);
    var bro2 = bin2Dec(_bro2);
    var bro3 = bin2Dec(_bro3);
    var bro4 = bin2Dec(_bro4);

    document.getElementById("bro1").innerHTML = bro1;
    document.getElementById("bro2").innerHTML = bro2;
    document.getElementById("bro3").innerHTML = bro3;
    document.getElementById("bro4").innerHTML = bro4;

    document.getElementById("broBin1").innerHTML = _bro1;
    document.getElementById("broBin2").innerHTML = _bro2;
    document.getElementById("broBin3").innerHTML = _bro3;
    document.getElementById("broBin4").innerHTML = _bro4;
}

function calculate() {
    clear();

    let isValid = false;

    ottetto1 = getOctectValue(1);
    ottetto2 = getOctectValue(2);
    ottetto3 = getOctectValue(3);
    ottetto4 = getOctectValue(4);

    sub1 = getSubValue(1);
    sub2 = getSubValue(2);
    sub3 = getSubValue(3);
    sub4 = getSubValue(4);

    setNetValues();
    document.getElementById("ipclass").innerHTML = classResolver(ottetto1);

    setBroadcastValues();

    // var bits2 = bits.replaceAll("0", "");
}