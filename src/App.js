import React, { Component } from 'react';

import Note from './Note/Note';

import WithHoc from './hoc_1/WithHoc';
import withHoc from './hoc_2/withHoc';

import './App.css';

const initNotes = [{
    id: Date.now().toString(),
    header: '',
    note: '',
}];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: props.data,
            createdNotes: 0,
        }
    }

    clone = (items) => items.map(item => Array.isArray(item) ? this.clone(item) : item);
    
    handleCreateNote = () => {
        const { notes } = this.state;
        
        let _notes = this.clone(notes);
        
        _notes.unshift({
            id: Date.now().toString(),
            header: '',
            note: '',
        });
        
        this.setState((state, props) => {
            return {
                notes: _notes,
                createdNotes: state.createdNotes + 1
            }
        });
    }
    
    handleDragStart(event, noteId) {
        event.dataTransfer.setData("text/plain", noteId);
    }
    
    handleDragOver(event) {
        event.preventDefault();
    }
    
    handleDeleteNote(event) {
        const { notes } = this.state;
        let _notes = this.clone(notes);
        
        const noteId = event.dataTransfer.getData("text");
        
        let result = _notes.filter((note) => note.id !== noteId);
        
        this.setState({
            notes: result
        });
    }
    
    renderNotes = (notes) => {
        return notes.map((note) => {
            return <WithHoc key={note.id}><Note note={note} handleDragStart={this.handleDragStart} /></WithHoc>
        });
    }
    
    render() {
        console.log(`[App.js] render runs...`);
        
        const { notes } = this.state;

        return (
            <React.StrictMode>
                <div id="container">
                    <div id="note-board">
                        {this.renderNotes(notes)}
                    </div>
                    <div
                        id="trash-can"
                        onDragOver={(e) => this.handleDragOver(e)}
                        onDrop={(e) => this.handleDeleteNote(e)} >trash</div>
                    <button id="add-note-button" onClick={this.handleCreateNote}>+</button>
                </div>
            </React.StrictMode>
        );
    }
}

export default withHoc(App, initNotes);
