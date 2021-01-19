import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import M from "materialize-css";
import PDFpreview from "../pdfGenration/PDFpreview";
import "./css/pdfPreviewModal.css";
function PDFpreviewModal({ previewHandler, isTrue, templateId, resumeInfo }) {
  useEffect(() => {
    let element = document.querySelectorAll(".modal");
    let instance = M.Modal.init(element, { dismissible: false });
    return () => {
      instance[0].destroy();
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      id="PDFpreview"
      className="modal modal-fixed-footer bottom-sheet pdf-preview-modal  pdf-perviw-modal"
    >
      <div className="modal-content center">
        {isTrue ? (
          <PDFpreview templateId={templateId} resumeInfo={resumeInfo} />
        ) : (
          "hello"
        )}
      </div>
      <div className="modal-footer pdf-perviw-modal-footer">
        <button
          onClick={previewHandler}
          className="modal-close waves-effect waves-green btn pdf-perviw-modal-btn"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default PDFpreviewModal;
