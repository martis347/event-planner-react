import React, { useContext, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import { User, SignOut } from "icons/regular";
import { AuthenticationContext } from "context/AuthenticationContext";
import { Button, Input } from "global-components";
import { Popover } from "@material-ui/core";

const StyledWrapper = styled.div`
  height: 60px;
  background-color: #182659;
  display: flex;
  justify-content: space-between;

  img {
    height: 36px;
    padding: 12px;
  }
`;

const StyledUsername = styled.div`
  display: flex;
  align-items: center;
  color: white;

  span {
    color: white;
    padding-right: 10px;
  }
  svg {
    width: 20px;
  }
`;

const PopoverWrapper = styled.div`
  padding: 0 8px;
  display: flex;
`;

const StyledButton = styled(Button)`
  background: transparent;
  margin: 0;
  height: 100%;
  border-radius: 0;
`;

const Header = () => {
  const { user, signIn, signOut, loggingIn } = useContext(
    AuthenticationContext
  );
  const [username, setUsername] = useState("");
  const [
    signInPopoverAnchor,
    setSignInPopoverAnchor
  ] = React.useState<Element | null>();

  const handleSignIn = useCallback(() => {
    if (username) {
      signIn(username);
      setSignInPopoverAnchor(null);
      setUsername("");
    }
  }, [signIn, username]);

  const userContent = useMemo(() => {
    if (loggingIn) {
      return null;
    }

    if (user) {
      return (
        <div style={{ display: "flex" }}>
          <StyledButton onClick={signOut}>
            <StyledUsername>
              <span>Sign out {user.name}</span>
              <SignOut />
            </StyledUsername>
          </StyledButton>
        </div>
      );
    }

    return (
      <>
        <Button
          style={{ margin: 15, marginRight: 24 }}
          onClick={e => setSignInPopoverAnchor(e.currentTarget)}
        >
          Sign in
        </Button>
        <Popover
          onClose={() => setSignInPopoverAnchor(null)}
          open={!!signInPopoverAnchor}
          anchorEl={signInPopoverAnchor}
        >
          <PopoverWrapper>
            <Input
              autofocus
              icon={<User />}
              placeholder="Your name"
              value={username}
              style={{ marginRight: 16 }}
              onChange={setUsername}
              onEnter={handleSignIn}
            />
            <Button disabled={!username} onClick={handleSignIn}>
              Sign in
            </Button>
          </PopoverWrapper>
        </Popover>
      </>
    );
  }, [loggingIn, user, signInPopoverAnchor, username, handleSignIn, signOut]);

  return (
    <StyledWrapper>
      <img src="logo.svg" alt="Hyarchis logo" />
      {userContent}
    </StyledWrapper>
  );
};

export default Header;
