import React from "react";

import telegram from "../../assets/img/telegram.svg";
import wa from "../../assets/img/wa.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { nav } from "../../services/export";
import { domen } from "../../services/api";

/**
*   Подвал страницы
*/
function Footer() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="footer_left">
                    <div className="footer_cont">
                        <p className="footmain_text">Контакты</p>
                        <a className="foot_text" href="tel:+79153323759">
                            +7 (915) 332 37 59
                        </a>
                        <a className="foot_text" href="tel:+79259251166">
                            +7 (925) 925 11 66
                        </a>
                        <a
                            className="foot_text"
                            href="mailto:i.a.kutergina@gmail.com"
                        >
                            i.a.kutergina@gmail.com
                        </a>
                        <a href="https://t.me/+79259251166">
                            <img src={telegram} />
                        </a>
                        <a href="https://wa.me/89153323759">
                            <img src={wa} />
                        </a>
                    </div>
                    <nav>
                        <ul>
                            {nav.map((item, index) => (
                                <li key={index}>
                                    <AnchorLink href={item.href}>
                                        {item.name}
                                    </AnchorLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <a className="footer_a" target="_blank" href={`${domen}ps.pdf`}>
                    Политика конфиденциальности
                </a>
            </div>
        </footer>
    );
}

export default Footer;
