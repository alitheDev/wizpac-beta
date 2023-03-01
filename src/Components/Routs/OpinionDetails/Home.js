import React, { useEffect, useState } from "react";
import Card from "./Card";
// import { List, arrayMove } from "react-movable";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { ControlCamera } from "@material-ui/icons";
import SadFace from "../../Atoms/SadFace";

function Home(props) {
  const eventLogger = (e, data) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  const [opinionsData, setopinionsData] = useState([]);
  useEffect(() => {
    setopinionsData(props.opinionsData);
  }, [props.opinionsData]);

  return (
    <div
      className="col-md-10 mx-auto"
      style={{ height: `calc(100vh - 150px)`, overflow: "scroll" }}
    >
      <div className="row h-100">
        {opinionsData ? (
          opinionsData.map((each) => {
            return (
              <Draggable
                // axis="yx"
                handle=".handle"
                // defaultPosition={{ x: 0, y: 0 }}
                // position={null}
                // grid={[50, 50]}
                // scale={1}
                // onStart={handleStart}
                // onDrag={handleDrag}
                // onStop={handleStop}
              >
                <div className="col-md-6 p-1">
                  <div className="handle">
                    <ControlCamera />
                  </div>
                  <Card each={each} />
                </div>
              </Draggable>
            );
          })
        ) : (
          <SadFace />
        )}
      </div>
    </div>
  );
}

export default Home;

{
  /* <List
values={items}
onChange={({ oldIndex, newIndex }) =>
setItems(arrayMove(items, oldIndex, newIndex))
}
  renderList={({ children, props }) => <div className='row h-100' {...props}>{children}</div>}
  renderItem={({ value, props }) => <div className='col-md-6 p-1' {...props}>{value}</div>}
/> */
}

// const Item1 = <Card />
// const Item2 = <Card />
// const Item3 = <Card />
// const Item4 = <Card />
// const Item5 = <Card />
// const Item6 = <Card />
// const Item7 = <Card />
// const Item8 = <Card />
// const [items, setItems] = useState([Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8]);
