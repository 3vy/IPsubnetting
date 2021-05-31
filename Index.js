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

    document.getElementById("gateways").innerHTML = "";
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

function getNetworkBits(){
    return  (dec2OctectBin(sub1).toString() + dec2OctectBin(sub2).toString() + dec2OctectBin(sub3).toString() + dec2OctectBin(sub4).toString()).replaceAll("0", "");
}

function getSubnetBits(){
    var networkBits = getNetworkBits();
    var nbit = networkBits.length;
    var r1 = (nbit %  8);
    
    return "".padEnd(r1, '1');
}

function getHostBits(){
    var networkBits = getNetworkBits();
    return "".padEnd((32-networkBits.length), '1');
}

function setBroadcastValues(){
    //var bitsSubnet =  (dec2OctectBin(sub1).toString() + dec2OctectBin(sub2).toString() + dec2OctectBin(sub3).toString() + dec2OctectBin(sub4).toString()).replaceAll("0", "");
    var bitsSubnet = getNetworkBits();
    var nbit = bitsSubnet.length;
    
    /*  
    var r1 = (nbit %  8);
    var r2 = Math.pow(2, r1);
    //alert(r2);
    document.getElementById("nsubnet").innerHTML = r2;
    */

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

function setNumberOfSubnet(){
    var subnetBits =getSubnetBits();
    var numberOfSubnet = Math.pow(2, subnetBits.length);
    document.getElementById("nsubnet").innerHTML = numberOfSubnet;
}

function setNumberOfHost(){
    var hostBits =getHostBits();
    var numberOfHost = Math.pow(2, hostBits.length) -2 ;
    document.getElementById("nhost").innerHTML = numberOfHost;
}

function setGatewayIP(){
    var table = document.getElementById("gateways");

    var subnetBits = getSubnetBits()
    var nsubnet = Math.pow(2, subnetBits.length);
    
    var networkBits = getNetworkBits();
    var ipBits = dec2OctectBin(ottetto1)+dec2OctectBin(ottetto2)+dec2OctectBin(ottetto3)+dec2OctectBin(ottetto4);
    var networkBits2 = ipBits.substring(0, networkBits.length); 
    var numerobitnetwork = networkBits.length - subnetBits.length; 
    networkBits = networkBits2.substring(0, numerobitnetwork);

    for(var x =0; x<nsubnet; x++)
    {
        var sub = "";

        if (subnetBits.length>0){
            sub = x.toString(2).padStart(subnetBits.length, '0');
        }

        var t1 = (networkBits + sub).padEnd(31, '0') + "1";
        var _o1 = t1.substring(0, 8); 
        var _o2 = t1.substring(8, 16); 
        var _o3 = t1.substring(16, 24); 
        var _o4 = t1.substring(24, 32);
        
        var _oo1 = bin2Dec(_o1); //& ottetto1;
        var _oo2 = bin2Dec(_o2); //& ottetto2;
        var _oo3 = bin2Dec(_o3); //& ottetto3;
        var _oo4 = bin2Dec(_o4); //& ottetto4;


        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        cell0.innerHTML = "gateway (" + sub + ")";
        cell1.innerHTML = _oo1; 
        cell2.innerHTML = _oo2;
        cell3.innerHTML = _oo3;
        cell4.innerHTML = _oo4;
    }


}

function setBits(){

    var networkBits = getNetworkBits();
    var subnetBits = getSubnetBits()
    var hostBits = getHostBits();

    var ipBits = dec2OctectBin(ottetto1)+dec2OctectBin(ottetto2)+dec2OctectBin(ottetto3)+dec2OctectBin(ottetto4);
    
    var bitrete = ipBits.substring(0, networkBits.length -subnetBits.length ); 
    var bitsottorete = ipBits.substring( ( networkBits.length -subnetBits.length ), ( networkBits.length -subnetBits.length )+subnetBits.length  ); 
    var bithost = ipBits.substring(( networkBits.length -subnetBits.length )+subnetBits.length, 32 );
    document.getElementById("bitrete").innerHTML = bitrete;
    document.getElementById("bitsottorete").innerHTML = bitsottorete;
    document.getElementById("bithost").innerHTML = bithost;
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

    setNumberOfSubnet();

    setNumberOfHost();

    setGatewayIP();

    setBits();
}