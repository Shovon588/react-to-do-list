import React, {Component} from 'react';
import './App.css';
import Lists from './Lists/Lists.js'


class App extends Component {

  state = {
    items: []
  }

  userInput = (event) => {
    var user_input = document.getElementById('user-input').value;

    if (user_input === ""){
      alert("You need to add something.")
    }
    else{
      document.getElementById('user-input').value = "";
      console.log(user_input)
      var new_state = this.state.items
      new_state.push(user_input)

      this.setState({
        items: new_state
      })

      console.log(this.state.items)
    }
  }


  render(){
    let new_list = (
      <div>
        {this.state.items.map(item => {
          return <Lists item={item}/>
        })}
      </div>
    )

    return (

      <div className="App">
        <div className="center-div">
          <div className="header-div">
            <h1>ToDo List</h1>
          </div>
          <div className="input-div">
            <input type="text" placeholder="Add an item..." className="add-item" id="user-input"/>
            <button className="add-item-btn" onClick={this.userInput}> + </button>
          </div>
          <div className="list-div">
            <ul>
              {new_list}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
