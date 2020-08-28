import React from "react";

const Tooltip = ({ feature }) => {
  const { id } = feature.properties;

  return (
    <div id={`tooltip-${id}`}>
      <h3>Informations</h3>
      <strong>Layer:</strong> {feature.layer["source-layer"]}
      <br />
      <strong>ID:</strong> {feature.layer.id}
    </div>
  );
};

export default Tooltip;
