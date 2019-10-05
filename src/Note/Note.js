import React from 'react';

import styles from './Note.module.css';

const Note = ({ note, handleDragStart }) => {
    return (
        <div className={styles.note} draggable={true} onDragStart={(e) => handleDragStart(e, note.id)}></div>
    );
}

export default Note;