import React from "react";

import arowdownload from "../../assets/img/arowdownload.svg";
import ozon from "../../assets/img/ozon.svg";
import sber from "../../assets/img/sber.svg";
import wb from "../../assets/img/wb.svg";
import kazan from "../../assets/img/kazan.svg";
import ymar from "../../assets/img/ymar.svg";
import ali from "../../assets/img/ali.svg";
import { domen } from "../../services/api";

function LidMagnit() {
    return (
        <section id="lid_magnit">
            <div className="container">
                <h2>
                    Учет на маркетплейсах: <br />
                    что нужно знать предпринимателю
                </h2>
                <div className="download_block">
                    <div className="download_block_left">
                        <img src={arowdownload} />
                        <a className="but_main but_download" target="_blank" href={`${domen}lid.pdf`}>
                            Скачать
                        </a>
                    </div>
                    <div className="download_block_right">
                        <div className="download_block_right_img">
                            <img src={ozon} />
                        </div>
                        <div className="download_block_right_img">
                            <img src={sber} />
                        </div>
                        <div className="download_block_right_img">
                            <img src={wb} />
                        </div>
                        <div className="download_block_right_img">
                            <img src={kazan} />
                        </div>
                        <div className="download_block_right_img">
                            <img src={ymar} />
                        </div>
                        <div className="download_block_right_img">
                            <img src={ali} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LidMagnit;
