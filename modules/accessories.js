const form = document.querySelector('.add-new');
const contactSection = document.querySelector('.contact-section');
const bookSection = document.querySelector('.book-list');

const initialise = () => {
  form.classList.add('hide');
  contactSection.classList.add('hide');
};

const navigate = (key) => {
  switch (key) {
    case 'nav-list':
      bookSection.classList.remove('hide');
      form.classList.add('hide');
      contactSection.classList.add('hide');
      break;
    case 'nav-add':
      bookSection.classList.add('hide');
      form.classList.remove('hide');
      contactSection.classList.add('hide');
      break;
    case 'nav-contact':
      bookSection.classList.add('hide');
      form.classList.add('hide');
      contactSection.classList.remove('hide');
      break;
    default:
      break;
  }
};

export { initialise, navigate };