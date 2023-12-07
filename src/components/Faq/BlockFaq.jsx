import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import { ReactComponent as Arrow } from "../../assets/img/arow.svg";
import { arrayOf, propTypes } from "prop-types";

/**
*   Компонент блока FAQ, в котором отображается вопрос/ответ.
*/
function BlockFaq({ data }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };
    return (
        <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="vertical"
            containerClassName="block_faq_m"
        >
            <div className="block_faq" onClick={handleClick}>
                <p>{data.front}</p>
                <Arrow fill="white" className="arrow" />
            </div>
            <div className="block_faq block_faq_active" onClick={handleClick}>
                <p>{data.back}</p>
                <Arrow
                    fill="black"
                    transform="scale(1, -1)"
                    className="arrow"
                />
            </div>
        </ReactCardFlip>
    );
}
BlockFaq.propTypes = {
    data: arrayOf(propTypes.object)
}

export default BlockFaq;
