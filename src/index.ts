import UAParser from 'ua-parser-js';
import './style.scss';

const ua = new UAParser();
const deviceInfo = ua.getResult();

document.write(`<p>${JSON.stringify(deviceInfo)}</p>`);

// // @ts-ignore
// if (module.hot) {
//   // @ts-ignore
//   module.hot.accept();
// }
