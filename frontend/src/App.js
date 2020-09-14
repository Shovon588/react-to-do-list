import React, {Component} from 'react';
import './App.css';
import Lists from './Lists/Lists.js'


class App extends Component {

  state = {
    items: [],
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

      this.postData(user_input, time)
    }
  }

  changeHandler = (event) =>{
    var cur_screen = document.getElementById('user-input').value;
    document.getElementById('check').innerHTML = cur_screen;
  }


  deleteHandler = (event) =>{
    event.preventDefault();
    var key = event.target.value;
    console.log(key)
    var cur_state = this.state.items;

    var toDelete = cur_state.filter(obj => obj.timestamp===key)[0]
    var indexToDelete = cur_state.indexOf(toDelete)
    cur_state.splice(indexToDelete, 1)


    this.setState({
      items: cur_state
    })

    // this.deleteData(toDelete.id)

  }

  deleteData = (id) => {
    var url = "http://127.0.0.1:8000/api/todos/" + id + "/"
    fetch(url, {method: "DELETE",}).then(response => {
          console.log(response)
        })
      }

  postData = (user_input, time) => {
    var url = "http://127.0.0.1:8000/api/todos/"
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: user_input, timestamp: time})
    }).then(response => {
      console.log(response)
    })
  }

  fetchData = () => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          })

          console.log(result)
        });
    }

  componentWillMount = () => {
    this.fetchData()
  }


  render(){

    let new_list = (
      <div>
        {this.state.items.map(item => {
          return <Lists value={item.timestamp} name={item.name} click={this.deleteHandler}/>
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
