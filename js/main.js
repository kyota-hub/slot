'use strict'

{
  class Panel {
    constructor(){
      const section =document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');

      this.stop.addEventListener('click', () =>{
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        panelsleft--;
        if(panelsleft === 0){
          checkResult();
          spin.classList.remove('inactive');
          panelsleft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      document.querySelector('main').appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    matched(p1, p2) {
      return this.img.src === p1.img.src && this.img.src === p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  let score = 0;
  const scorebord = document.createElement('h1');
  scorebord.textContent = `Total : ${score} Bingo!`;
  document.getElementById('score').appendChild(scorebord);

  let count = 0;
  const countbord = document.createElement('h1');
  countbord.textContent = `${count} 回目`;
  document.getElementById('count').appendChild(countbord);
  
  function checkResult() {
    if(panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if(panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if(panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }

    if(panels[2].matched(panels[0], panels[1])) {
        score ++;
        scorebord.textContent = `Total : ${score} Bingo!`;
      }

  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsleft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click',() =>{
    if(spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    count ++;
    countbord.textContent = `${count} 回目`;
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}