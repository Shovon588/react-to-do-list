import React, { Component } from "react";
import "./App.css";
import Lists from "./Lists/Lists.js";

class App extends Component {
  state = {
    items: [],
    editing: false,
    editFor: -1,
  };

  changeHandler = (event) => {
    var cur_screen = document.getElementById("user-input").value;
    document.getElementById("check").innerHTML = cur_screen;
  };

  userInput = (event) => {
    var user_input = document.getElementById("user-input").value;
    var editing = this.state.editing;

    if (user_input === "") {
      alert("You need to add something.");
    } else {
      document.getElementById("user-input").value = "";
      document.getElementById("check").innerHTML = "";

      var new_state_items = this.state.items;

      if (editing) {
        var timestamp = this.state.editFor;
        var toEdit = new_state_items.filter(
          (obj) => obj.timestamp === timestamp
        )[0];

        var toEditIndex = new_state_items.indexOf(toEdit);

        new_state_items[toEditIndex].name = user_input;

        this.setState({
          items: new_state_items,
        });

        console.log(toEdit);
        this.editData(timestamp, user_input);
      } else {
        var time = Date.now();

        new_state_items.push({ name: user_input, timestamp: time, done: "" });

        this.setState({
          items: new_state_items,
        });

        this.postData(user_input, time);
      }
    }
  };

  editHandler = (timestamp) => {
    this.setState({
      editing: true,
      editFor: timestamp,
    });
    var cur_state = this.state.items;

    var toEdit = cur_state.filter((obj) => obj.timestamp === timestamp)[0];
    document.getElementById("user-input").value = toEdit.name;
  };

  editData = (timestamp, name) => {
    this.setState({
      editing: false,
      editFor: -1,
    });

    var url = "http://127.0.0.1:8000/patch/" + timestamp + "/name/";
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((response) => {
      console.log(response);
    });
  };

  deleteHandler = (timestamp) => {
    var cur_state = this.state.items;
    var toDelete = cur_state.filter((obj) => obj.timestamp === timestamp)[0];
    var indexToDelete = cur_state.indexOf(toDelete);
    cur_state.splice(indexToDelete, 1);

    this.setState({
      items: cur_state,
    });

    this.deleteData(timestamp);
  };

  deleteData = (timestamp) => {
    var url = "http://127.0.0.1:8000/delete/" + timestamp + "/";

    fetch(url, { method: "DELETE" }).then((response) => {
      console.log(response);
    });
  };

  postData = (user_input, time) => {
    var url = "http://127.0.0.1:8000/api/todos/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user_input, timestamp: time }),
    }).then((response) => {
      console.log(response);
    });
  };

  fetchData = () => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          items: result,
        });
      });
  };

  toggleStatusHandler = (timestamp) => {
    var new_state_items = this.state.items;

    var toToggle = new_state_items.filter(
      (obj) => obj.timestamp === timestamp
    )[0];

    var toToggleIndex = new_state_items.indexOf(toToggle);

    var done = "";
    if (new_state_items[toToggleIndex].done === "") {
      done = "line-through";
    }

    new_state_items[toToggleIndex].done = done;

    this.setState({
      items: new_state_items,
    });

    console.log(new_state_items);

    this.toggleStatus(timestamp, done);
  };

  toggleStatus = (timestamp, done) => {
    var url = "http://127.0.0.1:8000/patch/" + timestamp + "/done/";
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: done }),
    }).then((response) => {
      console.log(response);
    });
  };

  componentWillMount = () => {
    this.fetchData();
  };

  render() {
    let new_list = (
      <div>
        {this.state.items.map((item) => {
          return (
            <Lists
              value={item.timestamp}
              name={item.name}
              delete={() => this.deleteHandler(item.timestamp)}
              edit={() => this.editHandler(item.timestamp)}
              toggleStatus={() => this.toggleStatusHandler(item.timestamp)}
              style={{ textDecoration: item.done }}
            />
          );
        })}
      </div>
    );

    return (
      <div className="App">
        <div className="center-div">
          <div className="header-div">
            <h1>ToDo List</h1>
          </div>
          <div className="input-div">
            <input
              type="text"
              placeholder="Add an item..."
              autoFocus="autofocus"
              className="add-item"
              id="user-input"
              onChange={this.changeHandler}
            />

            <i
              className="fa fa-arrow-circle-right"
              onClick={this.userInput}
              style={{ fontSize: "45px" }}
            ></i>
          </div>

          <div className="list-div">
            <ul>{new_list}</ul>
            <p className="check" id="check"></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
