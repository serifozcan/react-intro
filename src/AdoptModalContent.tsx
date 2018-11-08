import React from "react";

interface Props {
  name: string;
  toogleModal: () => void;
}

const AdoptModalContent = (props: Props) => (
  <React.Fragment>
    <h1>Would you like to adopt {props.name}?</h1>
    <div className="buttons">
      <button onClick={props.toogleModal}>Yes</button>
      <button onClick={props.toogleModal}>Definitely Yes</button>
    </div>
  </React.Fragment>
);

export default AdoptModalContent;
