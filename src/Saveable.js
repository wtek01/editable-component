import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useOutsideClick } from "./useOutsideClick";

const useStyles = createUseStyles({
  root: {
    width: "100%",
    fontFamily: "Helvetica"
  },
  footer: {
    height: 22,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 3
  },
  cancelBtn: { color: "#6B778C", marginRight: 1 },
  btn: { fontSize: 12, minHeight: 0, height: "100%" }
});

const Saveable = (props, ref) => {
  const {
    defaultValue,
    input,
    onCancel,
    onSave,
    autoCancel,
    useFooter = true,
    style = {},
    inputStyle = {},
    footerStyle = {},
    className = "",
    inputClassName = ""
  } = props;

  const c = useStyles();
  const [tmpValue, setTmpValue] = useState(defaultValue);

  const save = () => {
    if (!onSave) return;
    return onSave(tmpValue);
  };

  const cancel = () => {
    if (onCancel) onCancel();
  };

  const onChange = (value) => setTmpValue(value);

  const innerRef = autoCancel ? useOutsideClick(cancel) : null;

  return (
    <div ref={innerRef}>
      <div ref={ref} className={[c.root, className].join(" ")} style={style}>
        <div
          className={[c.editComponent, inputClassName].join(" ")}
          style={inputStyle}
        >
          {typeof input === "function"
            ? input({ value: tmpValue, onChange, onSave })
            : input}
        </div>
        {useFooter && (
          <div className={c.footer} style={footerStyle}>
            <div>
              <button onClick={cancel}>cancel</button>
            </div>
            <div>
              <button onClick={save}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Saveable);
