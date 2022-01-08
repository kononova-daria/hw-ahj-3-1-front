export default class Actions {
  constructor(page) {
    this.ws = null;
    this.page = page;
    this.user = null;
  }

  init() {
    this.page.registrationForm.addEventListener('click', (event) => {
      this.registration(event);
    });
    this.page.warning.addEventListener('click', (event) => {
      this.closeWarning(event);
    });
    this.page.inputField.addEventListener('keydown', (event) => {
      this.sendMsg(event);
    });

    this.connection();
  }

  connection() {
    // this.ws = new WebSocket('ws://localhost:7020/ws');
    this.ws = new WebSocket('wss://hw-ahj-3-1-back.herokuapp.com/ws');

    this.ws.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);

      if (response.event === 'successfulLogin') {
        this.page.registrationForm.classList.add('hidden');
        this.page.mainPage.classList.remove('hidden');
        this.page.drawContacts(response.data, this.user);
      }

      if (response.event === 'failedLogin') {
        this.user = null;
        this.page.warning.classList.remove('hidden');
        this.page.warning.querySelector('.warning').innerHTML = '&#9888; Данное имя уже занято. Пожалуйста, выберите другое.';
      }

      if (response.event === 'newUser') {
        this.page.drawContacts(response.data, this.user);
      }

      if (response.event === 'newMessage') {
        this.page.drawMsg(response.data, this.user);
      }

      if (response.event === 'disconnectedUser') {
        this.page.drawContacts(response.data, this.user);
      }
    });
  }

  registration(event) {
    event.preventDefault();
    if (event.target.classList.contains('registration-btn')) {
      this.user = this.page.registrationForm.querySelector('.registration-input').value;
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          event: 'login',
          data: this.user,
        }));
        this.page.registrationForm.querySelector('.registration-input').value = '';
      } else {
        this.page.warning.classList.remove('hidden');
        this.page.warning.querySelector('.warning').innerHTML = '&#9888; Соедение прервано.';
      }
    }
  }

  closeWarning(event) {
    event.preventDefault();
    if (event.target.classList.contains('close-btn')) {
      this.page.warning.classList.add('hidden');
    }
  }

  sendMsg(event) {
    if (event.keyCode === 13 && this.page.inputField.value) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          event: 'sendMessage',
          data: {
            user: this.user,
            text: this.page.inputField.value,
          },
        }));
        this.page.inputField.value = '';
      } else {
        this.page.warning.classList.remove('hidden');
        this.page.warning.querySelector('.warning').innerHTML = '&#9888; Соедение прервано.';
      }
    }
  }
}
