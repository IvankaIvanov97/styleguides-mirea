import React from "react";
import "./index.css";

import Header from "./components/Header/Header";
import Buhmain from "./components/Buhmain/Buhmain";
import Calculator from "./components/Calculator/Calculator";
import LidMagnit from "./components/LidMagnit/LidMagnit";
import Osobiy from "./components/Osobiy/Osobiy";
import WhyWe from "./components/WhyWe/WhyWe";
import Faq from "./components/Faq/Faq";
import Quas from "./components/Quas/Quas";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./ModalTransition.css";
function App() {
    const { modal } = useSelector((state) => state);

    return (
        <>
            <CSSTransition
                in={modal.value !== 0}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <Modal />
            </CSSTransition>
            <Header />
            <Buhmain />
            <Calculator />
            <LidMagnit />
            <Osobiy />
            <WhyWe />
            <Faq />
            <Quas />
            <Footer />
        </>
    );
}

export default App;
