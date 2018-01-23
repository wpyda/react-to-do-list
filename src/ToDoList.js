import React from 'react'
import {database} from './firebase'

import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List';

import {Card, CardHeader, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const Task = (props) => (

    <ListItem
        style={
            props.taskDone === false ?
                {textDecoration: 'none'}
                :
                {textDecoration: 'line-through'}
        }
        primaryText={props.taskName}
        rightIcon={
            <ActionDelete
                onClick={() => props.deleteTask(props.taskId)}/>}
        onClick={() => props.toggleDone(props.taskId, props.taskDone)}
    />
)

class ToDoList extends React.Component {

    state = {
        text: '',
        tasks: null,
        taskName: '',
        taskSelect: 0
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

        database.ref('/ToDoList-Homework')
            .push({task: this.state.text, done: false})
        this.setState({
            text: ''
        })
    }

    deleteTask = (taskId) => {
        database.ref(`/ToDoList-Homework/${taskId}`).remove()
    }

    toggleDone = (taskId, taskDone) => {
        database.ref(`/ToDoList-Homework/${taskId}`)
            .update({done: !taskDone})
            .then()
    }

    searchTask = (event, value) => {
        this.setState({taskName: value})
    }

    selectTask = (event, index, value) => this.setState({
        tasksSelect: value
    })

    render() {
        return (
            <div>
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
                        this.state.tasks
                            .filter((el) => el.task.indexOf(this.state.taskName) !== -1)
                            .filter((el) => (
                                this.state.tasksSelect === 0 ?
                                    true
                                    :
                                    this.state.tasksSelect === 1 ?
                                        el.done===false
                                        :
                                        el.done===true
                            ))
                            .map((task) => (
                            <Task
                                taskName={task.task}
                                taskId={task.key}
                                key={task.key}
                                deleteTask={this.deleteTask}
                                taskDone={task.done}
                                toggleDone={this.toggleDone}
                            />
                        ))
                    }

                </List>

                <Card>
                    <CardHeader
                        title="Filter"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true} style={{textAlign: 'left'}}>
                        <TextField
                            floatingLabelText="Find"
                            fullWidth={true}
                            onChange={this.searchTask}
                        />
                        <SelectField
                            floatingLabelText="Select status"
                            onChange={this.selectTask}
                            value={this.state.tasksSelect}
                        >
                            <MenuItem value={0} primaryText="ALL" style={{color: "#blue"}}/>
                            <MenuItem value={1} primaryText="UNDONE"/>
                            <MenuItem value={2} primaryText="DONE"/>
                        </SelectField>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default ToDoList