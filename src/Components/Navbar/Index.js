import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.card_light};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  @media (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

const NavLogo = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  width: 80%;
  padding: 0 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0 0px;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  
  @media screen and (max-width: 768px) {
    display: none;  /* Hide the container on smaller screens */
  }
`;

const GitHubButton = styled.a`
  color: ${({ theme }) => theme.primary};
  border: 1.8px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  width: 265px;
  :hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
  @media screen and (max-width: 768px) {
    display: block;  /* Hide the button on smaller screens */
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  transition: all 0.6s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ open }) => (open ? "100%" : "0")};
  z-index: ${({ open }) => (open ? "1000" : "-1000")};
`;

const MobileMenuLink = styled(Link)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="/">
          Mukul's Portfolio
        </NavLogo>
        
        <MobileIcon>
          <FaBars
            onClick={() => {
              setOpen(!open);
            }}
          />
        </MobileIcon>
        
        <NavItems>
          <NavLink className="About" href="#about">
            About
          </NavLink>
          <NavLink className="Skills" href="#skills">
            Skills
          </NavLink>
          <NavLink className="Project" href="#projects">
            Projects
          </NavLink>
          <NavLink className="Education" href="#education">
            Education
          </NavLink>
        </NavItems>
        
        <ButtonContainer>
          <GitHubButton
            className="githubButton"
            href="https://github.com/mukuln18"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Profile
          </GitHubButton>
        </ButtonContainer>
      </NavbarContainer>
      
      {open && (
        <MobileMenu open={open}>
          <MobileMenuLink
            to="#about"
            onClick={() => setOpen(!open)}
          >
            About
          </MobileMenuLink>
          <MobileMenuLink
            to="#skills"
            onClick={() => setOpen(!open)}
          >
            Skills
          </MobileMenuLink>
          <MobileMenuLink
            to="#projects"
            onClick={() => setOpen(!open)}
          >
            Projects
          </MobileMenuLink>
          <MobileMenuLink
            to="#education"
            onClick={() => setOpen(!open)}
          >
            Education
          </MobileMenuLink>
          <GitHubButton
            style={{
              padding: "10px 16px",
              background: `${theme.primary}`,
              color: "white",
              width: "max-content",
            }}
            href="https://github.com/your-github-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Profile
          </GitHubButton>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar;
