import React, { useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import styles from './Note.module.css';

const Note = (props) => {
    const {
        noteId,
        noteHeader,
        noteText,
        onNoteTextChange,
        onDragStart,
    } = props;

    console.log(`[Note.js] ${noteId} render runs...`);

    const [angle] = useState(3 - Math.random() * 6);

    const style = {
        transform: `rotateZ(${angle}deg)`
    };

    const transitionTiming = {
        enter: 300,
        exit: 1000,
    };

    const transitionClasses = {
        enter: '',
        enterActive: '',
        exit: '',
        exitActive: '',
        appear: styles.AddNote,
    };
    
    return (
        <CSSTransition
        appear={true}
        mountOnEnter
        unmountOnExit
        timeout={transitionTiming}
        in={noteId !== undefined}
        classNames={transitionClasses}
        >
            <div
                style={style}
                className={styles.Note}
                draggable={true}
                onDragStart={(event) => onDragStart(event, noteId)}
            >
                <h1 className={styles.NoteHeader}>
                    {noteHeader.toLocaleString('he-IL', { timeZone: 'UTC' })}
                </h1>
                <textarea
                    className={styles.NoteTextArea}
                    onChange={(event) => onNoteTextChange(event, noteId)}
                    value={noteText}
                />
            </div>
        </CSSTransition>
    );
}

const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.noteText === nextProps.noteText &&
        prevProps.noteHeader === nextProps.noteHeader
    );
}

export default React.memo(Note, areEqual);
//export default React.memo(Note);
//export default Note;