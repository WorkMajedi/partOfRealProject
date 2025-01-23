import * as React from 'react';

import Index from '../common/Loader';

// eslint-disable-next-line no-promise-executor-return
const sleep = (m: number) => new Promise(r => setTimeout(r, m));

// eslint-disable-next-line @typescript-eslint/naming-convention
type componentType = React.ComponentClass<any> | null;

interface IAsyncState {
    component: componentType;
}

export default function asyncComponent(importComponent: any) {
    class AsyncComponent extends React.Component<any, IAsyncState> {
        constructor(props: any) {
            super(props);
            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            //wait sleep(process.env.NODE_ENV === 'development' ? 150 : 0);

            const { default: component } = await importComponent();

            this.setState({
                component,
            });
        }

        render() {
            // eslint-disable-next-line react/destructuring-assignment
            const C: componentType = this.state.component;

            return C ? <C {...this.props} /> : <Index />;
        }
    }

    return AsyncComponent;
}
