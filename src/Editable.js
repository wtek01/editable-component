import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Saveable from "./Saveable";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  viewComponent: {
    width: "100%"
  },
  hoverBorder: {
    cursor: "text",
    "&:hover": {
      boxShadow: "inset 0 0 2px 0 rgba(97, 97, 97, 0.8)"
    }
  }
});

const Editable = (props, ref) => {
  const {
    defaultValue,
    editComponent,
    hoverBorder = true,
    editing,
    disabled = false,
    useFooter = true,
    autoCancel = false,
    children,
    onCancel,
    onSave,
    onChangeMode,
    style = {},
    viewStyle = {},
    editStyle = {},
    footerStyle = {},
    className = "",
    viewClassName = "",
    editClassName = ""
  } = props;

  const c = useStyles();
  const [editMode, setEditMode] = useState(false);
  const _editMode = editing !== undefined ? editing : editMode;

  const startEditMode = () => {
    setEditMode(true);
    if (onChangeMode) onChangeMode(true);
  };

  const endEditMode = () => {
    setEditMode(false);
    if (onChangeMode) onChangeMode(false);
  };

  const save = (value) => {
    if (!onSave) {
      return endEditMode();
    }
    const result = onSave(value);
    if (result && result.then) {
      result
        .then((data) => {
          data && data.creationMessage
            ? toast.success(data.creationMessage)
            : toast.success("Change has been successfully saved");
          endEditMode();
          return true;
        })
        .catch((e) => {
          toast.error("An error occurred");
          return Promise.reject(e);
        });
    } else {
      toast.success("Change has been successfully saved");
      endEditMode();
    }
  };

  const cancel = () => {
    if (onCancel) onCancel();
    endEditMode();
  };

  if (!_editMode || disabled) {
    const viewClassNames = [c.viewComponent];
    if (hoverBorder && !disabled) viewClassNames.push(c.hoverBorder);
    viewClassNames.push(viewClassName);
    return (
      <div
        ref={ref}
        onClick={startEditMode}
        className={viewClassNames.join(" ")}
        style={viewStyle}
      >
        {children ? children : defaultValue}
      </div>
    );
  }

  return (
    <Saveable
      defaultValue={defaultValue}
      input={editComponent}
      onCancel={cancel}
      onSave={save}
      style={style}
      inputStyle={editStyle}
      footerStyle={footerStyle}
      className={className}
      inputClassName={editClassName}
      useFooter={useFooter}
      autoCancel={autoCancel}
    />
  );
};

export default React.forwardRef(Editable);
