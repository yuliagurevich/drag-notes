import React, { Component } from 'react';

import Note from './Note/Note';

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
            return <Note key={note.id} note={note} handleDragStart={this.handleDragStart} />
        });
    }

    handleCreateNote = () => {
        const { notes } = this.state;

        let _notes = this.clone(notes);

        _notes.unshift({
            id: Date.now().toString(),
            header: '',
            note: '',
        });

        this.setState({
            notes: _notes
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

    render() {
        const { notes } = this.state;

        return (
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
        );
    }
}

export default App;
