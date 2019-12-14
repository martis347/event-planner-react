import React, { useEffect, useState, useCallback, useRef } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { User } from "models";

interface AuthenticationContextType {
  showAdminContent: boolean;
  user?: User;
  loggingIn: boolean;
  signIn: (name: string) => void;
  signOut: () => void;
}

export const AuthenticationContext = React.createContext<
  AuthenticationContextType
>({
  showAdminContent: false,
  user: undefined,
  loggingIn: false,
  signIn: () => {},
  signOut: () => {}
});

const GET_USER = gql`
  query user($userId: String!) {
    user(id: $userId) {
      name
      id
      isAdmin
    }
  }
`;

const SIGN_IN = gql`
  mutation signIn($user: UserInput!) {
    signIn(user: $user) {
      name
      id
      isAdmin
    }
  }
`;

export const useAuthenticationContext = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    User | undefined
  >();
  const userId = useRef(localStorage.getItem("userId"));

  const [signIn] = useMutation<{ signIn: User }>(SIGN_IN);
  const { data, loading } = useQuery<{ user: User }>(GET_USER, {
    variables: {
      userId: userId.current
    },
    skip: !userId.current
  });

  const handleSignIn = useCallback(
    async (name: string) => {
      const { data } = await signIn({
        variables: {
          user: {
            name: name.trim()
          }
        }
      });

      setAuthenticatedUser(data!.signIn);
      localStorage.setItem("userId", data!.signIn.id);
    },
    [signIn]
  );

  const handleSignOut = useCallback(() => {
    setAuthenticatedUser(undefined);
    localStorage.removeItem("userId");
  }, []);

  useEffect(() => {
    if (data) {
      setAuthenticatedUser(data.user);
    }
    setLoggingIn(loading);
  }, [data, loading]);

  return {
    loggingIn,
    user: authenticatedUser,
    showAdminContent: !!authenticatedUser?.isAdmin,
    signIn: handleSignIn,
    signOut: handleSignOut
  };
};
