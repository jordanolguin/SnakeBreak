import "../../src/index.css";

const Menu = ({ onRouteChange }) => {
  return (
    <div className="menu">
      <div>
        <input
          onClick={onRouteChange}
          className="start"
          type="button"
          value="Start"
        />
      </div>
    </div>
  );
};

export default Menu;
