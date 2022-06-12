const canvas = document.getElementById("yilan");
const ctx = canvas.getContext("2d");

class yilanParcasi {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
//Gerekli değişkenlerimizin tanımlandığı bölüm
let hiz = 5;

let govdeSayisi = 20;
let govdeUzunlugu = canvas.width / govdeSayisi - 2;

let kafaX = getRndInteger(0,20);
let kafaY = getRndInteger(0,20);



const govdeParcalari = [];
let kuyrukUzunlugu = 2;

let elmaX = getRndInteger(0,20);
let elmaY = getRndInteger(0,20);

let girdiXhizi = 0;
let girdiYhizi = 0;

let xHizi = 0;
let yHizi = 0;


let kolay = true;
let orta= false;
let zor=false;

let skor = 0;

const yutkunmaSesi = new Audio("yutkunma.mp3");

//İki değer arasında andom int üretme fonksiyonu
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//Butonlar ile zorluk ayarları
function kolayYap(){
    kolay = true;
    orta = false;
    zor = false;
    hiz = 5;
  }
  function ortaYap(){
    kolay = false;
    orta = true;
    zor = false;
    hiz = 7;
  }
  function zorYap(){
    kolay = false;
    orta = false;
    zor = true;
    hiz = 9;
  }


//Oyun döngümüz

function drawGame() {

  xHizi = girdiXhizi;
  yHizi = girdiYhizi;

  yilanKonumDegis();
  let result = isoyunBitti();
  if (result) {
    return;
  }

  ekraniTemizle();
  elmaYemeKontrol();
  elmaCiz();
  yilanCiz();
  zorlukYaz();
  skorCiz();

  //Skor arttıkça ve zorluk değiştikçe oyunun hızını da arttıran kısım
  
  if(kolay == true){
    if (skor > 5) {
      hiz = 7;
    }
    if (skor > 10) {
      hiz = 9;
    }
  }
  if(orta == true){
    if (skor > 5) {
      hiz = 9;
    }
    if (skor > 10) {
      hiz = 11;
    }
  }
  if(zor == true){
    if (skor > 5) {
      hiz = 11;
    }
    if (skor > 10) {
      hiz = 13;
    }
  }

  
  //Zorluk derecesini değiştirip oyunun hızını kontrol ettiğimiz kısım
  setTimeout(drawGame, 1000 / hiz);
  
}

function isoyunBitti() {
  let oyunBitti = false;
  //Başlangıçta oyunun bitmemesi için gerekli kontrol
  if (yHizi === 0 && xHizi === 0) {
    return false;
  }

  //Duvarlara ya da kendisine çarptığında oyunu bitiren kısım
  if (kafaX < 0) {
    oyunBitti = true;
  } else if (kafaX === govdeSayisi) {
    oyunBitti = true;
  } else if (kafaY < 0) {
    oyunBitti = true;
  } else if (kafaY === govdeSayisi) {
    oyunBitti = true;
  }

  for (let i = 0; i < govdeParcalari.length; i++) {
    let parca = govdeParcalari[i];
    if (parca.x === kafaX && parca.y === kafaY) {
      oyunBitti = true;
      break;
    }
  }

  //Oyun bittiğinde ekrana çıkartılacak ve ardından uygulanacak fonksiyonların bulunduğu kısım
  if (oyunBitti) {
    ctx.fillStyle = "black";
    ctx.font = "50px Verdana";

    if (oyunBitti) {
      ctx.fillStyle = "black";
      ctx.font = "50px Verdana";
      //Yazıya renk geçişi verdiğimiz kısım
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0.33", "red");
      gradient.addColorStop("0.66", "green");
      gradient.addColorStop("0.99", "blue");
      ctx.fillStyle = gradient;

      ctx.fillText("Oyun Bitti!", canvas.width / 6.5, canvas.height / 2);
    }

    ctx.fillText("Oyun Bitti!", canvas.width / 6.6, canvas.height / 2);
    ctx.font = "12px Verdana";
    ctx.fillText("3 Saniye sonra yeniden başlayacak!", canvas.width / 4.6, canvas.height / 1.75);
    //3000ms bekleyip sayfayı yenileyen fonksiyon
    setTimeout(function(){
      location.reload();
    }, 3000);
    
  }

  return oyunBitti;
}
//Skoru ekranın sağ üstünde kullanıcıya gösteren kısım
function skorCiz() {
  ctx.fillStyle = "black";
  ctx.font = "10px Verdana";
  ctx.fillText("Skor :" + skor, canvas.width - 50, 10);
}
//Zorluk ayarını ekranın sol üstünde kullanıcıya gösteren kısım
function zorlukYaz(){
  if(kolay == true){
    ctx.fillStyle = "black";
    ctx.font = "10px Verdana";
    ctx.fillText("Zorluk : Kolay", 5, 10);
  }
  else if(orta == true){
    ctx.fillStyle = "black";
    ctx.font = "10px Verdana";
    ctx.fillText("Zorluk : Orta", 5, 10);
  }
  else if(zor == true){
    ctx.fillStyle = "black";
    ctx.font = "10px Verdana";
    ctx.fillText("Zorluk : Zor", 5, 10);
  }
}
//ekranı temizleyen ve arkaplanı oluşturan kısım
function ekraniTemizle() {
  let image = new Image();
  image.src= "photos/bg.png";
  ctx.drawImage(image, 0,0,canvas.width,canvas.height);
}
//Yılanı ve gövdesini oluşturduğumuz ve hareketini konrtrol ettiğimiz oyunun en önemli fonksiyonlarından biri
function yilanCiz() {
  
  for (let i = 0; i < govdeParcalari.length; i++) {

    let parca = govdeParcalari[i];
    
    if(xHizi == 0 && yHizi == 0){
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(parca.x * govdeSayisi, parca.y * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
    }
    //aşağı gidiyor
    else if(yHizi == 1 && xHizi == 0){
      let yilanGovde = new Image();
      yilanGovde.src= "photos/bodyV.png";
      ctx.drawImage(yilanGovde,parca.x * govdeSayisi, parca.y * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
    }
    //yukarı gidiyor
    else if(yHizi == -1 && xHizi == 0){
      let yilanGovde = new Image();
      yilanGovde.src= "photos/bodyV.png";
      ctx.drawImage(yilanGovde,parca.x * govdeSayisi, parca.y * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
    }
    //sola gidiyor
    else if(yHizi == 0 && xHizi == -1){
      let yilanGovde = new Image();
      yilanGovde.src= "photos/bodyH.png";
      ctx.drawImage(yilanGovde,parca.x * govdeSayisi, parca.y * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
    }
    //sağa gidiyor
    else if(yHizi == 0 && xHizi == 1){
      let yilanGovde = new Image();
      yilanGovde.src= "photos/bodyH.png";
      ctx.drawImage(yilanGovde,parca.x * govdeSayisi, parca.y * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
    }

  }

  //Yılanın gövdesine parça ekleyip çıkarttığımız bölüm
  govdeParcalari.push(new yilanParcasi(kafaX, kafaY)); 
  while (govdeParcalari.length > kuyrukUzunlugu) {
    govdeParcalari.shift();
  }

  //duruyorken default kafa yönü aşağı
  if(xHizi == 0 && yHizi == 0){
    let yilanKafasi = new Image();
    yilanKafasi.src= "photos/headDown.png";
    ctx.drawImage(yilanKafasi,kafaX * govdeSayisi, kafaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
  }
  //aşağı gidiyorken kafa yönü aşağı
  else if(yHizi == 1 && xHizi == 0){
    let yilanKafasi = new Image();
    yilanKafasi.src= "photos/headDown.png";
    ctx.drawImage(yilanKafasi,kafaX * govdeSayisi, kafaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
  }
  //yukarı gidiyorken kafa yönü yukarı
  else if(yHizi == -1 && xHizi == 0){
    let yilanKafasi = new Image();
    yilanKafasi.src= "photos/headUp.png";
    ctx.drawImage(yilanKafasi,kafaX * govdeSayisi, kafaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
  }
  //sola gidiyorken kafa yönü sola
  else if(yHizi == 0 && xHizi == -1){
    let yilanKafasi = new Image();
    yilanKafasi.src= "photos/headL.png";
    ctx.drawImage(yilanKafasi,kafaX * govdeSayisi, kafaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
  }
  //sağa gidiyorken kafa yönü sağa
  else if(yHizi == 0 && xHizi == 1){
    let yilanKafasi = new Image();
    yilanKafasi.src= "photos/headR.png";
    ctx.drawImage(yilanKafasi,kafaX * govdeSayisi, kafaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
  }

  
  
}
//Yılanın yönünü ve konumunu ayarladığımız kısım
function yilanKonumDegis() {
  kafaX = kafaX + xHizi;
  kafaY = kafaY + yHizi;
}
//Elma oluşturduğumuz fonksiyon
function elmaCiz() {
  let apple = new Image();
  apple.src= "photos/apple.png";
  ctx.drawImage(apple,elmaX * govdeSayisi, elmaY * govdeSayisi, govdeUzunlugu, govdeUzunlugu);
}
//Elma ile yılanın çarpışma kontrolünü yapan fonksiyon
function elmaYemeKontrol() {
  if (elmaX === kafaX && elmaY == kafaY) {
    elmaX = Math.floor(Math.random() * govdeSayisi);
    elmaY = Math.floor(Math.random() * govdeSayisi);
    kuyrukUzunlugu++;
    skor++;
    yutkunmaSesi.play();
  }
}
//Klavyeden girdileri kontrol ettiğimiz fonksiyon
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //yukarı tuşu (yukarı ok ve "W")
  if (event.keyCode == 38 || event.keyCode == 87) {
    if (girdiYhizi == 1) return;
    girdiYhizi = -1;
    girdiXhizi = 0;
  }

  //aşağı tuşu (aşağı ok ve "S")
  if (event.keyCode == 40 || event.keyCode == 83) {
    if (girdiYhizi == -1) return;
    girdiYhizi = 1;
    girdiXhizi = 0;
  }

  //sol tuşu (sol ok ve "A")
  if (event.keyCode == 37 || event.keyCode == 65) {
    if (girdiXhizi == 1) return;
    girdiYhizi = 0;
    girdiXhizi = -1;
  }

  //sağ tuşu (sağ ok ve "D")
  if (event.keyCode == 39 || event.keyCode == 68) {
    if (girdiXhizi == -1) return;
    girdiYhizi = 0;
    girdiXhizi = 1;
  }
}
//Ana sayfamıza döndüğümüz kısım
function geriDon(){
  window.open("../mainpage.html","_self");
}

drawGame();