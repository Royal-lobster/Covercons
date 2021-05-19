import React, { useEffect, useState } from "react";

const SvgInline = ({ icon, svg, setSvg }) => {
  useEffect(() => {
    fetch(
      `https://fonts.gstatic.com/s/i/materialiconstwotone/${icon}/v11/24px.svg`
    ).then((response) => {
      if (response.status == 200) {
        fetch(
          `https://fonts.gstatic.com/s/i/materialiconstwotone/${icon}/v11/24px.svg`
        )
          .then((res) => res.text())
          .then(setSvg);
      } else {
        setSvg(
          `<div class='iconErrorDiv'><p class='iconError'>'${icon}' Not Found</p><br/><p class='iconErrorMessage'>Make sure you copy pasted correct icon name</p></div>`
        );
      }
    });
  }, [icon]);

  return (
    <div className="svgInline" dangerouslySetInnerHTML={{ __html: svg }} />
  );
};
export default SvgInline;
