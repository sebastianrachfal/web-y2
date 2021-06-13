import App from './classes/App';
import './styles/__index.scss';

(window as Window & typeof globalThis & { app: App }).app = new App();
