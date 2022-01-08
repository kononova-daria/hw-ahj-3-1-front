export default class Rendering {
  constructor() {
    this.registrationForm = null;
    this.warning = null;
    this.mainPage = null;
    this.contacts = null;
    this.chatBox = null;
    this.inputField = null;
  }

  bindToDOM(registrationForm, mainPage, warning) {
    if (!(registrationForm instanceof HTMLElement)) throw new Error('Form is not HTMLElement');
    if (!(mainPage instanceof HTMLElement)) throw new Error('Page is not HTMLElement');
    if (!(warning instanceof HTMLElement)) throw new Error('Warning is not HTMLElement');
    this.registrationForm = registrationForm;
    this.mainPage = mainPage;
    this.warning = warning;
  }

  checkBinding() {
    if (this.registrationForm === null) throw new Error('Form not bind to DOM');
    if (this.mainPage === null) throw new Error('Page not bind to DOM');
    if (this.warning === null) throw new Error('Warning not bind to DOM');
  }

  allBinding() {
    this.checkBinding();
    this.contacts = this.mainPage.querySelector('.contacts-container');
    this.chatBox = this.mainPage.querySelector('.msg-container');
    this.inputField = this.mainPage.querySelector('.msg-input');
  }

  drawMsg(data, userName) {
    this.checkBinding();

    const divMsg = document.createElement('div');
    divMsg.classList.add('msg');
    if (data.user === userName) divMsg.classList.add('own-msg');
    this.chatBox.appendChild(divMsg);

    const divTitle = document.createElement('div');
    divTitle.classList.add('msg-title');
    if (data.user === userName) divTitle.classList.add('own');

    const date = new Date(data.date);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = date.getDate();
    if (day < 10) day = `0${day}`;
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    const created = `${hours}:${minutes} ${day}.${month}.${year}`;

    divTitle.textContent = data.user === userName ? `You, ${created}` : `${data.user}, ${created}`;
    divMsg.appendChild(divTitle);

    const divText = document.createElement('div');
    divText.classList.add('msg-text');
    divText.textContent = `${data.text}`;
    divMsg.appendChild(divText);
  }

  drawContacts(data, userName) {
    data.sort();
    const list = data.filter((item) => item !== userName);
    list.unshift(userName);

    this.contacts.innerHTML = '';

    for (let i = 0; i < list.length; i += 1) {
      const divContact = document.createElement('div');
      divContact.classList.add('contact');
      if (list[i] === userName) divContact.classList.add('own');
      divContact.textContent = list[i] === userName ? 'You' : `${list[i]}`;
      this.contacts.appendChild(divContact);
    }
  }
}
