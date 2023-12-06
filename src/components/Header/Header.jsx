import React, { useState, useEffect, useRef } from "react";

import burger from "../../assets/img/burger.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import { nav } from "../../services/export";
function Header() {
    const [active, setActive] = useState(false);
    const ham = useRef();

    const handleClickOutside = (e) => {
        if (ham.current.contains(e.target)) {
            return;
        }
        setActive(false);
    };

    useEffect(() => {
        if (active) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            if (active) {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [active]);

    return (
        <header>
            <div className="container">
                <nav className="nav_main">
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
                <img
                    className="gam"
                    onClick={() => setActive(!active)}
                    src={burger}
                />
                <div className={`gam_block ${active && "active"}`} ref={ham}>
                    <Close
                        className="close"
                        onClick={() => setActive(!active)}
                        fill="#FFF"
                    />
                    <nav className="nav_media">
                        <ul>
                            <ul>
                                {nav.map((item, index) => (
                                    <li key={index}>
                                        <AnchorLink href={item.href}>
                                            {item.name}
                                        </AnchorLink>
                                    </li>
                                ))}
                            </ul>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
