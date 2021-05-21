import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ChromePicker,
  CirclePicker,
  GithubPicker,
  SketchPicker,
} from "react-color";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { shadeColor } from "../lib/shadeColor";
import useWindowSize from "../lib/winsizehook";

export default function Home() {
  const downloadHelper_a_tag = React.useRef();

  const [width] = useWindowSize();
  const [svg, setSvg] = React.useState(null);
  const [bgColor, setBgColor] = React.useState({ hex: "#0394e6" });
  const [icon, setIcon] = React.useState("home");
  const [iconInputFieldText, setIconInputFieldText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorIconFetch, setErrorIconFetch] = React.useState(false);
  const [versionCount, setVersionCount] = React.useState();
  const [iconType, setIconType] = React.useState("materialiconstwotone");
  const [coverType, setCoverType] = React.useState("singlemiddleicon");
  const [generatedCoverSvg, setGeneratedCoverSvg] = React.useState("");
  const [iconPatternSpacing, setIconPatternSpacing] = React.useState(25);
  const [iconPatternSize, setIconPatternSize] = React.useState(2);
  const [iconPatternRotation, setIconPatternRotation] = React.useState(330);
  const [iconPatternShade, setIconPatternShade] = React.useState(-25);
  const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);

  React.useEffect(() => {
    setErrorIconFetch(false);
    (async () => {
      let version = 15;
      while (version > 0) {
        let response = await fetch(
          `https://fonts.gstatic.com/s/i/${iconType}/${icon}/v${version}/24px.svg`
        );
        if (await response.ok) {
          setSvg(await response.text());
          setLoading(false);
          version = -1;
        } else {
          setErrorIconFetch(false);
          setLoading(true);
          setVersionCount(version);
          version--;
        }
      }
      if (version == 0) {
        setLoading(false);
        setSvg(null);
        setErrorIconFetch(true);
      }
    })();
  }, [icon, iconType]);
  React.useEffect(() => {
    if (coverType == "iconpattern" && svg) {
      setGeneratedCoverSvg(`<svg version="1.1"
      baseProfile="full"
      width="1500" height="600"
      viewbox="0 0 1500 600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor.hex}"/>
      <rect width="100%" height="100%" fill="url(#pattern)"/>
      <defs>
        <pattern id="pattern" x="0" y="0" width="${iconPatternSpacing}" height="${iconPatternSpacing}" patternTransform="rotate(${iconPatternRotation}) scale(${iconPatternSize})" patternUnits="userSpaceOnUse">
          <g>
            ${svg
              .substring(svg.indexOf(">") + 1, svg.length - 6)
              .replaceAll('<rect fill="none" height="24" width="24"/>', "")
              .replaceAll(
                "<path",
                `<path fill= "${shadeColor(
                  bgColor.hex.substring(1),
                  parseInt(iconPatternShade)
                )}"`
              )
              .replaceAll(
                "<rect",
                `<rect fill="${shadeColor(
                  bgColor.hex.substring(1),
                  parseInt(iconPatternShade)
                )}"`
              )
              .replaceAll(
                "<polygon",
                `<polygon fill="${shadeColor(
                  bgColor.hex.substring(1),
                  parseInt(iconPatternShade)
                )}"`
              )
              .replace(new RegExp(/<(.*?)(fill="none")(.*?)>/), "")
              .replaceAll("<g>", "")
              .replaceAll("</g>", "")}
              
          </g>
      </pattern>
    </defs>
    </svg>
      `);
    } else if (coverType == "singlemiddleicon" && svg) {
      setGeneratedCoverSvg(
        `<svg version="1.1"
      baseProfile="full"
      viewbox="0 0 1500 600"
      width="1500" height="600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor.hex}" />
      <g transform="translate(610, 180) scale(10)" id="center_icon">
        ${svg
          .substring(svg.indexOf(">") + 1, svg.length - 6)
          .replaceAll('<rect fill="none" height="24" width="24"/>', "")
          .replaceAll("<path", "<path fill='#ffffffaf' ")
          .replaceAll("<rect", "<rect fill='#ffffffaf'")
          .replaceAll("<polygon", "<polygon fill='#ffffffaf'")
          .replace(
            new RegExp(/(<(.*?)fill='#ffffffaf')(.*?)(fill="none")(.*?)(>)/),
            ""
          )
          .replaceAll("<g>", "")
          .replaceAll("</g>", "")}
          
      </g>
      </svg>
      `
      );
    }
  }, [
    bgColor,
    coverType,
    svg,
    iconPatternSpacing,
    iconPatternSize,
    iconPatternRotation,
    iconPatternShade,
  ]);

  const handleDownloadCover = () => {
    let blob = new Blob([generatedCoverSvg]);
    downloadHelper_a_tag.current.download = `covercon_${icon}_${coverType}.svg`;
    downloadHelper_a_tag.current.href = window.URL.createObjectURL(blob);
    downloadHelper_a_tag.current.click();
  };
  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>Notion Covercons</title>
        <meta name="description" content="Generate Beautiful Notion Covers" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://covercons.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Notion Covercons" />
        <meta
          property="og:description"
          content="Generate Beautiful Notion Covers"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Royal-lobster/notioncovercons-nextjs/main/covercons.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="covercons.vercel.app" />
        <meta property="twitter:url" content="https://covercons.vercel.app/" />
        <meta name="twitter:title" content="Notion Covercons" />
        <meta
          name="twitter:description"
          content="Generate Beautiful Notion Covers"
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Royal-lobster/notioncovercons-nextjs/main/covercons.png"
        />
      </Head>
      <div className={styles.container}>
        <Head>
          <title>Notion Covercons</title>
          <meta name="description" content="Generate Beautiful Notion Covers" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Notion Covercons</h1>
          {width < 790 ? (
            <div className={styles.mobilePreviewBox}>
              <div className={styles.previewLoading}>
                {loading ? <p>loading - {versionCount}</p> : <></>}
              </div>

              {errorIconFetch ? (
                <div
                  className={`${styles.errorCover} ${styles.mobileErrorCover}`}
                >
                  <div className={styles.errorTextWrapper}>
                    <h2>Icon: "{icon}" not found </h2>
                    <p>You may have copied the incorrect icon name</p>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.previewSvg}
                  dangerouslySetInnerHTML={{ __html: generatedCoverSvg }}
                />
              )}
            </div>
          ) : (
            <></>
          )}
          <div className={styles.wrapper}>
            <div className={styles.modifierSettings}>
              <div className={styles.selectIconsFromGoogle}>
                <h2>1. Select and Copy icon name from google fonts</h2>
                <button
                  onClick={() => setOpen(true)}
                  className={styles.iconNameSubmit}
                >
                  Instructions
                </button>
                <Modal open={open} onClose={() => setOpen(false)} center>
                  <h1>Instructions: </h1>
                  <div className={styles.googleFontsInstructions}>
                    <Image
                      src="/assets/step_1.png"
                      height="351"
                      width="197.57"
                    />
                    <Image
                      src="/assets/step_2.png"
                      height="351"
                      width="197.57"
                    />
                    <Image
                      src="/assets/step_3.png"
                      height="351"
                      width="197.57"
                    />
                  </div>
                  <a
                    href="https://fonts.google.com/icons"
                    target="_blank"
                    className={styles.iconNameSubmit}
                  >
                    Go to Google Fonts Icons
                  </a>
                  <p className={styles.opensInNewTabMsg}>(opens in new tab)</p>
                </Modal>
              </div>

              <div className={styles.modifierSettings__iconNameSelect}>
                <h2 htmlFor="icon_name">2. Paste the copied icon name</h2>

                {loading ? (
                  <div className={styles.loadingBar}>
                    <progress
                      id="file"
                      value={`${15 - versionCount}`}
                      max="15"
                    ></progress>
                  </div>
                ) : (
                  <></>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIcon(iconInputFieldText);
                  }}
                >
                  <input
                    type="text"
                    disabled={loading}
                    value={iconInputFieldText}
                    onChange={(e) => setIconInputFieldText(e.target.value)}
                    placeholder="eg: home"
                  />

                  <button className={styles.iconNameSubmit}>Submit</button>
                </form>
              </div>
              <div className={styles.iconTypeSetting}>
                <h2 htmlFor="icon_name">3. Select the icon type</h2>
                {loading ? (
                  <div className={styles.loadingBar}>
                    <progress
                      id="file"
                      value={`${15 - versionCount}`}
                      max="15"
                    ></progress>
                  </div>
                ) : (
                  <></>
                )}
                <select
                  type="text"
                  onChange={(e) => setIconType(e.target.value)}
                  disabled={loading}
                >
                  <option value="materialiconstwotone">
                    Two shade (default)
                  </option>
                  <option value="materialicons">Filled</option>
                  <option value="materialiconsoutlined">Outline</option>
                  <option value="materialiconsround">Rounded</option>
                </select>
              </div>
              <div className={styles.iconTypeSetting}>
                <h2 htmlFor="icon_name">4. Select the Cover Design</h2>
                <select
                  type="text"
                  value={coverType}
                  onChange={(e) => setCoverType(e.target.value)}
                >
                  <option value="singlemiddleicon">Single Icon</option>
                  <option value="iconpattern">Icon Pattern</option>
                </select>
                {coverType == "iconpattern" ? (
                  <div className={styles.advancedSettingsBtn}>
                    <p>Show Advanced Settings</p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        defaultChecked={showAdvancedSettings}
                        onChange={(e) => {
                          setShowAdvancedSettings(e.target.checked);
                        }}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {coverType == "iconpattern" && showAdvancedSettings ? (
                <>
                  <div className={styles.iconPatternSetting}>
                    <h2>4.1 Select Spacing between Icons</h2>
                    <div className={styles.iconPaternSettingDisplayValue}>
                      Spacing: {iconPatternSpacing}{" "}
                      <span
                        className={styles.defaultChanger}
                        onClick={() => setIconPatternSpacing(25)}
                      >
                        {"("}default 25{")"}
                      </span>
                    </div>
                    <input
                      type="range"
                      name="icon_spacing"
                      value={iconPatternSpacing}
                      min="20"
                      max="80"
                      onChange={(e) => setIconPatternSpacing(e.target.value)}
                    ></input>
                  </div>
                  <div className={styles.iconPatternSetting}>
                    <h2>4.2 Select Icons size in Pattern</h2>
                    <div className={styles.iconPaternSettingDisplayValue}>
                      Icon Size: {iconPatternSize}{" "}
                      <span
                        className={styles.defaultChanger}
                        onClick={() => setIconPatternSize(2)}
                      >
                        {"("}default 2{")"}
                      </span>
                    </div>
                    <input
                      type="range"
                      name="icon_size"
                      value={iconPatternSize}
                      min="1"
                      max="30"
                      onChange={(e) => setIconPatternSize(e.target.value)}
                    ></input>
                  </div>
                  <div className={styles.iconPatternSetting}>
                    <h2>4.3 Select Rotation in Pattern</h2>
                    <div className={styles.iconPaternSettingDisplayValue}>
                      Rotation : {iconPatternRotation}{" "}
                      <span
                        className={styles.defaultChanger}
                        onClick={() => setIconPatternRotation(330)}
                      >
                        {"("}default 330{")"}
                      </span>
                    </div>
                    <input
                      type="range"
                      name="icon_size"
                      value={iconPatternRotation}
                      min="0"
                      max="360"
                      onChange={(e) => setIconPatternRotation(e.target.value)}
                    ></input>
                  </div>{" "}
                  <div className={styles.iconPatternSetting}>
                    <h2>4.4 Select icon shade in Pattern</h2>
                    <select
                      type="text"
                      onChange={(e) => setIconPatternShade(e.target.value)}
                    >
                      <option value={-25}>Dark (default)</option>
                      <option value={28}>Light</option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className={styles.modifierSettings__colorSelect}>
                <h2>5. Select background color</h2>
                <ChromePicker
                  color={bgColor}
                  onChangeComplete={(color) => setBgColor(color)}
                />
                <p className={styles.notionColours}>Notion Colours</p>
                <CirclePicker
                  color={bgColor}
                  onChangeComplete={(color) => setBgColor(color)}
                  className={styles.circlePicker}
                  colors={[
                    "#9B9A97",
                    "#64473A",
                    "#D9730D",
                    "#DFAB01",
                    "#0F7B6C",
                    "#0B6E99",
                    "#6940A5",
                    "#AD1A72",
                    "#E03E3E",
                  ]}
                />
              </div>
            </div>
            <div className={styles.coverPreview}>
              <div className={styles.previewBox}>
                <h2>
                  Live Preview{" "}
                  {loading ? (
                    <span className={styles.loadingMsg}>
                      Loading: {versionCount}
                    </span>
                  ) : (
                    <></>
                  )}
                </h2>

                {errorIconFetch ? (
                  <div className={styles.errorCover}>
                    <div className={styles.errorTextWrapper}>
                      <h2>Icon: "{icon}" not found </h2>
                      <p>You may have copied the incorrect icon name</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.previewSvg}
                    dangerouslySetInnerHTML={{ __html: generatedCoverSvg }}
                  />
                )}
              </div>

              <div className={styles.downloadBtnWraper}>
                <a ref={downloadHelper_a_tag}></a>
                <button
                  className={styles.downloadBtn}
                  onClick={handleDownloadCover}
                  disabled={errorIconFetch}
                >
                  Download Cover
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          Made By <a href="https://srujangurram.me"> Srujan</a>
        </footer>
      </div>
    </>
  );
}
