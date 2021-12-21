import React, { useState, useEffect, useRef } from "react";
const Icon = ({ name, version, size = 16, fill = "#fff" }) => {
  const [svg, setSvg] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.gstatic.com/s/i/materialiconsoutlined/${name}/v${version}/24px.svg`
    )
      .then((res) => res.text())
      .then((b) => setSvg(b))
      .catch((err) => console.log(err));
  }, [name, version]);
  return (
    <div
      style={{ display: "grid", placeItems: "center" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
export default Icon;
