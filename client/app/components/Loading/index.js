import React from 'react';

const Loading = React.memo(function Loading() {
    return (
        <div className="fa-3x d-flex justify-content-center">
            <i className="fas fa-sync fa-spin"></i>
        </div>
    );
})

export default Loading;