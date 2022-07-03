interface LoaderInt {
    baseLink: string;
    options: object | {};
}

interface Options {
    options?: object | {};
    endpoint: string;
}



interface Res {
    res: object | string;
    ok: string;
    status: number;
    statusText: string;
    json(): string;

}

type Callback = (data: string) => void;
type Load = (method: string, endpoint: string, callback: Callback, options: {}) => void;
type MakeUrl = (this: LoaderInt, options: object, endpoint: string) => string;

interface Url {
    options: object | string[] | {};
}

class Loader implements LoaderInt {

    baseLink: string;
    options: object | string | {};


    constructor(baseLink: string, options: object | {}) {
        this.baseLink = baseLink;
        this.options = options;
    }


    getResp(
        { endpoint, options = {} } : Options,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options as LoaderInt);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

        makeUrl: MakeUrl = function(options, endpoint) {
        const urlOptions = { ...this.options as object, ...options as object};
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback, options: LoaderInt) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
