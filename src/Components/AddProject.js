import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    categories: ['Design', 'Development', 'Deployment']
  }

  handleSubmit = (e) => {
    if(this.refs.title.value) {
      this.setState({newProject: {
        id: uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value
      }}, function() {
        this.props.addProject(this.state.newProject)
      });
    }

    e.preventDefault();
  }

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });

    return (
      <div>
        <h3>Add project</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>title</label><br />
            <input type="text" ref="title" />
          </div>
          
          <div>
            <label>category</label><br/>
            <select ref="category">
              {categoryOptions}
            </select>
          </div>

          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
