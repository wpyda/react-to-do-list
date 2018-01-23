import React, {Component} from 'react';
import ToDoList from './ToDoList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'

const style = {
    margin: 25,
    padding: 25,
    textAlign: 'center'
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={4} style={style}>
                    <ToDoList/>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
