import React from 'react';

import styles from './Note.module.css';

const Note = ({ note, handleDragStart }) => {
    
    console.log(`[Note.js] ${note.id} render runs...`);
    
    return (
        <div className={styles.note} draggable={true} onDragStart={(e) => handleDragStart(e, note.id)}></div>
    );
}

function areEqual(prevProps, NextProps) {
        return prevProps.note.id === NextProps.note.id;
    }

//export default Note;
export default React.memo(Note, areEqual);