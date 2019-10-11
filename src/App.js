import React, { Component, Profiler, useCallback } from 'react';

import Note from './Note/Note';

import WithHoc from './hoc_1/WithHoc';
import withHoc from './hoc_2/withHoc';

import './App.css';

const date = new Date();

const initNotes = [{
    id: date,
    header: date,
    text: '',
}];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: props.data,
            createdNotes: 0,
        }

        this.handleCreateNote = this.handleCreateNote.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.handleNoteTextChange = this.handleNoteTextChange.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    clone = (items) => items.map(item => Array.isArray(item) ? this.clone(item) : item);
    
    handleCreateNote () {
        const { notes } = this.state;
        
        let _notes = this.clone(notes);

        const date = new Date();
        
        _notes.push({
            id: date,
            header: date,
            text: '',
        });
        
        this.setState((state) => {
            return {
                notes: _notes,
                createdNotes: state.createdNotes + 1
            }
        });
    }

    handleNoteTextChange (event, noteId) {
        console.log(noteId);
        
        const { notes } = this.state;
        let _notes = [...notes];

        let note = _notes.find((note) => note.id === noteId);
        note.text = event.target.value;

        this.setState(() => {
            return { notes: _notes }
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

    handleRender (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
        console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions);
    }
    
    renderNotes(notes) {
        return notes.map((note) => {
            return (
                <Note
                    key={note.id}
                    noteId={note.id}
                    noteHeader={note.header}
                    noteText={note.text}
                    onNoteTextChange={this.handleNoteTextChange}
                    onDragStart={this.handleDragStart}
                />
            );
        });
    }
    
    render() {
        console.log(`[App.js] render runs...`);
        
        const { notes } = this.state;

        return (
            
                <div id="container">
                    <div id="note-board">
                        {this.renderNotes(notes)}
                    </div>
                    <div
                        id="trash-can"
                        onDragOver={this.handleDragOver}
                        onDrop={this.handleDeleteNote}
                    >trash
                    </div>
                    <button id="add-note-button" onClick={this.handleCreateNote}>+</button>
                </div>
            
        );
    }
}

export default withHoc(App, initNotes);

{/* <Profiler id="app" onRender={this.handleRender}></Profiler>
</Profiler> */}