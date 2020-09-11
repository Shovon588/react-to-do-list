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
      var time = Date.now();

      document.getElementById('user-input').value = "";
      document.getElementById('check').innerHTML = "";

      var new_state = this.state.items
      new_state.push({name:user_input, created:time})

      this.setState({
        items: new_state
      })
    }
  }

  changeHandler = (event) =>{
    var cur_screen = document.getElementById('user-input').value;
    document.getElementById('check').innerHTML = cur_screen;
  }


  deleteHandler = (event) =>{
    event.preventDefault();
    var key = event.target.value;
    var cur_state = this.state.items;

    console.log(cur_state)
    var toDelete = cur_state.indexOf(cur_state.filter(obj => obj.name===key)[0])
    cur_state.splice(toDelete, 1)

    console.log(cur_state)

    this.setState({
      items: cur_state
    })

  }

  render(){
    let new_list = (
      <div>
        {this.state.items.map(item => {
          return <Lists unique={item.name} name={item.name} click={this.deleteHandler}/>
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
            <input type="text" placeholder="Add an item..." className="add-item" id="user-input" onChange={this.changeHandler}/>
            <button className="add-item-btn" onClick={this.userInput}> + </button>
          </div>
          <div className="list-div">
            <ul>
              {new_list}
            </ul>

            <p className='check' id='check'></p>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
