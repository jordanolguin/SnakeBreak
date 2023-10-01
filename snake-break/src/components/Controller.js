import "../../src/index.css";

const Controller = ({ onUp, onDown, onLeft, onRight }) => {
  return (
    <div className="controller">
      <div className="up">
        <input className="upwards" onClick={onUp} type="button" value="Up" />
      </div>
      <div className="left-right">
        <input
          className="leftwards"
          onClick={onLeft}
          type="button"
          value="Left"
        />
        <input
          className="rightwards"
          onClick={onRight}
          type="button"
          value="Right"
        />
      </div>
      <div className="down">
        <input
          className="downwards"
          onClick={onDown}
          type="button"
          value="Down"
        />
      </div>
    </div>
  );
};

export default Controller;
