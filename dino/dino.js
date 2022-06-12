const canvas = document.getElementById('oyun');
const ctx = canvas.getContext('2d');


// Değişkenler
let skor;
let skorMetni;
let enyuksekskor;
let enyuksekskorMetni;
let dino;
let yercekimi;
let engeller = [];
let oyunHizi;
let tuslar = {};

// Hareket Kontrolleri (tuşa basılma ve tuşa basmayı bırakma)
document.addEventListener('keydown', function (evt) {
  tuslar[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
  tuslar[evt.code] = false;
});
// oyuncunun temel özelliklerini constructor belirleyerek içerisine yazıyoruz.
class Oyuncu {
  constructor (x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.ziplamaMesafesi = 15;
    this.yukseklik = h;
    this.yerTemasi = false;
    this.ziplamaSuresi = 0;
  }

  Animasyon () {
    // Zıplama
    // ziplama metodunu çalıştırıyoruz, eğer tuşlara basılmıyorsa zıplama süresini 0 yaparak zıplamayı durduruyoruz.
    if (tuslar['Space'] || tuslar['KeyW']) {
      this.Zipla();
    } else {
      this.ziplamaSuresi = 0;
    }

    // Eğilme
    // eğilmek için karakterimizin yüksekliğini olduğu yüksekliğin yarısı yapıyoruz. Tuşa basmayı bıraktığımız zaman da eski yüksekliğine geri dönüyor.

    if (tuslar['ShiftLeft'] || tuslar['KeyS']) {
      this.h = this.yukseklik / 2;
    } else {
      this.h = this.yukseklik;
    }

    this.y += this.dy;

    // Yer Çekimi
    if (this.y + this.h < canvas.height) {
      this.dy += yercekimi;
      this.yerTemasi = false;
    } else {
      this.dy = 0;
      this.yerTemasi = true;
      this.y = canvas.height - this.h;
    }
    //karakterimizi kontroller ile sürekli yeniliyoruz
    this.Ciz();
  }
  // eğer yere temas ediyorsa ve tuşa basıldıysa zıplama süresi ve yerteması değişkenine göre karakterimizin y eksenindeki yönünü ve hızını değiştiriyoruz.
  Zipla () {
    if (this.yerTemasi && this.ziplamaSuresi == 0) {
      this.ziplamaSuresi = 1;
      this.dy = -this.ziplamaMesafesi;
    } else if (this.ziplamaSuresi > 0 && this.ziplamaSuresi < 15) {
      this.ziplamaSuresi++;
      this.dy = -this.ziplamaMesafesi - (this.ziplamaSuresi / 50);
    }
  }
  // karakteri oluşturduğumuz kısım burası.
  Ciz () {
    ctx.beginPath();
    const resim = new Image();
    resim.src = "source/dino.png"
    ctx.drawImage(resim,this.x,this.y,this.w,this.h);
    ctx.closePath();
  }
}
// Gelecek olan engellerin constructor özelliklerini ve gerekli metotlarını belirlediğimiz kısım.
class Engel {
  constructor (x, y, w, h, resim) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.resim = resim;

    this.dx = -oyunHizi;
  }

  Guncelle () {
    this.x += this.dx;
    this.Ciz();
    this.dx = -oyunHizi;
  }
  // buradaki çiz metodu için resim değişkenine belirlediğimiz constructordaki resimi atıyoruz çünkü kaktüs ve kuş olarak iki farklı engel olmasını istiyoruz.
  Ciz () {
    ctx.beginPath();
    const resim = new Image();
    resim.src = "source/"+this.resim+".png"
    ctx.drawImage(resim,this.x,this.y,this.w,this.h);
    ctx.closePath();
  }
}
//Skor ve gerekli diğer yazılar için yaıların fontunu , rengini vs. belirlediğimiz constructor ve gerekli çizim metodu.
class Yazi {
  constructor (t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Ciz () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

// Oyun Fonskiyonları

// engelleri farklı boyut ve türlerde oluşturduğumuz kısım.
function EngelOlustur () {
  let boyut = 50;
  let tur = RandomIntInRange(0, 1);
  let engel = new Engel(canvas.width + boyut, canvas.height - boyut +5, boyut, boyut, "kaktüs"); // eğer tür 1 değilse kaktüs çağrılıyor ve gerekli pozisyonda oluşturuluyor.

  // eğer tür 1 ise kuş çağrılacağı için kaktüse göre biraz daha yukarıda ve resmini de gerekli png dosyasının ismi olacak şekilde belirliyoruz.
  if (tur == 1) {
    engel.y -= dino.yukseklik - 10;
    engel.resim = "kus";
    
  }
  engeller.push(engel);
}


function RandomIntInRange (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Basla () {

  // oyun ekranımızın yükseklik ve genişlik ayarını burdan yapıyoruz.
  canvas.width = window.innerWidth -4;
  canvas.height = window.innerHeight - 70;

  ctx.font = "20px sans-serif";
  // burda oyun hızı , dinazorun zıpladıktan sonra yere düşme süresi (yer çekimi) , skor, yüksek skor gibi değişkenlerin oyun başlangıcında olmasını istediğimiz şekillerini belirliyoruz.
  oyunHizi = 3;
  yercekimi = 1;
  localStorage.clear();
  skor = 0;
  enyuksekskor = 0;
  if (localStorage.getItem('enyuksekskor')) {
    enyuksekskor = localStorage.getItem('enyuksekskor');
  }
  // dinozorumuzun constructor özelliklerini ilk defa burdan ayarlıyoruz.
  dino = new Oyuncu(25, 0, 50, 50, '#FF5858');
  // skor metnimizin constructor özelliklerini ilk defa burdan ayarlıyoruz.
  skorMetni = new Yazi("Skor: " + skor, 25, 25, "left", "#FFFFFF", "20");
  // en yüksek skor skor metnimizin constructor özelliklerini ilk defa burdan ayarlıyoruz
  enyuksekskorMetni = new Yazi("En Yüksek Skor: " + enyuksekskor, canvas.width - 25, 25, "right", "#FFFFFF", "20");
  // sürekli olarak animasyonu güncelliyoruz ve bu bize oyun akışı sağlıyor. Bu olmasaydı oyunumuz sadece bir kareden ibaret olurdu.
  requestAnimationFrame(Guncelle);
}
// ilk gelecek engellerin ne kadar süre (skor bazlı) sonra geleceğini ayarladığımız kısım.
let ilkOlusmaSayaci = 200;
let olusmaSayaci = ilkOlusmaSayaci;
function Guncelle () {
  requestAnimationFrame(Guncelle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  olusmaSayaci--;
  if (olusmaSayaci <= 0) {
    EngelOlustur();
    olusmaSayaci = ilkOlusmaSayaci - oyunHizi * 8;
    
    if (olusmaSayaci < 60) {
      olusmaSayaci = 60;
    }
  }

  // Engellerimiz ile oyuncu arasındaki çarpışma kontrollerini ve oyunun bitip bitmediğini bu kısımdan kontrol ediyoruz.
  for (let i = 0; i < engeller.length; i++) {
    let o = engeller[i];

    if (o.x + o.w < 0) {
      engeller.splice(i, 1);
    }

    if (
      dino.x < o.x + o.w &&
      dino.x + dino.w > o.x &&
      dino.y < o.y + o.h &&
      dino.y + dino.h > o.y
    ) {
      oyunHizi = 0;
      skor = 0;
      // oyun bitince karakterimiz hareketine devam edemesin diye tuşlar dizisini boş hale getiriyoruz sonradan tekrar tanımlanacak.
      tuslar = {};
      olusmaSayaci = ilkOlusmaSayaci;
      window.localStorage.setItem('enyuksekskor', enyuksekskor);
      ctx.fillStyle = "black";
      ctx.font = "50px Verdana";
      //Yazıya renk geçişi verdiğimiz kısım
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0.33", "red");
      gradient.addColorStop("0.66", "green");
      gradient.addColorStop("0.99", "blue");
      ctx.fillStyle = gradient;
      ctx.fillText("Oyun Bitti!", canvas.width / 1.60, canvas.height / 2);
      ctx.font = "30px Verdana";
      ctx.fillText("En yüksek skor : " + enyuksekskor, canvas.width / 1.57, canvas.height / 1.7);
      // oyun bittikten sonra en yüksek skoru ve oyunun bittiğini gösteren yazıyı 1 saniye boyunca ekranda tutmak için bu fonskiyonu kullanıyoruz. Ardından engeller sıfırlanıyor 
      // ve oyun hızı eski haline getirilerek belirlediğimiz döngünün tekrar akmasını sağlıyoruz.
      setTimeout(function(){
        engeller = [];
        oyunHizi = 3;
        }, 1000);
    }
    o.Guncelle();
  }


  dino.Animasyon();

  skor++;
  skorMetni.t = "Skor: " + skor;
  skorMetni.Ciz();

  if (skor > enyuksekskor) {
    enyuksekskor = skor;
    enyuksekskorMetni.t = "En Yüksek Skor: " + enyuksekskor;
  }
  
  enyuksekskorMetni.Ciz();

  oyunHizi += 0.001;
}

Basla();

function geriDon(){
    window.open("../mainpage.html","_self")
  }