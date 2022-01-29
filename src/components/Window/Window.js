import { useEffect, useRef, useState } from "react";

import CloseIcon from "/src/components/Icons/Close/CloseIcon";
import MaximizeIcon from "/src/components/Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "/src/components/Icons/Minimize/MinimizeIcon";

import styles from "./Window.module.scss";

const Window = ({ title, width, height, top, left, zIndex, focusCallback, children, isResizable = true }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const windowRef = useRef(null);

  useEffect(() => {
    typeof focusCallback === "function" && focusCallback();
  }, [focusCallback]);

  return (
    <div
      className={`window ${styles.window} ${isFocused && styles.focused}`}
      style={{ width, height, top, left, minWidth, minHeight, zIndex, visibility: isVisible ? "visible" : "hidden" }}
      ref={windowRef}
      tabIndex={-1}
      onFocus={() => {
        typeof focusCallback === "function" && focusCallback();
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      {isResizable && (
        <>
          <div className={`topResizer ${styles.topResizer}`}></div>
          <div className={`rightResizer ${styles.rightResizer}`}></div>
          <div className={`bottomResizer ${styles.bottomResizer}`}></div>
          <div className={`leftResizer ${styles.leftResizer}`}></div>
          <div className={`topLeftResizer ${styles.topLeftResizer}`}></div>
          <div className={`topRightResizer ${styles.topRightResizer}`}></div>
          <div className={`bottomLeftResizer ${styles.bottomLeftResizer}`}></div>
          <div className={`bottomRightResizer ${styles.bottomRightResizer}`}></div>
        </>
      )}
      <div className={`titleBar ${styles.titleBar}`} style={{ height: titleBarHeight }}>
        <div className={styles.title}>{title}</div>
        <MinimizeIcon />
        <MaximizeIcon />
        <CloseIcon
          callback={() => {
            setIsVisible(false);
          }}
        />
      </div>
      <div
        className={`body ${styles.body}`}
        style={{
          width: `calc(100% - 2 * ${bodyMargin}px)`,
          height: `calc(100% - ${titleBarHeight}px - 3 * ${bodyMargin}px)`,
          margin: bodyMargin,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;
