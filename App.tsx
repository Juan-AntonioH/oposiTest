import React, { useEffect, useRef, useState, } from 'react';
import { Animated, } from 'react-native';
import { AnimatedSplash, } from '@/features/splash/AnimatedSplash';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRouter } from '@/navigation/AuthRouter';
import { useAuthStore } from '@/store/authStore';

import { addQuerys } from './agregarDatosDB';
import { uploadQuestionsFromExcel } from './agregarDatosTablaDB';

export default function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  const MIN_SPLASH_DURATION = 4000; // 1000 = 1 segundo

  const authLoading =
    useAuthStore(
      state =>
        state.status === 'loading',
    );

  const initialized =
    useAuthStore(
      state =>
        state.initialized,
    );
  const [

    splashFinished,

    setSplashFinished,

  ] = useState(
    false,
  );

  const [

    minimumTimeFinished,

    setMinimumTimeFinished,

  ] = useState(
    false,
  );

  const progress =
    useRef(

      new Animated.Value(
        0,
      ),

    ).current;

  useEffect(() => {
    initAuth();
    // addQuerys(); //agregar datos a firestore
    // @ts-ignore
    // uploadQuestionsFromExcel(require("./Estructura_Pregunta.xlsx"));
  }, []);

  useEffect(() => {

    const minimumTimer =

      setTimeout(() => {

        setMinimumTimeFinished(
          true,
        );

      },

        MIN_SPLASH_DURATION,

      );

    return () => {

      clearTimeout(
        minimumTimer,
      );

    };

  }, []);

  const appReady =

    minimumTimeFinished

    &&

    initialized;

  useEffect(() => {

    if (
      !appReady
    ) {

      Animated.timing(

        progress,

        {

          toValue: 80,

          duration: 1000,

          useNativeDriver:
            false,

        },

      ).start();

      return;

    }

    Animated.timing(

      progress,

      {

        toValue: 100,

        duration: 400,

        useNativeDriver: false,

      },

    ).start(({
      finished,
    }) => {

      if (!finished) {

        return;

      }

      setTimeout(() => {

        setSplashFinished(true,);

      },

        500);

    });

  }, [

    appReady,

    progress,

  ]);

  if (
    !splashFinished
  ) {

    return (

      <AnimatedSplash

        progress={progress}

        isLoading={authLoading}

      />

    );

  }
  return (
    <>
      <NavigationContainer>
        <AuthRouter />
      </NavigationContainer>
      <Toast
        position="top"
        // bottomOffset={80}
        topOffset={100}
        visibilityTime={3000}
      />
    </>
  );
}