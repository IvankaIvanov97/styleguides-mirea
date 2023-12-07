import { useEffect, useRef, useState } from "react";
import why11 from "../../assets/img/why11.png";
import why22 from "../../assets/img/why22.png";
import { dataCard } from "../../services/export";

/**
*   Блок страницы "Почему мы"
*/
function WhyWe() {
    const [activeCard, setActiveCard] = useState(0);
    const [animation, setAnimation] = useState(false);

    const [width, setWidth] = useState();
    const refP = useRef();
    const refHr = useRef();
    useEffect(() => {
        setWidth(refP.current.clientWidth + refHr.current.clientWidth);
    });

    let timeout;
    const handleNumber = (i) => {
        if (timeout) {
            clearTimeout(timeout);
            return;
        }
        setAnimation(true);
        timeout = setTimeout(() => {
            setActiveCard(i);
            setAnimation(false);
        }, 500);
    };

    // useEffect(() => {
    //   setAnimation(true);
    //   let timeout = setTimeout(() => {
    //     setAnimation(false);
    //   }, 500);

    //   return () => clearTimeout(timeout);
    // }, [activeCard])

    const getRight = () => {
        const cardMargin = dataCard.length - 1 === activeCard ? 1 : 2;
        return -width * (dataCard.length - activeCard - cardMargin) - 30;
    };

    return (
        <section id="why_we">
            <img className="why1" src={why11} />
            <img className="why2" src={why22} />
            <div className="container">
                <h2>Почему мы?</h2>
                <hr
                    style={{ backgroundColor: dataCard[activeCard].color }}
                    className="up_hr"
                />
                <div className="why_block">
                    <h3 className={`${animation ? "hidden" : ""}`}>
                        {dataCard[activeCard].head}
                    </h3>
                    <p
                        className={`text_why_block${
                            animation ? " hidden" : ""
                        }`}
                    >
                        {dataCard[activeCard].text}
                    </p>
                    <div
                        style={{ right: `${getRight()}px` }}
                        className="under_wrapper"
                    >
                        {dataCard.map((el, i) => (
                            <>
                                <p
                                    ref={refP}
                                    onClick={() => handleNumber(i)}
                                    className={`white_p${
                                        activeCard === i ? " active_p" : ""
                                    }`}
                                >{`0${i + 1}`}</p>
                                <hr ref={refHr} className={`under_hr`} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyWe;
