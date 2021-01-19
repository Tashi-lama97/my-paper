import React, { useEffect } from "react";
import "./css/numberCard.css";
const NumberCard = ({
  numberColor = "#7986cb",
  cardHeading = "Heading",
  borderColor = "#7986cb",
  textColor = "#7986cb",
  iconName = "fas fa-users",
  totalCount = 0,
}) => {
  useEffect(() => {
    let timer = "";
    if (totalCount !== 0) {
      let counters = document.querySelectorAll(".cardNumberText");
      const speed = 200;
      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.dataset.value;
          const count = +counter.innerText;
          const inc = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            timer = setTimeout(updateCount, 1);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [totalCount]);

  return (
    <div className="numberCardWrapper z-depth-1">
      <div className="cardIconSection">
        <i className={iconName + " cardIcon"}></i>
      </div>
      <div
        className="cardTextSection"
        style={{ borderRight: `8px solid ${borderColor}` }}
      >
        <h3 className="cardHeadingText" style={{ color: textColor }}>
          {cardHeading}
        </h3>

        <h3
          className="cardNumberText"
          style={{ color: numberColor }}
          data-value={totalCount}
        >
          0
        </h3>
      </div>
    </div>
  );
};

export default NumberCard;
