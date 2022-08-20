import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { Router } from 'vue-router';

const signInWithEmailAndPassword =
  (auth: Auth, router: Router) => async (email: string, password: string) => {
    const { user } = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await router.push('/');

    return {
      uid: user.uid!,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      accessToken: user.accessToken!,
      email: user.email!,
    };
  };

const logout = (auth: Auth, router: Router) => async () => {
  await signOut(auth);
  await router.push('/login');
};

const signInWithGoogle =
  (auth: Auth, provider: GoogleAuthProvider, router: Router) => async () => {
    const { user } = await signInWithPopup(auth, provider);

    await router.push('/');

    return {
      uid: user.uid,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      accessToken: user.accessToken,
      email: user.email,
    } as Domain.User;
  };

const getCurrentUser = (auth: Auth) => () => {
  if (auth.currentUser) {
    return {
      uid: auth.currentUser.uid,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      accessToken: auth.currentUser.accessToken,
      email: auth.currentUser.email,
    } as Domain.User;
  }

  return null;
};

export const createFirebaseAuth = (
  auth: Auth,
  router: Router,
): Services.AuthService => {
  const googleProvider = new GoogleAuthProvider();

  return {
    signInWithEmailAndPassword: signInWithEmailAndPassword(auth, router),
    signInWithGoogle: signInWithGoogle(auth, googleProvider, router),
    logout: logout(auth, router),
    getCurrentUser: getCurrentUser(auth),
  };
};
