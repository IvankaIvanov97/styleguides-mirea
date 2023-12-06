import React, { useState } from "react";
import "./Modal.css";
import { API_URL, domen } from "../../services/api";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slicers/modalSlicer";
import smile from "../../assets/img/smile.png";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import axios from "axios";
function Modal() {
    const { modal } = useSelector((state) => state);
    const { formData } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [fio, setFio] = useState("");
    const [tel, setTel] = useState("");
    const [sogl, setSogl] = useState(false);
    const [isValidTel, setIsValidTel] = useState(false);
    const [isValidFio, setIsValidFio] = useState(false);
    const [blockSubmit, setBlockSubmit] = useState(false);
    const [isNotValidTel, setIsNotValidTel] = useState(false);
    const re = /^\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    const handleTelChange = (e) => {
        setTel(e.target.value);
        setIsValidTel(re.test(String(e.target.value).toLowerCase()));
    };
    const handleFioChange = (e) => {
        setFio(e.target.value);
        setIsValidFio(e.target.value ? true : false);
    };

    function submit(e) {
        e.preventDefault();
        setBlockSubmit(true);
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
            setBlockSubmit(false);
            return;
        }
        if (!re.test(String(data.get("tel")).toLowerCase())) {
            setIsNotValidTel(true);
            setBlockSubmit(false);
            return;
        } else {
            setIsNotValidTel(false);
        }
        if (!data.get("sogl")) {
            alert("Вы не согласились с пользовательским соглашением!");
            setBlockSubmit(false);
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
                dispatch(setModal(3));
                setBlockSubmit(false);
                console.log(response);
            })
            .catch(function (error) {
                setBlockSubmit(false);
                alert("Ошибка");
            });
    }
    return (
        <div className="backg_pop">
            <div
                className={
                    modal.value === 1
                        ? "outline_pop outline_app"
                        : "outline_pop"
                }
            >
                <div
                    className={
                        modal.value === 1 ? "wind_pop wind_app" : "wind_pop"
                    }
                >
                    <div
                        className={
                            modal.value === 1
                                ? "container_app"
                                : "container_pop"
                        }
                    >
                        {modal.value === 3 ? (
                            <>
                                <p>Ваша заявка успешно оформлена!</p>
                                <p>Скоро мы с вами свяжемся</p>
                                <img className="smile_pop" src={smile} />
                                <Close
                                    fill="#414141"
                                    className="close"
                                    onClick={() => window.location.reload()}
                                />
                            </>
                        ) : modal.value === 2 ? (
                            <>
                                <p>Спасибо за оставленный вопрос!</p>
                                <p>Скоро мы с вами свяжемся</p>
                                <img className="smile_pop" src={smile} />
                                <Close
                                    fill="#414141"
                                    className="close"
                                    onClick={() => dispatch(setModal(0))}
                                />
                            </>
                        ) : (
                            <>
                                <h4>Оформление заявки</h4>
                                <form onSubmit={submit}>
                                    <div
                                        className={`app_text ${
                                            isValidFio ? "valid" : ""
                                        }`}
                                    >
                                        <p>ФИО</p>
                                        <input
                                            type="text"
                                            name="fio"
                                            required
                                            placeholder="Введите ФИО"
                                            value={fio}
                                            onChange={handleFioChange}
                                        />
                                    </div>
                                    <div
                                        className={`app_text ${
                                            isValidTel ? "valid" : ""
                                        }${isNotValidTel ? "novalid" : ""}`}
                                    >
                                        <p>Телефон</p>
                                        <InputMask
                                            type="tel"
                                            name="tel"
                                            id="number"
                                            mask="+7 999 999 99 99"
                                            maskChar={null}
                                            placeholder="+7 999 999 99 99"
                                            required
                                            value={tel}
                                            onChange={handleTelChange}
                                        />
                                        {isNotValidTel && (
                                            <p className="novalid_text">
                                                Неверно введен номер
                                            </p>
                                        )}
                                    </div>
                                    <div className="check_app">
                                        <input
                                            className={"dot_app"}
                                            name="sogl"
                                            type="checkbox"
                                            id="sogl"
                                            value={sogl}
                                            onChange={(e) =>
                                                setSogl(e.target.checked)
                                            }
                                        />
                                        <label for="sogl">
                                            <p>
                                                Я согласен(на) и принимаю{" "}
                                                <a
                                                    target="_blank"
                                                    href={`${domen}ps.pdf`}
                                                >
                                                    пользовательское соглашение
                                                </a>
                                            </p>
                                        </label>
                                    </div>
                                    <Close
                                        fill="#414141"
                                        className="close"
                                        onClick={() => dispatch(setModal(0))}
                                    />
                                    <button
                                        className="but_main but_quas but_app"
                                        type="submit"
                                        disabled={blockSubmit}
                                    >
                                        Отправить
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
