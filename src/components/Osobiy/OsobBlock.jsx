import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { arrayOf, propTypes } from "prop-types";

/**
*   Компонент блока "Особенности"
*/
function OsobBlock({ data, isFlipped }) {
    const [localIsFlipped, setLocalIsFlipped] = useState(isFlipped);

    useEffect(() => {
        setLocalIsFlipped(isFlipped);
        const timeoutId = setTimeout(() => {
            setLocalIsFlipped(false);
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, [isFlipped]);

    const handleClick = (e) => {
        e.preventDefault();
        setLocalIsFlipped(!localIsFlipped);
    };
    return (
        <ReactCardFlip isFlipped={localIsFlipped} flipDirection="horizontal">
            <div className="osob_block" onClick={handleClick}>
                <p>{data.front}</p>
            </div>
            <div className="osob_block osob_block_white" onClick={handleClick}>
                <p>{data.back}</p>
            </div>
        </ReactCardFlip>
    );
}
OsobBlock.propTypes = {
    data: arrayOf(propTypes.object),
    isFlipped: propTypes.bool
}

export default OsobBlock;
