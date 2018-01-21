import React from 'react'
import {database} from './firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List';

const style = {
    margin: 20,
    padding: 20,
    textAlign: 'center'
};

class ToDoList extends React.Component {

    state = {
        text: '',
    }

    updateTask = (event, value) => {
        this.setState({text: value})
    }

    submitTask = () => {
        if (!this.state.text) {
            alert('Empty field. Please update.')
            return
        }

        database.ref('/ToDoList-Homework').push({task: this.state.text})
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <MuiThemeProvider >
                <Paper zDepth={4} style={style}>

                    <TextField
                        hintText="Type here"
                        floatingLabelText="What do you want to do today?"
                        fullWidth={true}
                        onChange={this.updateTask}
                        value={this.state.text}
                    />

                    <RaisedButton
                        label="Submit"
                        secondary={true}
                        fullWidth={true}
                        onClick={this.submitTask}
                    />

                        <List>
                            <ListItem
                                primaryText="Wyrzucić śmieci"
                            />

                        </List>

                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default ToDoList