import React, {useState, useEffect, useContext, createContext} from "react";
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from "../firebaseConfig/index";
import { gql, useMutation, ApolloClient, InMemoryCache } from "@apollo/client";
// import { gql, useMutation} from "@apollo/client";

const LOGIN_MUTATION = gql`mutation UserLogin($username: String!, $password: String!) {
  userLogin(username: $username, password: $password) {
    token
    user {
      username
      email
      id
    }
  }
}`;


const client = new ApolloClient({ 
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
  });

const authContext = createContext();


// Provider component that wraps your app and makes auth object ..
// ... available to any child component that calls useAuth().

export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.

export const useAuth = () => {
  return useContext(authContext);
};


// Provider hook that creates auth object and handles state

function useProvideAuth() {
  // const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStart = () => {
    setLoading(true);
    setError('');
  }

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  }

  const fetchError = (error) => {
    setLoading(false);
    setError(error.message);
  }

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const loginWithSocial = (platform, callbackFun) => {
    let authProvider = googleAuthProvider;
    if (platform === 'facebook') {
      authProvider = facebookAuthProvider;
    }

    if (platform === 'github') {
      authProvider = githubAuthProvider;
    }

    if (platform === 'twitter') {
      authProvider = twitterAuthProvider;
    }

    try {
      fetchStart();
      return auth.signInWithPopup(authProvider)
        .then(response => {
          fetchSuccess();
          setUser(response.user);
          if (callbackFun) callbackFun();
          return response.user;
        }).catch(error => {
          fetchError(error);
        });
    } catch (error) {
      fetchError(error);
    }
  }

 

  const login = async (email, password, callbackFun) => {
    try {
      fetchStart();

      const { data } = await client.mutate({
        mutation: gql`mutation UserLogin($username: String!, $password: String!) {
          userLogin(username: $username, password: $password) {
            token
            user {
              username
              email
              id
            }
          }
        }`,
        variables: { 
          username: email,
          password: password }
      });

      if(data?.userLogin?.token){
        fetchSuccess();
          setUserDetails(data?.userLogin?.user);
          setUser(true);
          window.sessionStorage.setItem("userLogin","true");
          window.sessionStorage.setItem("userDetails",JSON.stringify(data?.userLogin?.user) );
          if (callbackFun) callbackFun();
          return data?.userLogin;
      }else{
        fetchError({message: "Incorrect Credentials"});
      }

      // return auth.signInWithEmailAndPassword(email, password)
      //   .then(response => {
      //     fetchSuccess();
      //     setUser(response.user);
      //     if (callbackFun) callbackFun();
      //     return response.user;
      //   }).catch(error => {
      //     fetchError(error);
      //   }); 
      
      // return loginMutation({
      //   variables: {
      //     username: email,
      //     password: password
      //   },
      // })
      //   .then(resp => {
      //     if(resp?.data?.userLogin?.token){
      //       fetchSuccess();
      //       setUser(resp?.data?.useLogin?.user);
      //       if (callbackFun) callbackFun();
      //       return resp?.useLogin?.user;
      //     }else{
      //       return null;
      //     }
         
      //   })
      //   .catch(error => {
      //     fetchError(error);
      //   });

    } catch (error) {
      fetchError(error);
    }
  };



  const signup = (email, password, callbackFun) => {
    try {
      fetchStart();
      return auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          fetchSuccess();
          setUser(response.user);
          if (callbackFun) callbackFun();
          return response.user;
        }).catch(error => {
          fetchError(error);
        });
    } catch (error) {
      fetchError(error);
    }
  };

  const signOut = () => {
    return auth.signOut()
      .then(() => {
        window.sessionStorage.setItem("userLogin","false");
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    try {
      fetchStart();
      return auth.sendPasswordResetEmail(email)
        .then(() => {
          fetchSuccess();
          if (callbackFun) callbackFun();
          return true;
        }).catch(error => {
          fetchError(error);
        });
    } catch (error) {
      fetchError(error);
    }
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    try {
      fetchStart();
      return auth.confirmPasswordReset(code, password)
        .then(() => {
          fetchSuccess();
          if (callbackFun) callbackFun();
          return true;
        }).catch(error => {
          fetchError(error);
        });
    } catch (error) {
      fetchError(error);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const unsubscribe = () => {

    const ul =  window.sessionStorage.getItem("userLogin");
    const det =  window.sessionStorage.getItem("userDetails");
    console.log("ul", ul)
    console.log("det", det)

      if (ul == "true") {
        setUser(true);
        setUserDetails(JSON.parse(det));
      } else {
        setUser(false);
      }

      setLoadingUser(false);
    };

    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     setUser(user);
    //   } else {
    //     setUser(false);
    //   }

    //   setLoadingUser(false);
    // });
    unsubscribe()

    // Cleanup subscription on unmount
    // return () => unsubscribe();


  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    user,
    userDetails,
    error,
    login,
    signup,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    loginWithSocial
  };
}

export const isUnRestrictedRoute = (pathname) => {
  return pathname === '/signin' || pathname === '/signup'
}
