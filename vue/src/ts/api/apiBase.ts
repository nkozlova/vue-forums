import axios from 'axios';

export default class CApiBase {
        basePath: string;
        startUrl: string;

        constructor(url = '') {
                this.basePath = import.meta.env.PUBLIC_SERVER || ''
                this.startUrl = url
        }

        getRoot(url: string) {
                return this.basePath + this.startUrl + url;
        }

        post(url: string, param: any = {}) {
                return axios.post(url, param)
        }
}
