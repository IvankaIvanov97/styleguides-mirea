import React, { useEffect, useRef, useState } from "react";

import OsobBlock from "./OsobBlock";
import { osob } from "../../services/export";
function Osobiy() {
    const [flipped, setFlipped] = useState(false);

    const sectionRef = useRef(null);

    useEffect(() => {
        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setFlipped(true);
                    observer.disconnect();
                }
            });
        };
        const observer = new IntersectionObserver(handleIntersection);

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    return (
        <section id="osobiy" ref={sectionRef}>
            <div className="container">
                <h2>Особенности ведения учета на маркетплейсах</h2>
                <div className="osob">
                    {osob.map((text, index) => (
                        <OsobBlock
                            key={index}
                            data={text}
                            isFlipped={index === 0 ? flipped : false}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Osobiy;
