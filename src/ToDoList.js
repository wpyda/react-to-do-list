import React from 'react'
import {database} from './firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List';

const Task = (props) => (

    <ListItem
        primaryText={props.taskName}
        rightIcon={
            <ActionDelete
                onClick={() => props.deleteTask(props.taskId)}/>}
    />
)

const style = {
    margin: 25,
    padding: 25,
    textAlign: 'center'
}

class ToDoList extends React.Component {

    state = {
        text: '',
        tasks: null
    }

    componentWillMount() {
        database.ref('/ToDoList-Homework').on(
            'value', (snapshot) => {
                const tasksArray = Object.entries(
                    snapshot.val() || {}
                ).map(([key, value]) => {
                    value.key = key
                    return value
                })

                this.setState({tasks: tasksArray})
            }
        )
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

    deleteTask = (taskId) => {
        database.ref(`/ToDoList-Homework/${taskId}`).remove()
    }

    render() {
        return (
            <MuiThemeProvider>
                <Paper zDepth={4} style={style}>
                    <h1>To Do List</h1>

                    <TextField
                        hintText="Type here"
                        floatingLabelText="What do you want to do today?"
                        fullWidth={true}
                        onChange={this.updateTask}
                        value={this.state.text}
                    />

                    <RaisedButton
                        label="Submit"
                        primary={true}
                        fullWidth={true}
                        onClick={this.submitTask}
                    />

                    <List style={{textAlign: 'left'}}>
                        {
                            this.state.tasks
                            &&
                            this.state.tasks.map((task) => (
                                <Task
                                    taskName={task.task}
                                    taskId={task.key}
                                    key={task.key}
                                    deleteTask={this.deleteTask}
                                />
                            ))
                        }

                    </List>

                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default ToDoList