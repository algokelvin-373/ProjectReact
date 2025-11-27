import { useRef } from "react";
import html2pdf from "html2pdf.js";

export const useCV = () => {
  const cvRef = useRef(null);

  const downloadCV = (filename = "Alex_Johnson_CV.pdf") => {
    if (!cvRef.current) return;

    const options = {
      margin: 10,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    html2pdf().set(options).from(cvRef.current).save();
  };

  return { cvRef, downloadCV };
};
