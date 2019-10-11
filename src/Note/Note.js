import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Note.module.css';

const Note = (props) => {
    const {
        noteId,
        noteHeader,
        noteText,
        isVisible,
        onNoteTextChange,
        onDragStart,
    } = props;

    console.log(`[Note.js] ${noteId} render runs...`);

    const [angle] = useState(3 - Math.random() * 6);

    const style = {
        transform: `rotateZ(${angle}deg)`
    };

    const transitionTiming = {
        appear: 300,
        enter: 300,
        exit: 300,
    };

    const transitionClasses = {
        appear: styles.StartAddNote,
        appearActive: styles.AddNote,
        enter: styles.StartAddNote,
        enterActive: styles.AddNote,
        exit: styles.StartDeleteNote,
        exitActive: styles.DeleteNote,
    };
    
    return (
        <CSSTransition
            appear={true}
            exit
            mountOnEnter
            unmountOnExit
            timeout={transitionTiming}
            in={isVisible}
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
        prevProps.noteHeader === nextProps.noteHeader &&
        prevProps.isVisible === nextProps.isVisible
    );
}

export default React.memo(Note, areEqual);
//export default React.memo(Note);
//export default Note;