import React, {Component} from 'react'
import ToDoList from './ToDoList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'

const style = {
    margin: 25,
    padding: 25,
    textAlign: 'center'
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        style={{textAlign: 'center'}}
                        showMenuIconButton={false}
                        title="React ToDoList"
                    />
                    <Paper zDepth={4} style={style}>
                        <ToDoList/>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
