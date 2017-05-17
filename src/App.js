import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err)
      }
    });
  }

  getProjects() {
    this.setState({projects: [
        {
          id: uuid.v4(),
          title: 'Website type A',
          category: 'Website A'
        },
        {
          id: uuid.v4(),
          title: 'Website type B',
          category: 'Website B'
        },
        {
          id: uuid.v4(),
          title: 'Website type C',
          category: 'Website C'
        }
    ]});
  }

  componentWillMount() {
    this.getProjects();
  }

  componentDidMount() {
    this.getTodos()
  }

  handleAddProject = (project) => {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  handleDeleteProject = (id) => {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);

    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject} />
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
