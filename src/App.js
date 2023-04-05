import React from "react";
import Editable from "./Editable";
import { TextField } from "@material-ui/core";

const App = () => {
  const handleSave = (newValue) => {
    console.log("New value:", newValue);
  };

  const handleCancel = () => {
    console.log("Editing canceled");
  };

  const renderEditComponent = (props) => <TextField {...props} />;

  return (
    <div>
      <h1>Editable Component Example</h1>
      <Editable
        defaultValue="Click me to edit"
        editComponent={renderEditComponent}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
