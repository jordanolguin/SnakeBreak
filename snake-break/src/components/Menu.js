const Menu = ({ onRouteChange }) => {
  return (
    <div className="menu">
      <div>
        <input onClick={onRouteChange} type="button" value="Start" />
      </div>
    </div>
  );
};

export default Menu;
