import Rendering from './Rendering';
import Actions from './Actions';

const page = new Rendering();

page.bindToDOM(document.querySelector('.registration-container'), document.querySelector('.main-page'), document.querySelector('.warning-container'));
page.allBinding();

const act = new Actions(page);
act.init();
