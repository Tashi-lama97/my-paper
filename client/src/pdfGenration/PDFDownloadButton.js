import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import Template1 from "./templates/Template1";
import "./css/downloadPDFButton.css";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template6 from "./templates/Template6";
import Template5 from "./templates/Template5";
import Template4 from "./templates/Template4";

const PDFDownloadButton = ({ cssList, resumeInfo }) => {
  const { resumeTemplate } = resumeInfo;

  const selectDownloadTemplate = (templateId) => {
    switch (templateId) {
      case 1:
        return (
          <PDFDownloadLink
            document={<Template1 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      case 2:
        return (
          <PDFDownloadLink
            document={<Template2 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      case 3:
        return (
          <PDFDownloadLink
            document={<Template3 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      case 4:
        return (
          <PDFDownloadLink
            document={<Template4 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      case 5:
        return (
          <PDFDownloadLink
            document={<Template5 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      case 6:
        return (
          <PDFDownloadLink
            document={<Template6 resumeInfo={resumeInfo} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download PDF"
            }
          </PDFDownloadLink>
        );
      default:
        break;
    }
  };
  return (
    <div className={cssList}>{selectDownloadTemplate(resumeTemplate)}</div>
  );
};

export default PDFDownloadButton;
