import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '88b2b6a45c43410cb4356b244302a035', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
