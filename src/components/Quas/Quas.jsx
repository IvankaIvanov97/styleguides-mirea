import React, { useState } from "react";
import { API_URL, domen } from "../../services/api";

import volny from "../../assets/img/volny.png";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slicers/modalSlicer";
import axios from "axios";
function Quas() {
    const dispatch = useDispatch();
    const { formData } = useSelector((state) => state);
    const [fio, setFio] = useState("");
    const [tel, setTel] = useState("");
    const [text, setText] = useState("");
    const [sogl, setSogl] = useState(false);
    const [isValidTel, setIsValidTel] = useState(false);
    const [isNotValidTel, setIsNotValidTel] = useState(false);
    const [isValidFio, setIsValidFio] = useState(false);
    const [isValidText, setIsValidText] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const re = /^\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    const handleTelChange = (e) => {
        setTel(e.target.value);
        setIsValidTel(re.test(String(e.target.value).toLowerCase()));
    };
    const handleFioChange = (e) => {
        setFio(e.target.value);
        setIsValidFio(e.target.value ? true : false);
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
        setIsValidText(e.target.value ? true : false);
    };
    function submit(e) {
        e.preventDefault();
        setIsDisable(true);
        const form = e.target;
        let calcData;
        if (
            formData.value["form"].value !== 0 &&
            formData.value["system"].value !== 0 &&
            formData.value["agents"].value.find((el) => el === true)
        ) {
            calcData = formData;
        }
        const data = new FormData(form);
        if (!data.get("fio")) {
            setIsDisable(false);
            return;
        }
        if (!re.test(String(data.get("tel")).toLowerCase())) {
            setIsNotValidTel(true);
            setIsDisable(false);
            return;
        } else {
            setIsNotValidTel(false);
        }

        if (!data.get("sogl")) {
            alert("Вы не согласились с пользовательским соглашением!");
            setIsDisable(false);
            return;
        }
        if (!data.get("text")) {
            setIsDisable(false);
            return;
        }
        const dataJson = {};
        data.forEach((value, key) => {
            dataJson[key] = value;
        });
        axios({
            method: "post",
            url: API_URL + "mailer.php",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                contact: dataJson,
                formData: calcData,
            },
        })
            .then(function (response) {
                setIsDisable(false);
                dispatch(setModal(3));
                console.log(response);
            })
            .catch(function (error) {
                setIsDisable(false);
                alert("Ошибка");
                console.log(error);
            });
    }

    return (
        <section id="quas">
            <img className="quas_img" src={volny} />
            <div className="container">
                <h2>Остались вопросы?</h2>
                <p className="center_p_quas">
                    Оставьте заявку и мы свяжемся с Вами
                </p>
                <form className="block_quas" onSubmit={submit}>
                    <div className="block_quas_main">
                        <input
                            className={`up_quas ${isValidFio ? "valid" : ""}`}
                            name="fio"
                            type="text"
                            id="text"
                            placeholder="Иванов Иван Иванович"
                            value={fio}
                            onChange={handleFioChange}
                            required
                        />

                        <div className="telvalid">
                            <InputMask
                                className={`up_quas ${
                                    isValidTel ? "valid" : ""
                                } ${isNotValidTel ? "novalid" : ""}`}
                                type="tel"
                                name="tel"
                                id="number"
                                mask="+7 999 999 99 99"
                                maskChar={null}
                                placeholder="+7 999 999 99 99"
                                value={tel}
                                onChange={handleTelChange}
                                required
                            />
                            {isNotValidTel && <p>Неверно введен номер</p>}
                        </div>
                    </div>
                    <textarea
                        className={isValidText ? "valid" : ""}
                        placeholder="Ваш вопрос"
                        name="text"
                        value={text}
                        onChange={handleTextChange}
                        required
                    ></textarea>
                    <div className="check_app">
                        <input
                            className={"dot_app"}
                            name="sogl"
                            type="checkbox"
                            id="sogl"
                            value={sogl}
                            onChange={(e) => setSogl(e.target.checked)}
                        />
                        <label for="sogl">
                            <p>
                                Я согласен(на) и принимаю{" "}
                                <a target="_blank" href={`${domen}ps.pdf`}>
                                    пользовательское соглашение
                                </a>
                            </p>
                        </label>
                    </div>
                    <button
                        disabled={isDisable}
                        className="but_main but_quas"
                        type="submit"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Quas;
