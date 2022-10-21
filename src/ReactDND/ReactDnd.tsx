import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./example";

const ReactDnd = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light ">
        <DndProvider backend={HTML5Backend}><Example/></DndProvider>
      </div>
    </div>
  );
};

export default ReactDnd;
