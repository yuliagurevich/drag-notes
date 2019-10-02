import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
    }
  }

  clone = (items) => items.map(item => Array.isArray(item) ? this.clone(item) : item);

  renderNotes = (notes) => {
    return notes.map((note) => {
      return <div className="note"></div>
    });
  }

  handleCreateNote = () => {
    console.log(">>> got here");
    
    const { notes } = this.state;

    let _notes = this.clone(notes);

    _notes.unshift({
      header: '',
      note: '',
    });

    this.setState({
      notes: _notes
    }, () => console.log(this.state.notes));
  }

  render() {
    const { notes } = this.state;

    return (
     <div id="container">
       <div id="trash-can" >trash</div>
       <div id="note-board">
         {this.renderNotes(notes)}
       </div>
       <button id="add-note-button" onClick={this.handleCreateNote}>+</button>
     </div>
   );
  }
}

export default App;
