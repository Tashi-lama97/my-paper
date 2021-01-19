import React from "react";
import BaseWrapper from "../core/BaseWrapper";
import TEMPLATE1 from "./images/template1.jpg";
import TEMPLATE2 from "./images/template2.png";
import TEMPLATE3 from "./images/template3.png";
import TEMPLATE4 from "./images/template4.png";
import TEMPLATE5 from "./images/template5.png";
import TEMPLATE6 from "./images/template6.png";
import TemplateCard from "../core/TemplateCard";
import "./css/templates.css";

const Templates = () => {
  return (
    <BaseWrapper>
      <div className="template-heading">Templates</div>
      <div className="row">
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="1"
            tempimage={TEMPLATE1}
            ctitle="Basic"
            cdiscription="Easily personalize this basic resume layout that can be completed in under ten minutes through our intuitive process."
          />
        </div>
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="2"
            tempimage={TEMPLATE2}
            ctitle="Basic Colors"
            cdiscription="A Basic colorful Layout Easy to Customize "
          />
        </div>
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="3"
            tempimage={TEMPLATE3}
            ctitle="The Advance"
            cdiscription="A beautiful layout with skill meter and beautiful heading icons."
          />
        </div>
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="4"
            tempimage={TEMPLATE4}
            ctitle="The More Advance"
            cdiscription="A beautiful layout with skill meter"
          />
        </div>
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="5"
            tempimage={TEMPLATE5}
            ctitle="Beauty of Simplicity"
            cdiscription="Simple but appealing layout"
          />
        </div>
        <div className="col s12 m4 templates-divisions">
          <TemplateCard
            tempid="6"
            tempimage={TEMPLATE6}
            ctitle="The Funk"
            cdiscription="A layout with Eye-popping colors"
          />
        </div>
      </div>
    </BaseWrapper>
  );
};

export default Templates;
