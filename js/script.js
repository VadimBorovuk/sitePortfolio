let btnMenu = document.getElementById('btnMenu');
let popup = document.getElementById('nav_popup');
btnMenu.addEventListener('click', function() {
  this.classList.toggle('menu-btn-active');
  popup.classList.toggle('active');
});

class ValidateForm {
  constructor(form, formElement) {
    this.form = form ? document.querySelector(`${form}`) : undefined;
    this.formElement = formElement
      ? this.form.querySelectorAll(`${formElement}`)
      : undefined;
    this.types = {
      name: /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/,
      number: /[0-9]/,
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      text: /.+/
    };
  }
  validateLogic() {
    this.formElement.forEach(item => {
      item.addEventListener(
        'focus',
        (focus = () => {
          item.style.cssText = 'border-bottom: 2px solid #02cfb4';
          let regEx;

          function valid() {
            if (!regEx.test(item.value)) {
              item.style.cssText = 'border: 4px solid #cf5402';
            } else {
              item.style.cssText = 'border: 4px solid #02cfb4';
            }
          }
          switch (item.dataset.id) {
            case 'name':
              regEx = this.types.name;
              item.addEventListener('input', valid);
              break;
            case 'number':
              regEx = this.types.number;
              item.addEventListener('input', valid);
              break;
            case 'email':
              regEx = this.types.email;
              item.addEventListener('input', valid);
              break;
            case 'message':
              regEx = this.types.text;
              item.addEventListener('input', valid);
              break;
          }
        })
      );
      item.addEventListener('blur', function refocus() {
        if (item.value !== '') {
          item.style.cssText = 'border-bottom: 4px solid #58616d';
        } else {
          item.style.cssText = 'border-bottom: 4px solid #58616d';
        }
      });
    });
  }
}

//btnMessage
let btnMessage = document.querySelector('#btnMessage');

btnMessage.addEventListener('click', function() {
  alert('Отправлено');
});

//skils bar
function skillBar() {
  let element = document.querySelectorAll('.skills-block__list_internal li');
  element.forEach(item => {
    let barLine = item.querySelectorAll('.bar-line')[0];
    let procent = item.querySelectorAll('.procent')[0];
    let left = procent.dataset.left;
    let width = barLine.dataset.width;
    let edge = barLine.dataset.edge;

    let id = setInterval(frame, 15);

    function frame() {
      if (width >= edge) {
        clearInterval(id);
      } else {
        width++;
        left++;
        barLine.style.width = width + '%';
        procent.style.left = left + '%';
        procent.innerHTML = width + '%';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let validateForm = new ValidateForm('.divForma', '[data-id]');
  validateForm.validateLogic();
});

document.querySelector('.bNext').addEventListener('click', () => {
  setTimeout(skillBar, 100);
});
