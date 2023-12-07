import React from "react";

import calc_back from "../../assets/img/calc_back.png";
import blackarow from "../../assets/img/blackarow.svg";
import { setFormData } from "../../redux/slicers/formDataSlicer";
import { useDispatch, useSelector } from "react-redux";

import ozon from "../../assets/img/ozon.svg";
import wb from "../../assets/img/wb.svg";
import ali from "../../assets/img/ali.svg";
import kazan from "../../assets/img/kazan.svg";
import ymar from "../../assets/img/ymar.svg";
import sber from "../../assets/img/sber.svg";

import { useState } from "react";
import BlockSelect from "./BlockSelect";
import { setModal } from "../../redux/slicers/modalSlicer";

/**
*   Блок страницы "Калькулятор". Выводит форму с расчётом БУ.
*/
function Calculator() {
    const [active, setActive] = useState(false);
    const [resultCalc, setResultCalc] = useState();

    const form = [
        {
            value: 1,
            desc: "ООО",
            option: {
                value: 0,
                desc: "Введите количество SKU",
            },
        },
        {
            value: 2,
            desc: "ИП",
        },
        {
            value: 3,
            desc: "АО",
        },
    ];

    const system = [
        {
            value: 1,
            desc: "УСН 6% (доходы)",
        },
        {
            value: 2,
            desc: "УСН 15% (расходы)",
        },
        {
            value: 3,
            desc: "ОСНО",
        },
    ];

    const agents = [
        {
            value: 1,
            desc: "OZON",
            option: {
                value: 0,
                desc: "Введите количество кабинетов",
            },
            img: ozon,
        },
        {
            value: 2,
            desc: "WB",
            img: wb,
        },
        {
            value: 3,
            desc: "Яндекс Маркет",
            img: ymar,
        },
        {
            value: 4,
            desc: "Сбермегамаркет",
            img: sber,
        },
        {
            value: 5,
            desc: "KazanExpress",
            img: kazan,
        },
        {
            value: 6,
            desc: "Aliexpress",
            img: ali,
        },
    ];

    const selectHandler = (i) => {
        active ? setActive(false) : setActive(i);
    };

    const getCurrentText = (name, value) => {
        if (name === "agents") {
            if (!value[name].value.find((el) => el === true)) {
                return;
            }
            return agents
                .map((el, i) => value[name].value[i] && el.desc)
                .filter(Boolean)
                .join(", ");
        } else {
            if (value[name].value === 0) {
                return;
            }
            return name === "form"
                ? form.find((el) => el.value === value[name].value).desc
                : name === "system"
                ? system.find((el) => el.value === value[name].value).desc
                : agents.find((el) => el.value === value[name].value).desc;
        }
    };

    const ftsHandler = () => {
        dispatch(
            setFormData({
                ...formData.value,
                fts: { value: !formData.value["fts"].value },
            })
        );
    };

    const emplHandler = (e) => {
        let value = 0;
        if (!/\D/.test(e.target.value)) {
            if (+e.target.value <= +e.target.max) {
                value = +e.target.value;
            } else {
                value = +e.target.max;
            }
        }
        dispatch(
            setFormData({ ...formData.value, employees: { value: value } })
        );
    };

    const calc = () => {
        if (
            !(
                formData.value["form"].value !== 0 &&
                formData.value["system"].value !== 0 &&
                formData.value["agents"].value.find((el) => el === true)
            )
        ) {
            alert("Заполните форму, налогообложение и агентов");
            return;
        }
        // Форма деятельности
        let formCash = 0;
        switch (formData.value["form"].value) {
            case 1:
                // ООО
                formCash = 6000;
                break;
            case 2:
                // ИП
                formCash = 4500;
                break;
            case 3:
                // АО
                formCash = 7500;
                break;
            default:
                break;
        }

        // Система НО
        let systemCash = 0;
        switch (formData.value["system"].value) {
            case 1:
                // Доходы
                systemCash = 2500;
                break;
            case 2:
                // Расхода
                systemCash = 5000;
                break;
            case 3:
                // ОСНО
                systemCash = 10000;
                break;
            default:
                break;
        }

        // Агенты
        let agentsCash = 0;
        formData.value["agents"].value.forEach((el, i) => {
            if (el === true) {
                let skuCash =
                    formData.value["form"].value === 1
                        ? 1 +
                          Math.floor(formData.value["form"].option / 50) * 0.05
                        : 1;
                console.log(skuCash);
                switch (i) {
                    case 0:
                        // OZON
                        let cabs = formData.value["agents"].option;
                        let coef =
                            cabs >= 2 ? 5000 + (cabs - 1) * 2500 : cabs * 5000;
                        if (
                            formData.value["form"].value === 2 &&
                            formData.value["system"].value === 1
                        ) {
                            agentsCash += coef;
                        } else if (formData.value["system"].value === 3) {
                            agentsCash += coef * 2.5 * skuCash;
                        } else {
                            agentsCash += coef * 2 * skuCash;
                        }
                        break;
                    default:
                        if (
                            formData.value["form"].value === 2 &&
                            formData.value["system"].value === 1
                        ) {
                            agentsCash += 5000;
                        } else if (formData.value["system"].value === 3) {
                            agentsCash += 5000 * 2.5 * skuCash;
                        } else {
                            agentsCash += 5000 * 2 * skuCash;
                        }
                        break;
                }
            }
        });

        let ftsCash = 0;
        if (formData.value["fts"].value) {
            let cabs = formData.value["agents"].option;
            let res = cabs >= 2 ? 3000 + (cabs - 1) * 500 : cabs * 3000;
            if (!formData.value["agents"].value[0]) {
                res = 0;
            }
            ftsCash = res > 5000 ? 5000 : res;
        }

        let employeesCash = 0;
        let sotr = formData.value["employees"].value;
        if (sotr === 0 && formData.value["form"].value !== 2) {
            employeesCash = 3000;
        } else {
            employeesCash = sotr * 3000;
        }
        return formCash + systemCash + agentsCash + ftsCash + employeesCash;
    };

    const { formData } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <section id="calculator">
            <img className="calc_mainimg" src={calc_back} />
            <div className="container">
                <h2>Рассчитайте цену сами</h2>
                <div className="calc">
                    <div className="calc_wrapper">
                        <div
                            onClick={() => {
                                selectHandler(1);
                            }}
                            className={
                                active === 1
                                    ? "calc_sel calc_pointer calc_selz active"
                                    : "calc_sel calc_pointer calc_selz"
                            }
                        >
                            <p className="calctext_up">Форма деятельности</p>
                            <p className="calctext_down">
                                {getCurrentText("form", formData.value)
                                    ? getCurrentText("form", formData.value)
                                    : "Выберите форму деятельности"}
                            </p>
                            <img className="calc_blackarow" src={blackarow} />
                        </div>
                        {active === 1 && (
                            <BlockSelect
                                data={form}
                                name="form"
                                onClick={() => {
                                    selectHandler(1);
                                }}
                            />
                        )}
                    </div>
                    <div className="calc_wrapper">
                        <div
                            onClick={() => {
                                selectHandler(2);
                            }}
                            className={
                                active === 2
                                    ? "calc_sel calc_pointer calc_selz active"
                                    : "calc_sel calc_pointer calc_selz"
                            }
                        >
                            <p className="calctext_up">
                                Система налогообложения
                            </p>
                            <p className="calctext_down">
                                {getCurrentText("system", formData.value)
                                    ? getCurrentText("system", formData.value)
                                    : "Выберите систему налогообложения"}
                            </p>
                            <img className="calc_blackarow" src={blackarow} />
                        </div>
                        {active === 2 && (
                            <BlockSelect
                                data={system}
                                name="system"
                                onClick={() => {
                                    selectHandler(2);
                                }}
                            />
                        )}
                    </div>
                    <div className="calc_wrapper">
                        <div
                            onClick={() => {
                                selectHandler(3);
                            }}
                            className={
                                active === 3
                                    ? "calc_sel calc_pointer calc_selz active"
                                    : "calc_sel calc_pointer calc_selz"
                            }
                        >
                            <p className="calctext_up">
                                Агенты, с которыми Вы работаете
                            </p>
                            <p className="calctext_down">
                                {getCurrentText("agents", formData.value)
                                    ? getCurrentText("agents", formData.value)
                                    : "Выберите агентов"}
                            </p>
                            <img className="calc_blackarow" src={blackarow} />
                        </div>
                        {active === 3 && (
                            <BlockSelect
                                type="checkbox"
                                data={agents}
                                name="agents"
                                onClick={() => {
                                    selectHandler(3);
                                }}
                            />
                        )}
                    </div>
                    <div className="calc_sel">
                        <p className="calctext_up">
                            Требуется ли подача отчетности в ФТС
                        </p>
                        <div className="calc_radio">
                            <input
                                name="radio"
                                type="radio"
                                id="yes_radio"
                                onChange={ftsHandler}
                                checked={formData.value["fts"].value}
                            />
                            <label htmlFor="yes_radio">
                                <p>Да</p>
                            </label>
                            <input
                                name="radio"
                                type="radio"
                                id="no_radio"
                                onChange={ftsHandler}
                                checked={!formData.value["fts"].value}
                            />
                            <label htmlFor="no_radio">
                                <p>Нет</p>
                            </label>
                        </div>
                    </div>
                    <div className="calc_sel calc_polz">
                        <p className="calctext_up calctext_polz_up">
                            Количество сотрудников
                        </p>
                        <div className="calc_slide">
                            <input
                                className="calc_textslide"
                                id="textslide"
                                min="1"
                                max="20"
                                onChange={(e) => emplHandler(e)}
                                value={formData.value["employees"].value}
                            />
                            <input
                                className="polzunok"
                                type="range"
                                min="0"
                                max="20"
                                onChange={(e) => emplHandler(e)}
                                value={formData.value["employees"].value}
                                step="1"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setResultCalc(calc())}
                        className="but_main but_calc"
                    >
                        Рассчитать
                    </button>
                    {resultCalc && (
                        <>
                            <p className="calc_price">
                                Итого: при выбранных параметрах стоимость услуг
                                составит <span>{resultCalc}</span> руб./мес.
                            </p>
                            <p className="calc_info">
                                +- 5% отклонений от реальной стоимости (по
                                причине вероятных дополнительных объемов работ).
                                Стоимость фиксируется по прайсу и включает
                                только необходимые для вас услуги
                            </p>
                        </>
                    )}

                    <button
                        className="but_main2 but_calczav"
                        onClick={() => dispatch(setModal(1))}
                    >
                        Оставить заявку
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Calculator;
