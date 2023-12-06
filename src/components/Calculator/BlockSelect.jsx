import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/slicers/formDataSlicer";

function BlockSelect({ type, name, data, onClick }) {
    const { formData } = useSelector((state) => state);
    const dispatch = useDispatch();

    const isOption = () => {
        if (name === "form" && formData.value[name].value === 1) {
            return true;
        } else if (name === "agents" && formData.value[name].value[0]) {
            return true;
        }
        return false;
    };

    const inputHandler = (e) => {
        if (type === "checkbox") {
            const updatedCheckedState = formData.value[name].value.map(
                (item, index) => (index + 1 === +e.target.value ? !item : item)
            );
            dispatch(
                setFormData({
                    ...formData.value,
                    [name]: {
                        value: updatedCheckedState,
                        option: formData.value[name].option,
                    },
                })
            );
        } else {
            dispatch(
                setFormData({
                    ...formData.value,
                    [name]: {
                        value: +e.target.value,
                        option: formData.value[name].option,
                    },
                })
            );
        }
        onClick && name === "system" && onClick();
    };

    const numberHandler = (e) => {
        let value = 0;
        if (!/\D/.test(e.target.value)) {
            if (+e.target.value <= +e.target.max) {
                value = +e.target.value;
            } else {
                value = +e.target.max;
            }
        }
        dispatch(
            setFormData({
                ...formData.value,
                [name]: {
                    value: formData.value[name].value,
                    option: value,
                },
            })
        );
    };

    return (
        <div className="calc_behind">
            {data &&
                name &&
                data.map((el, i) => (
                    <>
                        <div
                            key={`${i}_${name}`}
                            className={el?.img && "calc_market"}
                        >
                            <input
                                className="calc_point"
                                type={
                                    type === "checkbox" ? "checkbox" : "radio"
                                }
                                checked={
                                    type === "checkbox" &&
                                    formData.value[name].value[i]
                                        ? true
                                        : el.value ===
                                          formData.value[name].value
                                }
                                name={name}
                                id={`${i}_${name}`}
                                onChange={(e) => inputHandler(e)}
                                value={el.value}
                            />
                            <label htmlFor={`${i}_${name}`}>
                                <p>{el.desc}</p>
                            </label>
                            {el?.img && (
                                <div className="calc_behind_img">
                                    <img src={el.img} />
                                </div>
                            )}
                        </div>
                        {el?.option && isOption() && (
                            <div className="calc_behindvar">
                                <input
                                    className="calc_behindvar_input"
                                    id={`${i}_${name}_${el.option.value}`}
                                    min="0"
                                    max={name === "agents" ? "10" : "9999"}
                                    onChange={(e) => numberHandler(e)}
                                    value={formData.value[name].option}
                                />
                                <label
                                    className="calc_behindvar_text"
                                    htmlFor={`${i}_${name}_${el.option.value}`}
                                >
                                    <p>{el.option.desc}</p>
                                </label>
                            </div>
                        )}
                    </>
                ))}
            {onClick && name !== "system" && (
                <button className="save" onClick={() => onClick()}>
                    Сохранить
                </button>
            )}
        </div>
    );
}

export default BlockSelect;
