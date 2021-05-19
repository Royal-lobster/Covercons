import React, { useEffect, version } from "react";

const SvgInline = ({ icon, svg, setSvg, setLoading, setVersionCount }) => {
  useEffect(() => {
    (async () => {
      let version = 15;
      while (version > 0) {
        console.log(
          `https://fonts.gstatic.com/s/i/materialiconstwotone/${icon}/v${version}/24px.svg`
        );
        let response = await fetch(
          `https://fonts.gstatic.com/s/i/materialiconstwotone/${icon}/v${version}/24px.svg`
        );
        if (await response.ok) {
          setSvg(await response.text());
          setLoading(false);
          version = -1;
        } else {
          setLoading(true);
          setVersionCount(version);
          version--;
        }
      }
      if (version == 0) {
        setLoading(false);
        setSvg(
          `<div class='iconErrorDiv'><p class='iconError'>'${icon}' Not Found</p><br/><p class='iconErrorMessage'>Make sure you copy pasted correct icon name</p></div>`
        );
      }
    })();
  }, [icon]);

  return (
    <div className="svgInline" dangerouslySetInnerHTML={{ __html: svg }} />
  );
};
export default SvgInline;
