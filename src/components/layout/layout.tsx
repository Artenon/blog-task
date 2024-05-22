import { FC } from "react";
import { Box, Container, Typography, IconButton, styled, containerClasses } from "@mui/material";
import { Outlet, Link, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

const Header = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  height: 60,
  backgroundColor: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  backdropFilter: "blur(10px)",
  display: "flex",
  [` .${containerClasses.root}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  " a": { textDecoration: "none", color: "#222" },
});

const LinkButton = styled(IconButton)({
  borderRadius: "8px",
  fontSize: "18px",
  transition: "0.1s ease-out",
  color: "#3D302D",
  ":hover": {
    color: "#fff",
    backgroundColor: "rgba(61,48,45, 0.8)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
});

export const Layout: FC = () => {
  const { pathname } = useLocation();

  return (
    <Box>
      <Header>
        <Container>
          <Typography variant="h5">
            <Link to="/">Blog</Link>
          </Typography>

          <Box>
            <Link to="/create">
              <LinkButton
                disableRipple
                sx={{
                  display: pathname === "/create" ? "none" : "flex",
                }}
              >
                Создать
                <AddIcon fontSize="small" />
              </LinkButton>
            </Link>
          </Box>
        </Container>
      </Header>

      <Box sx={{ marginTop: "70px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
