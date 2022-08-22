import generateJoke from './generatejoke';
import './style/main.scss';
import laughing from './assets/laughing.jpg';

const laughingImg  = document.getElementById('laughImg');
    laughingImg.src = laughing;

console.log(generateJoke());