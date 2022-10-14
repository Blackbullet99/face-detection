const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black underline pa3 pointer"
        >
          SIGN OUT
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          SIGN IN
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          REGISTER
        </p>
      </nav>
    );
  }
};

export default Navigation;
