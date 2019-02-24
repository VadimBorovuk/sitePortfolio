class Slider {
  constructor(
    wrapSlide1,
    wrapSlide2,
    slide1,
    slide2,
    btnPrev,
    btnNext,
    dishes
  ) {
    this.btnPrev = btnPrev ? document.querySelector(`${btnPrev}`) : undefined;
    this.btnNext = btnNext ? document.querySelector(`${btnNext}`) : undefined;
    this.wrapSlide1 = wrapSlide1
      ? document.querySelector(`${wrapSlide1}`)
      : undefined;
    this.wrapSlide2 = wrapSlide2
      ? document.querySelector(`${wrapSlide2}`)
      : undefined;
    this.slide1 = slide1 ? document.querySelectorAll(`${slide1}`) : undefined;
    this.slide2 = slide2 ? document.querySelectorAll(`${slide2}`) : undefined;
    this.dishes = dishes ? document.querySelectorAll(`${dishes}`) : undefined;
    this.wrapSlide1Width = this.slide1 ? this.slide1.length * 100 : undefined;
    this.wrapSlide2Width = this.slide2 ? this.slide2.length * 100 : undefined;
    this.slide1Width = this.slide1 ? 100 / this.slide1.length : undefined;
    this.slide2Width = this.slide2 ? 100 / this.slide2.length : undefined;
    this.arrPush = [];

    this.wrapSlide1
      ? (this.wrapSlide1.style.width = `${this.wrapSlide1Width}%`)
      : undefined;
    this.wrapSlide2
      ? (this.wrapSlide2.style.width = `${this.wrapSlide2Width}%`)
      : undefined;
    this.slide1
      ? this.slide1.forEach(item => {
          item.style.width = `${this.slide1Width}%`;
        })
      : undefined;
    this.slide2
      ? this.slide2.forEach(item => {
          item.style.width = `${this.slide2Width}%`;
        })
      : undefined;

    for (let i = 0; i <= 100; i += this.slide1Width) {
      this.arrPush.push(i);
    }
  }

  logicSlider() {
    let arrPosition = [...this.arrPush],
      counter = 0,
      delNull = arrPosition.pop();

    let set = pos => {
      this.wrapSlide1
        ? (this.wrapSlide1.style.transform = `translateX(-${pos}%)`)
        : undefined;
      this.wrapSlide2
        ? (this.wrapSlide2.style.transform = `translateX(-${pos}%)`)
        : undefined;
    };
    let init = () => {
      set(arrPosition[counter]);
    };
    let prev = () => {
      counter--;
      if (counter < 0) counter = arrPosition.length - 1;
      set(arrPosition[counter]);
    };
    let next = () => {
      counter++;
      if (counter === arrPosition.length) counter = 0;
      set(arrPosition[counter]);
    };
    let dishesNav = () => {
      for (let i = 0; i < this.dishes.length; i++) {
        this.dishes[i].addEventListener('click', e => {
          counter = i;
          set(arrPosition[counter]);
          this.dishes.forEach(el => {
            el.classList.remove('active');
          });
          this.dishes[i].classList.add('active');
        });
      }
    };
    if (this.dishes) {
      dishesNav();
    }
    if (this.btnPrev || this.btnNext) {
      this.btnPrev.addEventListener('click', prev);
      this.btnNext.addEventListener('click', next);
    }

    return init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let slider = new Slider(
    '.slider-block',
    '',
    '.slide',
    '',
    '#btnPrev',
    '#btnNext',
    ''
  );
  slider.logicSlider();
});
