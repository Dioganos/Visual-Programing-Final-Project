// html sayfasında sıradaki hamleyi belirleyen elementi çektiğimiz kısım.
const hamle = document.getElementById("siradakiHamle");
let hamlesayisi = 0;
let kazananvar = false;
// tüm oyun için gerekli olan fonksiyon.
function xoYaz(button){
    
    if(document.getElementById(button).innerHTML == "&nbsp;"){ // html sayfasında butonların içeriğinin boş olduğunu "&nbsp;" şeklinde belirlemiştik. Halihazırda içeirsine yazılı
        //olan butonlara tekrar bir girdi yapılmasın diye bu şekilde boş olup olmadığını kontrol ediyoruz.
        if(hamle.innerHTML == "X"){ // html sayfamızda sıradaki hamle x'i gösteriyorsa.
            document.getElementById(button).innerHTML = hamle.innerHTML;
            hamle.innerHTML = "O";
        }
        else{ // html sayfamızda sıradaki hamle x'i göstermiyorsa, yani o'yu gösteriyorsa.
            document.getElementById(button).innerHTML = hamle.innerHTML;
            hamle.innerHTML = "X";
        }
    }
    // butonların içeirğini değişkenlere atadığımız kısım.
    let button1 = document.getElementById("1").innerHTML;
    let button2 = document.getElementById("2").innerHTML;
    let button3 = document.getElementById("3").innerHTML;
    let button4 = document.getElementById("4").innerHTML;
    let button5 = document.getElementById("5").innerHTML;
    let button6 = document.getElementById("6").innerHTML;
    let button7 = document.getElementById("7").innerHTML;
    let button8 = document.getElementById("8").innerHTML;
    let button9 = document.getElementById("9").innerHTML;
    // bu kısımda satır, sütun ve çarpraz şekilde x ve o'ların bitiş koşuluna uygun bir şekilde sıralanıp sıralanmadığını kontrol ediyoruz.
    if(button1 == "X" && button2 == "X" && button3 == "X" || button1 == "O" && button2 == "O" && button3 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button1 == "X" && button5 == "X" && button9 == "X" || button1 == "O" && button5 == "O" && button9 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button1 == "X" && button4 == "X" && button7 == "X" || button1 == "O" && button4 == "O" && button7 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button3 == "X" && button6 == "X" && button9 == "X" || button3 == "O" && button6 == "O" && button9 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button2 == "X" && button5 == "X" && button8 == "X" || button2 == "O" && button5 == "O" && button8 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button4 == "X" && button5 == "X" && button6 == "X" || button4 == "O" && button5 == "O" && button6 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button3 == "X" && button5 == "X" && button7 == "X" || button3 == "O" && button5 == "O" && button7 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    if(button7 == "X" && button8 == "X" && button9 == "X" || button7 == "O" && button8 == "O" && button9 == "O"){
        alert("Kazanan = " + document.getElementById(button).innerHTML);
        kazananvar = true;
        window.location.reload();
    }
    hamlesayisi++;
    if(hamlesayisi == 9 && kazananvar == false){
        alert("Oyun Berabere");
        window.location.reload();
    }
}
function geriDon(){
    window.open("../mainpage.html","_self")
    }