import { createRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const E_KEY = 69;
const DASH = 189;
const DOT = 190;
const MOBILE_DOT = 229;

const PinInput = ({ numberOfPins = 6, onChange, error = false, value }) => {
  const values = value.split('');
  const pins = [];
  const classes = useStyles({ error: error });
  const inputRefs = [];

  // trigger input onchange
  const handleOnChange = (index, e) => {
    e.preventDefault();
    if (numberOfPins - 1 > index) {
      inputRefs[index + 1].current.focus();
    }

    if (inputRefs[index].current.value !== null) {
      inputRefs[index].current.value = e.target.value.substr(e.target.value.length - 1);
    }

    setValues();
  };

  const handleOnKeyPress = (index, e) => {
    const charCode = typeof e.which === 'undefined' ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) {
      e.preventDefault();
    } else {
      e.preventDefault();
      if (numberOfPins - 1 > index) {
        inputRefs[index + 1].current.focus();
      }

      if (inputRefs[index].current.value !== null) {
        inputRefs[index].current.value = e.key.substr(e.key.length - 1);
      }

      setValues();
    }
  };

  // trigger input special keys which is backspace, arrows etc
  const onKeyDown = (index, e) => {
    switch (e.keyCode) {
      case BACKSPACE_KEY:
        e.preventDefault();
        if (hasCurrentElement(index)) {
          if (inputRefs[index].current.value === '' && hasCurrentElement(index - 1)) {
            inputRefs[index - 1].current.focus();
            inputRefs[index - 1].current.value = '';
          }
          inputRefs[index].current.value = '';
          setValues();
        }
        break;
      case LEFT_ARROW_KEY:
        e.preventDefault();
        hasCurrentElement(index - 1) && inputRefs[index - 1].current.focus();
        break;
      case RIGHT_ARROW_KEY:
        e.preventDefault();
        hasCurrentElement(index + 1) && inputRefs[index + 1].current.focus();
        break;
      case UP_ARROW_KEY:
      case DOWN_ARROW_KEY:
      case E_KEY:
      case DOT:
      case DASH:
        e.preventDefault();
        break;
      case MOBILE_DOT:
        return false;
      default:
        break;
    }
  };

  const hasCurrentElement = (index) => inputRefs[index];

  const onPaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData ? e.clipboardData.getData('Text') : '';
    const length = pastedValue.length;

    if (length > 0 && !Number.isNaN(+pastedValue) && !pastedValue.includes('e')) {
      const realLength = length > numberOfPins ? numberOfPins : length;
      for (let index = 0; index < realLength; index += 1) {
        inputRefs[index].current.value = pastedValue[index];
      }
      if (hasCurrentElement(realLength - 1)) {
        realLength === numberOfPins ? inputRefs[realLength - 1].current.focus() : inputRefs[realLength].current.focus();
        setValues();
      }
    }
  };

  const setValues = () => {
    const values = [];

    for (const input of inputRefs) {
      values.push(input.current.value);
    }

    onChange(values.join(''));
  };

  for (let index = 0; index < numberOfPins; index += 1) {
    const newRef = createRef();
    inputRefs.push(newRef);
    pins.push(
      <div key={index} className={classes.pinDefaultStyle}>
        <input
          ref={newRef}
          className={classes.pinText}
          id={index.toString()}
          type="number"
          autoFocus={values.length === index}
          min={0}
          max={9}
          placeholder="0"
          pattern="\d*"
          autoComplete="off"
          value={values[index] || ''}
          onChange={(e) => handleOnChange(index, e)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onKeyPress={(e) => handleOnKeyPress(index, e)}
          onPaste={(e) => onPaste(e)}
        />
      </div>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="center" width={328} className={classes.boxWidth}>
        {pins}
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  pinDefaultStyle: {
    width: 48,
    height: 67,
    marginRight: theme.spacing(1),
    borderRadius: 5,
    '&:nth-last-child(1)': {
      marginRight: 0
    }
  },
  pinText: (props) => ({
    borderRadius: 5,
    border: `1px solid ${props.error ? 'rgb(255, 72, 66)' : 'rgba(145, 158, 171, 0.32)'}`,
    outline: 'none',
    boxSizing: 'border-box',
    color: '#FFF',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    height: '100%',
    width: '100%',
    backgroundColor: props.error ? 'rgba(247, 247, 53, 0.1)' : '#000',
    '&[type=number]': {
      '-moz-appearance': 'textfield',
      '-webkit-user-select': 'auto'
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&:focus': {
      outline: 'none',
      border: `1px solid #FFF`
    }
  }),
  boxWidth: {},
  ['@media (max-width: 330px)']: {
    boxWidth: {
      width: 280,
      maxWidth: '100%'
    },
    pinDefaultStyle: {
      height: 57
    }
  }
}));

export default PinInput;
