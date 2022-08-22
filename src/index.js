import generateJoke from './generateJoke';
import './style/main.scss';
import laughing from './assets/laughing.jpg';

// eslint-disable-next-line no-undef
const laughingImg = document.getElementById('laughImg');
laughingImg.src = laughing;

console.log('Hi this is crazy');
generateJoke();
