import React from "react";

export const useOutsideClick = (callback) => {
  const ref = React.useRef();
  const onOutsideClick = (e) => {
    // exclude ANTD because it doesn't use react portals
    const antdCalendar = document.getElementsByClassName(
      "ant-calendar-picker-container"
    )[0];
    const antdSelect = document.getElementsByClassName(
      "ant-select-dropdown"
    )[0];

    const isInsideRef = ref && ref.current && ref.current.contains(e.target);
    const isInsideAntdCalendar =
      antdCalendar && antdCalendar.contains(e.target);
    const isInsideAntdSelect = antdSelect && antdSelect.contains(e.target);

    if (isInsideRef || isInsideAntdCalendar || isInsideAntdSelect) {
      return;
    }

    callback();
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  });
  return ref;
};
