import React from "react";

import wave from "../../assets/img/wave.gif";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/slicers/modalSlicer";

/**
*   ГОВНО ЕБАНОЕ
*/
function Buhmain() {
    const dispatch = useDispatch();

    return (
        <section id="Buhmain">
            <div className="container">
                <div className="heading">
                    <h1>Бухгалтерия маркетплейсов</h1>
                    <p>
                        Современный комплексный индивидуальный подход,
                        длительное сотрудничество, юридическая и IT поддержка
                        клиентов, автоматизация процессов, страхование
                        ответственности, безопасность данных
                    </p>
                    <div className="heading_but">
                        <button
                            className="but_main but"
                            onClick={() => dispatch(setModal(1))}
                        >
                            Стать клиентом
                        </button>
                        <AnchorLink href="#osobiy" className="but_main2 but">
                            Подробнее
                        </AnchorLink>
                    </div>
                </div>
            </div>
            <img className="buhmain_img" alt="img" src={wave} />
            <img className="buhmain2_img" alt="img" src={wave} />
        </section>
    );
}

export default Buhmain;
