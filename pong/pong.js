const canvas = document.getElementById('oyun');
const context = canvas.getContext('2d');
const kareler = 15;
const platformYuksekligi = kareler * 5;
const maksPlatformY = canvas.height - kareler - platformYuksekligi;

var platformHizi = 6;
var topHizi = 3.5;
var skorSag = 0;
var skorSol = 0;

const solPlatform = {
  // Oyun ekranının sol tarafında ortada başlamasını sağladığımız kısım
  x: kareler * 2,
  y: canvas.height / 2 - platformYuksekligi / 2,
  width: kareler,
  height: platformYuksekligi,

  // platformun hızı
  dy: 0
};
const sagPlatform = {
  // Oyun ekranının sağ tarafında ortada başlamasını sağladığımız kısım
  x: canvas.width - kareler * 3,
  y: canvas.height / 2 - platformYuksekligi / 2,
  width: kareler,
  height: platformYuksekligi,

  // platformun hızı
  dy: 0
};
const oyunTopu = {
  // Oyun ekranının ortasında oluşmasını sağladığımız kısım
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: kareler,
  height: kareler,

  // Topun ekranın dışına çıktığında yenilenmesini kontrol ettiğimiz değişken
  yenileniyor: false,

  // Topun hızı
  dx: topHizi,
  dy: -topHizi
};

// Top ve platformlar arasındaki çarpışma durumunu kontrol ettiğimiz kısım
function carpisiyor(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Oyun Döngüsü
function oyunDongusu() {
  requestAnimationFrame(oyunDongusu);
  context.clearRect(0,0,canvas.width,canvas.height);

  context.fillStyle = "white";
  context.font = "40px Verdana";
  context.fillText(skorSag, canvas.width/3,canvas.height/2);

  context.fillStyle = "white";
  context.font = "40px Verdana";
  context.fillText(skorSol, canvas.width/1.6,canvas.height/2);


  // Platformları yukarı aşağı hareket ettirmek için Y eksenindeki hızı ayarladığımız kısım
  solPlatform.y += solPlatform.dy;
  sagPlatform.y += sagPlatform.dy;

  // Platformların yukarı ve aşağı duvarlardan geçmemesini sağladığımız kısım
  if (solPlatform.y < kareler) {
    solPlatform.y = kareler;
  }
  else if (solPlatform.y > maksPlatformY) {
    solPlatform.y = maksPlatformY;
  }

  if (sagPlatform.y < kareler) {
    sagPlatform.y = kareler;
  }
  else if (sagPlatform.y > maksPlatformY) {
    sagPlatform.y = maksPlatformY;
  }

  // Platformları oluşturduğumuz kısım
  context.fillStyle = 'white';
  context.fillRect(solPlatform.x, solPlatform.y, solPlatform.width, solPlatform.height);
  context.fillRect(sagPlatform.x, sagPlatform.y, sagPlatform.width, sagPlatform.height);

  // Topun hızını ve yönünü belirlediğimiz kısım
  oyunTopu.x += oyunTopu.dx;
  oyunTopu.y += oyunTopu.dy;

  // Top duvarlardan geçtikten sonra y eksenindeki hızını değiştirdiğimiz kısım
  if (oyunTopu.y < kareler) {
    oyunTopu.y = kareler;
    oyunTopu.dy *= -1;
  }
  else if (oyunTopu.y + kareler > canvas.height - kareler) {
    oyunTopu.y = canvas.height - kareler * 2;
    oyunTopu.dy *= -1;
  }

  // Top duvarlardan geçtikten skoru artırdığımız ve topu yenilediğimiz kısım.
  if ( (oyunTopu.x < 0 || oyunTopu.x > canvas.width) && !oyunTopu.yenileniyor) {
    oyunTopu.yenileniyor = true;
    
    if(oyunTopu.x < 0){
      skorSag++
    }
    else if( oyunTopu.x > 0){
      skorSol++;
    }

    // Top yenilenmeden önce oyuncunun konumunu değiştirmesi için biraz beklettiğimiz kısım
    setTimeout(() => {
      oyunTopu.yenileniyor = false;
      oyunTopu.x = canvas.width / 2;
      oyunTopu.y = canvas.height / 2;
    }, 400);
  }

  // Top platform ile çarpışıyorsa x eksenindeki yönünü değiştirdiğimiz kısım
  if (carpisiyor(oyunTopu, solPlatform)) {
    oyunTopu.dx *= -1;
    oyunTopu.x = solPlatform.x + solPlatform.width;
  }
  else if (carpisiyor(oyunTopu, sagPlatform)) {
    oyunTopu.dx *= -1;
    oyunTopu.x = sagPlatform.x - oyunTopu.width;
  }

  // Topu oluşturduğumuz kısım
  context.fillRect(oyunTopu.x, oyunTopu.y, oyunTopu.width, oyunTopu.height);

  // Duvarları oluşturduğumuz kısım
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, kareler);
  context.fillRect(0, canvas.height - kareler, canvas.width, canvas.height);


  // Orta çizgiyi oluşturduğumuz kısım
  for (let i = kareler; i < canvas.height - kareler; i += kareler * 2) {
    context.fillRect(canvas.width / 2 - kareler / 2, i, kareler, kareler);
  }
}

// Platformları hareket ettirmek için input aldığımız kısım
document.addEventListener('keydown', function(e) {

  // Yukarı ok tuşu
  if (e.keyCode === 38) {
    sagPlatform.dy = -platformHizi;
  }
  // Aşağı ok tuşu
  else if (e.keyCode === 40) {
    sagPlatform.dy = platformHizi;
  }

  // W tuşu
  if (e.keyCode === 87) {
    solPlatform.dy = -platformHizi;
  }
  // S tuşu
  else if (e.keyCode === 83) {
    solPlatform.dy = platformHizi;
  }
});

// Platfromları durdurmak için inputun bırakıldığını kontrol ettiğimiz kısım
document.addEventListener('keyup', function(e) {
  if (e.keyCode === 38 || e.keyCode === 40) {
    sagPlatform.dy = 0;
  }

  if (e.keyCode === 83 || e.keyCode === 87) {
    solPlatform.dy = 0;
  }
});
function geriDon(){
    window.open("../mainpage.html","_self")
  }
// Oyunu başlattığımız kısım (animasyon başlangıcı)
requestAnimationFrame(oyunDongusu);