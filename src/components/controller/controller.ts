import AppLoader from './appLoader';
import { HtmlTagObject } from 'html-webpack-plugin';
import { WatchEventType } from 'fs';

type CallBack = ()=> void

interface E {
    target: HTMLElement;
    currentTarget: HTMLElement;
}

interface Target {
    parentNode: HTMLElement;
    classList: HTMLElement;
}

class AppController extends AppLoader {
    getSources(callback: CallBack) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: E, callback: CallBack) {
        let target = e.target;
        const newsContainer: HTMLElement = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id')!;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
