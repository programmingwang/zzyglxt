var sc= document.getElementsByClassName("sc");
var allSc=document.getElementById("allSc");

var a=0;
for (var i = 0;i<sc.length;i++){
    sc[i].onchange=function () {

        a=a+Number(this.value)
        allSc.value=a;
    }
}