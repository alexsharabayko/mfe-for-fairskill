import {App, Component, createApp} from 'vue';

interface InitParams {
    token?: string;
}

export class ExternalApp {
    private app?: App;

    constructor(private AppComponent: Component) {
    }

    init(params?: InitParams): ExternalApp {
        this.app = createApp(this.AppComponent);

        return this;
    }

    attach(elem: Element): ExternalApp {
        this.app && this.app.mount(elem);

        return this;
    }

    detach(): ExternalApp {
        this.app && this.app.unmount();

        return this;
    }
}
