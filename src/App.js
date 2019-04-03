import React, { Component } from 'react';
import './App.css';

let ToDoItems = [];
ToDoItems.push({index: 1, value: "To do home task from Math", done: false});
ToDoItems.push({index: 2, value: "Learn Docker", done: false});
ToDoItems.push({index: 3, value: "Go to the shop", done: false});
ToDoItems.push({index: 4, value: "Help cleaning", done: false});

class ToDoList extends Component{
  render(){
    var ToDoItems = this.props.items.map((item, index) => {
      return (<ToDoListItem key={index} item={item} index={index} 
      removeItem={this.props.removeItem} 
      markToDoDone={this.props.markToDoDone}/>)
    });
    return (
      <ul className="list-group">{ToDoItems}</ul>
    );
  }
}
class ToDoForm extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;
    if(newItemValue){
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render(){
    return(
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add new task...">
          <button type="submit" className="btn btn-default">Add</button>
        </input>
      </form>
    );
  }
}

class ToDoListItem extends Component{
  constructor(props){
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone(this);
  }

  onClickClose(){
    var index = parseInt(this.props.index)
    this.props.removeItem(index);
  }

  onClickDone(){
    let index = parseInt(this.props.index)
    this.props.markToDoDone(index)
  }

  render(){
    let todoClass = this.props.item.done ? "done" : "undone";
    return(
      <li className="list-group-item">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true"
          onClick={this.onClickDone}>
            {this.props.item.value}
            <button type="button" className="close" onClick={this.onClickClose}>
              &times;
            </button>
          </span>
        </div>
      </li>
    );
  }
}

class ToDoHeader extends Component{
  render(){
    return (<h1> Hello from ToDo list! </h1>);
  }
}

class ToDoApp extends Component{
  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markToDoDone = this.markToDoDone.bind(this);
    this.state = { ToDoItems : ToDoItems };
  }
  addItem(todoItem){
    ToDoItems.unshift({
      index: ToDoItems.length + 1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({ToDoItems : ToDoItems});
  }
  removeItem(itemIndex){
    ToDoItems.splice(itemIndex, 1);
    this.setState({ToDoItems : ToDoItems})
    }
  markToDoDone(itemIndex){
    let task = ToDoItems[itemIndex];
    ToDoItems.splice(itemIndex, 1);
    task.done = !task.done;
    task.done ? ToDoItems.push(task) : ToDoItems.unshift(task);
    this.setState({ToDoItems : ToDoItems});
    }
    render(){
      return(
        <div id="main">
          <ToDoHeader>
          </ToDoHeader>
          <ToDoList items={this.props.initItems} 
          removeItem={this.removeItem} 
          markToDoDone={this.markToDoDone}>
          </ToDoList>
          <ToDoForm addItem={this.addItem}>
          </ToDoForm>
        </div>
      );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoApp initItems={ToDoItems}>

        </ToDoApp>
      </div>
    );
  }
}

export default App;
