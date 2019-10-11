import React, { Component, Profiler, useCallback } from 'react';
import { TransitionGroup } from 'react-transition-group';

import Note from './Note/Note';

import WithHoc from './hoc_1/WithHoc';
import withHoc from './hoc_2/withHoc';

import './App.css';

const initNotes = [{
    id: Date.now().toString(),
    header: new Date(),
    text: '',
    isVisible: true,
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
        this.handleNoteDrop = this.handleNoteDrop.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    // clone = (items) => items.map(item => Array.isArray(item) ? this.clone(item) : item);
    
    handleCreateNote () {
        const { notes } = this.state;
        let _notes = [...notes];

        _notes.push({
            id: Date.now().toString(),
            header: new Date(),
            text: '',
            isVisible: true,
        });
        
        this.setState((state) => {
            return {
                notes: _notes,
                createdNotes: state.createdNotes + 1,
            }
        });
    }

    handleNoteTextChange (event, noteId) {
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
    
    handleNoteDrop(event) {
        const { notes } = this.state;
        let _notes = [...notes];
        
        const noteId = event.dataTransfer.getData("text");
        let note = _notes.find((note) => note.id === noteId);
        note.isVisible = false;

        this.setState(() => {
            return {
                notes: _notes,
            };
        }, () => {
            this.handleDeleteNote(noteId)
        });
    }

    handleDeleteNote(noteId) {
        const { notes } = this.state;
        let _notes = [...notes];
        
        let updatedNotes = _notes.filter(note => note.id !== noteId);
        this.setState(() => {
            return {
                notes: updatedNotes,
            }
        })
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
                    isVisible={note.isVisible}
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
                    <TransitionGroup component={'div'} id="note-board">
                        {this.renderNotes(notes)}
                    </TransitionGroup>
                    <div
                        id="trash-can"
                        onDragOver={this.handleDragOver}
                        onDrop={this.handleNoteDrop}
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