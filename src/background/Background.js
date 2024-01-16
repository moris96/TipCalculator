import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ImageBackground, View, StyleSheet } from 'react-native';
import backgroundImage from './background.png';

import {
    INPUT_RANGE_START,
    INPUT_RANGE_END,
    OUTPUT_RANGE_START,
    OUTPUT_RANGE_END,
    ANIMATION_TO_VALUE,
    ANIMATION_DURATION,
} from './constants.js';

const Background = () => {
    const initValue = 0;
    const translateValue = useRef(new Animated.Value(initValue)).current;

    useEffect(() => {
        const translate = () => {
            translateValue.setValue(initValue) // Fix here
            Animated.timing(translateValue, {
                toValue: ANIMATION_TO_VALUE,
                duration: ANIMATION_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => translate());
        };
    
        translate();
    }, [translateValue]);

    const translateAnimation = translateValue.interpolate({
        inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
        outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
    });

    const AnimatedImage = Animated.createAnimatedComponent(ImageBackground)



  return (
    <AnimatedImage 
    resizeMode="repeat" 
    style={[styles.background,{
        transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
    }]}
    source={backgroundImage}
    />
  );
};

const styles = StyleSheet.create({    
background: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.2,
    transform: [
        {
        translateX: 0,
        },
        {
        translateY: 0,
        },
    ],      
    }, 
});

export default Background
