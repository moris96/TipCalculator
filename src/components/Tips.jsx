import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Slider from '@react-native-community/slider';


const Tips = () => {
  const [billTotal, setBillTotal] = useState('');
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState('');
  const [tipTotal, setTipTotal] = useState(0);
  const [amountTotal, setAmountTotal] = useState(0);
  const [inputMethod, setInputMethod] = useState('slider');
  const [darkMode, setDarkMode] = useState(false);


  const tipTotalAnimation = useRef(new Animated.Value(0)).current;
  const amountTotalAnimation = useRef(new Animated.Value(0)).current;
  // Add a rotation animation
  const rotationValue = useRef(new Animated.Value(0)).current;

  const animateRotation = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 780,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotationValue.setValue(0);
    });
  };
  
  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  }) || '0deg';

    // Call animateRotation when the component mounts
    // useEffect(() => {
    //   animateRotation();
    // }, []);
    

  useEffect(() => {
    animateResult();
  }, [tipTotal, amountTotal]);

  const animateResult = () => {
    Animated.parallel([
      Animated.timing(tipTotalAnimation, {
        toValue: tipTotal,
        duration: 800, // Adjust duration as needed
        useNativeDriver: false,
      }),
      Animated.timing(amountTotalAnimation, {
        toValue: amountTotal,
        duration: 800, // Adjust duration as needed
        useNativeDriver: false,
      }),
    ]).start();
  };

  const tipCalculate = () => {
    const bill = parseFloat(billTotal)
    const tipPercentage = tipPercent
    const people = parseInt(numPeople)

    if(!isNaN(bill) && !isNaN(tipPercentage) && !isNaN(people) && people > 0){
      const tip = (bill * tipPercentage) / 100
      const total = bill + tip
      const tipPerPerson = tip / people
      const totalPerPerson = total / people

      setTipTotal(parseFloat(tipPerPerson.toFixed(2)))
      setAmountTotal(parseFloat(totalPerPerson.toFixed(2)))

      animateRotation()
    }else{
      setTipTotal(0)
      setAmountTotal(0)
    }
  };

  const handleTipButtonPress = (percentage) => {
    setTipPercent(percentage)
  };

  const toggleInputMethod = () => {
    setInputMethod((prevMethod) => (prevMethod === 'slider' ? 'buttons' : 'slider'))
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  };

  return (
    <View style={[styles.container, styles.borderBox, darkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, darkMode && styles.darkModeText]}>Tip Calculator</Text>
      <Text style={[styles.label, darkMode && styles.darkModeText]}>Enter Bill Amount:</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkModeInput]}
        keyboardType="numeric"
        value={billTotal}
        onChangeText={(text) => setBillTotal(text)}
      />

      {inputMethod === 'slider' ? (
        <>
          <Text style={[styles.label, styles.sliderLabel, darkMode && styles.darkModeText]}>
            Select Tip Percentage: {tipPercent}%
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={tipPercent}
            onValueChange={(value) => setTipPercent(value)}
            thumbTintColor="lightgreen"
            maximumTrackTintColor="lightgray"
            minimumTrackTintColor="lightgreen"
          />
        </>
      ) : (
        inputMethod === 'buttons' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.tipButton, tipPercent === 15 && styles.selectedButton]}
              onPress={() => handleTipButtonPress(15)}
            >
              <Text style={styles.buttonText}>15%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tipButton, tipPercent === 18 && styles.selectedButton]}
              onPress={() => handleTipButtonPress(18)}
            >
              <Text style={styles.buttonText}>18%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tipButton, tipPercent === 20 && styles.selectedButton]}
              onPress={() => handleTipButtonPress(20)}
            >
              <Text style={styles.buttonText}>20%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tipButton, tipPercent === 25 && styles.selectedButton]}
              onPress={() => handleTipButtonPress(25)}
            >
              <Text style={styles.buttonText}>25%</Text>
            </TouchableOpacity>
            {/* Add more buttons as needed */}
          </View>
        )
      )}

      <Text style={[styles.label, darkMode && styles.darkModeText]}>Enter Number of People:</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkModeInput]}
        keyboardType="numeric"
        value={numPeople}
        onChangeText={(text) => setNumPeople(text)}
      />

      <TouchableOpacity
        style={[styles.toggleButton, darkMode && styles.darkModeButton]}
        onPress={toggleInputMethod}
      >
        <Text style={[styles.toggleButtonText, darkMode && styles.darkModeText]}>
          {inputMethod === 'slider' ? 'Click to use Buttons' : 'Click to use Slider'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.calculateButton, darkMode && styles.darkModeButton]}
        onPress={tipCalculate}
      >
        <Text style={[styles.calculateButtonText, darkMode && styles.darkModeText]}>Calculate</Text>
      </TouchableOpacity>

    <Animated.Text style={[styles.result, { transform: [{ rotate: rotate }] }, darkMode && styles.darkModeText]}>
      Total Tip per Person: ${tipTotal.toFixed(2)}
    </Animated.Text>

    <Animated.Text style={[styles.result, { transform: [{ rotate: rotate }] }, darkMode && styles.darkModeText]}>
      Total Amount per Person: ${amountTotal.toFixed(2)}
    </Animated.Text>

      <TouchableOpacity
        style={[styles.toggleButton, darkMode && styles.darkModeButton]}
        onPress={toggleDarkMode}
      >
        <Text style={[styles.toggleButtonText, darkMode && styles.darkModeText]}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  borderBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    marginBottom: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 24,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  slider: {
    height: 40,
    marginBottom: 16,
    borderRadius: 10,
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipButton: {
    backgroundColor: 'blue', // Default button color
    padding: 10,
    borderRadius: 15,
  },
  selectedButton: {
    backgroundColor: 'red', // Selected button color
  },
  buttonText: {
    color: 'white',
  },
  toggleButton: {
    backgroundColor: 'red', // Default toggle button color
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  clickedButton: {
    backgroundColor: 'red', // Toggle button color when clicked
  },
  toggleButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  calculateButton: {
    backgroundColor: 'green', // Calculate button color
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  calculateButtonText: {
    color: 'white',
  },
  result: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Dark mode stuff 
  darkModeContainer: {
    backgroundColor: 'black',
  },
  darkModeText: {
    color: 'white',
  },
  darkModeInput: {
    borderColor: 'white',
    color: 'white',
  },
  darkModeButton: {
    backgroundColor: 'red',
  },
});

export default Tips;
