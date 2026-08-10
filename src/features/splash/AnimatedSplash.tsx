import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    Image,
    Text,
    View,
} from 'react-native';

import {
    styles,
} from './splash.styles';

interface AnimatedSplashProps {

    progress:
        Animated.Value;

    isLoading:
        boolean;

}

export function AnimatedSplash({

    progress,

    isLoading,

}: AnimatedSplashProps) {

    const [

        progressValue,

        setProgressValue,

    ] = useState(
        0,
    );

    const logoScale =
        useRef(

            new Animated.Value(
                0.75,
            ),

        ).current;

    const logoOpacity =
        useRef(

            new Animated.Value(
                0,
            ),

        ).current;

    const logoRotation =
        useRef(

            new Animated.Value(
                0,
            ),

        ).current;

    const contentOpacity =
        useRef(

            new Animated.Value(
                0,
            ),

        ).current;

    useEffect(() => {

        const listenerId =

            progress.addListener(
                ({
                    value,
                }) => {

                    setProgressValue(

                        Math.round(
                            value,
                        ),

                    );

                },
            );

        return () => {

            progress.removeListener(
                listenerId,
            );

        };

    }, [

        progress,

    ]);

    useEffect(() => {

        const entranceAnimation =

            Animated.parallel([

                Animated.spring(

                    logoScale,

                    {

                        toValue:
                            1,

                        friction:
                            6,

                        tension:
                            55,

                        useNativeDriver:
                            true,

                    },

                ),

                Animated.timing(

                    logoOpacity,

                    {

                        toValue:
                            1,

                        duration:
                            650,

                        useNativeDriver:
                            true,

                    },

                ),

                Animated.timing(

                    contentOpacity,

                    {

                        toValue:
                            1,

                        duration:
                            500,

                        delay:
                            350,

                        useNativeDriver:
                            true,

                    },

                ),

            ]);

        const floatingAnimation =

            Animated.loop(

                Animated.sequence([

                    Animated.timing(

                        logoRotation,

                        {

                            toValue:
                                1,

                            duration:
                                1000,

                            useNativeDriver:
                                true,

                        },

                    ),

                    Animated.timing(

                        logoRotation,

                        {

                            toValue:
                                0,

                            duration:
                                1500,

                            useNativeDriver:
                                true,

                        },

                    ),

                ]),

            );

        entranceAnimation.start();

        floatingAnimation.start();

        return () => {

            entranceAnimation.stop();

            floatingAnimation.stop();

        };

    }, [

        contentOpacity,

        logoOpacity,

        logoRotation,

        logoScale,

    ]);

    const rotation =

        logoRotation.interpolate({

            inputRange: [

                0,
                1,
            ],

            outputRange: [

                '-4deg',
                '4deg',
            ],

        });

    const progressWidth =

        progress.interpolate({

            inputRange: [

                0,
                100,
            ],

            outputRange: [

                '0%',
                '100%',
            ],

        });

    return (

        <View
            style={
                styles.container
            }
        >

            <View
                style={
                    styles.content
                }
            >

                <Animated.View

                    style={[

                        styles.logoContainer,

                        {

                            opacity:
                                logoOpacity,

                            transform: [

                                {

                                    scale:
                                        logoScale,

                                },

                                {

                                    rotate:
                                        rotation,

                                },

                            ],

                        },

                    ]}

                >

                    <Image

                        source={
                            require(
                                '@assets/images/app_logo.png'
                            )
                        }

                        style={
                            styles.logo
                        }

                        resizeMode={
                            'contain'
                        }

                    />

                </Animated.View>

                <Animated.View

                    style={[

                        styles.loadingContent,

                        {

                            opacity:
                                contentOpacity,

                        },

                    ]}

                >

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Opositest
                    </Text>

                    <Text
                        style={
                            styles.message
                        }
                    >

                        {

                            isLoading

                                ? 'Preparando tu experiencia…'

                                : 'Todo listo'

                        }

                    </Text>

                    <View
                        style={
                            styles.progressHeader
                        }
                    >

                        <Text
                            style={
                                styles.progressLabel
                            }
                        >
                            Iniciando
                        </Text>

                        <Text
                            style={
                                styles.progressPercentage
                            }
                        >

                            {
                                progressValue
                            }

                            %

                        </Text>

                    </View>

                    <View
                        style={
                            styles.progressTrack
                        }
                    >

                        <Animated.View

                            style={[

                                styles.progressFill,

                                {

                                    width:
                                        progressWidth,

                                },

                            ]}

                        />

                    </View>

                </Animated.View>

            </View>

            <Text
                style={
                    styles.footer
                }
            >
                Tu preparación empieza aquí
            </Text>

        </View>

    );

}