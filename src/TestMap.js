import React from 'react';
import { forwardRef } from 'react';

const MyInput = forwardRef((props, ref) => {
    return <input ref={ref}/>;
});

export default MyInput;
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
    }
    render() {
        return <MyInput ref={this.myInput}/>;
    }
}