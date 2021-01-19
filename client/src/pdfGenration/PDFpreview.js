import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";

function PDFselecction({ templateId, resumeInfo }) {
  var styles = {};
  if (window.screen.width <= 600) {
    styles = {
      iframe: {
        width: "100%",
        height: "80vh",
      },
    };
  } else {
    styles = {
      iframe: {
        width: "80%",
        height: "80vh",
      },
    };
  }

  const selectTemplate = (id) => {
    switch (id) {
      case "1":
        return (
          <PDFViewer style={styles.iframe}>
            <Template1 resumeInfo={resumeInfo} />
          </PDFViewer>
        );
      case "2":
        return (
          <PDFViewer style={styles.iframe}>
            <Template2 resumeInfo={resumeInfo} />
          </PDFViewer>
        );
      case "3":
        return (
          <PDFViewer style={styles.iframe}>
            <Template3 resumeInfo={resumeInfo} />
          </PDFViewer>
        );
      case "4":
        return (
          <PDFViewer style={styles.iframe}>
            <Template4 resumeInfo={resumeInfo} />
          </PDFViewer>
        );

      case "5":
        return (
          <PDFViewer style={styles.iframe}>
            <Template5 resumeInfo={resumeInfo} />
          </PDFViewer>
        );
      case "6":
        return (
          <PDFViewer style={styles.iframe}>
            <Template6 resumeInfo={resumeInfo} />
          </PDFViewer>
        );

      default:
        break;
    }
  };
  return <div>{selectTemplate(templateId)}</div>;
}

export default PDFselecction;
