import React from "react";

import BlockFaq from "./BlockFaq";
import { faq } from "../../services/export";
function Faq() {
    return (
        <section id="faq">
            <div className="container">
                <h2>FAQ</h2>
                {faq.map((text, index) => (
                    <BlockFaq key={index} data={text} />
                ))}
            </div>
        </section>
    );
}

export default Faq;
