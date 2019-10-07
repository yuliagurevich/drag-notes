import React from 'react';

const withHoc = (Component, data) => {
    return () => {
        return (
            <Component data={data} />
        );
    }
}

export default withHoc;