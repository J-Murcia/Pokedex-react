import React from "react";

const Pagination = (props) => {
    const {onLeftClick, onRightClick, page, totalPages} = props;

    return (
        <div className="pagination">
            <button>
                <div onClick={onLeftClick}><span role="img" aria-label="left">&#x2039;</span></div>
            </button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick}>
                <div><span role="img" aria-label="right">&#x203A;</span></div>
            </button>
        </div>
    )
}

export default Pagination;