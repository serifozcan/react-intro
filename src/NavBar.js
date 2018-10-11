import React from "react";
import { Link } from "@reach/router";
import styled, { keyframes } from "react-emotion";
import colors from "./colors";

const Spin = keyframes`
from {
  transform: rotate(0deg)
}

to {
  transform: rotate(360deg)
}
`;

const SpyGlass = styled("span")`
  display: inline-block;
  animation: ${props => props.frequency}s ${Spin} linear infinite;
`;

const Component = styled("header")`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;
const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

class NavBar extends React.Component {
  state = { frequency: 10 };
  render() {
    return (
      <Component>
        <NavLink to="/">Adopt Me!</NavLink>
        <NavLink to="/search-params">
          {
            /* eslint-disable-next-line */
            <SpyGlass
              frequency={this.state.frequency}
              aria-label="search"
              role="img"
            >
              🔍
            </SpyGlass>
          }
        </NavLink>
      </Component>
    );
  }
}

export default NavBar;
