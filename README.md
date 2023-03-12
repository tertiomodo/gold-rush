<h1>Gold Rush</h1>
<h2>
  Deploy: <a href="https://tertiomodo.github.io/gold-rush/">GitHub pages</a>
</h2>
<h2>Используемые технологии</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
<h2>Общий вид проекта</h2>
<div style="margin-bottom: 40px;">
  <img src="assets\img\readme-img\desktop-royal-coins.jpg">
  <img src="assets\img\readme-img\desktop-wild-cash.jpg">
  <img src="assets\img\readme-img\desktop-lobby.jpg">
</div>
<h2>Особенности реализации:</h2>
<p>- Данные о принятии политики конфиденциальности, как и сумма выигрыша и XP, сохраняются в session storage.</p>
<p>- Вращение рулетки недоступно при ставке 0 или при ставке большей чем баланс.</p>
<p>- Кнопки Spin и Auto не перебивают друг друга, запустить новое вращение пока не остановится рулетка - невозможно.</p>
<p>- Максимально возможный баланс 10 000 000 000</p>
<p>- Максимально возможная ставка 100 000, минимальная 100</p>
<p>- Ставку нельзя изменить пока происходит вращение.</p>
<p>- Вы (как создатель игры) можете регулировать шанс выигрыша путём изменения числа в вызове функции winChance() (файл royal-coins-slots.js), вызывается функция в function shuffle().</p>

<p>Данная инструкция продублирована в коде:</p>
<p>2 - 50% win (numbers: 1 or 0)</p>
<p>3 - 33% win (numbers: 1 or 0, 2)</p>
<p>4 - 25% win (numbers: 1 or 0, 2, 3)</p>
<p>5 - 20% win (numbers: 1 or 0, ... 4)</p>
<p>6 - 17% win (numbers: 1 or 0, ... 5)</p>
<p>7 - 14% win (numbers: 1 or 0, ... 6)</p>
<p>winChance(7);<p>
<h2>Адаптивная вёрстка:</h2>
<div style="margin-bottom: 40px;">
  <img style="width: 400px; height: 200px" src="assets\img\readme-img\mob-royal-coins-horizontal.png">
  <img style="width: 200px; height: 400px" src="assets\img\readme-img\mob-royal-coins-vertical.png">
  <img style="width: 400px; height: 200px" src="assets\img\readme-img\mob-wild-cash-horizontal.png">
  <img style="width: 200px; height: 400px" src="assets\img\readme-img\mob-wild-cash-vertical.png">
  <img style="width: 400px; height: 200px" src="assets\img\readme-img\mob-lobby-horizontal.png">
  <img style="width: 200px; height: 400px" src="assets\img\readme-img\mob-lobby-vertical.png">
  <img style="width: 400px; height: 200px" src="assets\img\readme-img\mob-privacy-horizontal.png">
  <img style="width: 200px; height: 400px" src="assets\img\readme-img\mob-privacy-vertical.png">
</div>