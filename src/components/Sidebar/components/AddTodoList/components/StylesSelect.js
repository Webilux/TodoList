////////////////////////////// COLOR //////////////////////////////

const dot = (value = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: value,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

export const colourStyles = {
  control: (styles) => ({
    ...styles,
    border: "2px solid #272732",
    backgroundColor: "transparent",
    borderRadius: 19,
    padding: 1,
    ":focus-visible": {
      outline: "none",
      boxShadow: "0 0 2px 1.5px #272732",
      border: "2px solid #272732",
    },
    ":hover": {
      border: "2px solid #272732",
      boxShadow: "none",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    ...dot(data.value),
    alignItems: "center",
    justifyContent: "start",
    display: "flex",
    position: "relative",
    backgroundColor: isDisabled
      ? data.value
      : isFocused
      ? data.value + "2d"
      : "#21212b",
    color: isFocused ? "#272732" : isSelected && data.value,
    cursor: isDisabled ? "not-allowed" : "default",

    ":after": {
      position: "absolute",
      borderRadius: 10,
      content: '"√"',
      display: isSelected ? "block" : "none",
      right: 12,
    },

    ":active": {
      ...styles[":active"],
      backgroundColor:
        !isDisabled && (isSelected ? data.value : data.value + "5a"),
    },
  }),
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({
    ...styles,
    ...dot(),
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.value),
    color: "white",
  }),
  defaultInputValue: () => ({
    test,
  }),
}
////////////////////////////// ICON //////////////////////////////

const icon = (icon = "") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    fontFamily: "RemixIcon",
    fontSize: "inherit",
    lineHeight: 1,
    content: `"${icon}"`,
    display: "block",
    width: 10,
    marginRight: 10,
  },
})

export const iconStyles = {
  control: (styles) => ({
    ...styles,
    border: "2px solid #272732",
    backgroundColor: "transparent",
    borderRadius: 19,
    padding: 1,
    ":focus-visible": {
      outline: "none",
      boxShadow: "0 0 2px 1.5px #272732",
      border: "2px solid #272732",
    },
    ":hover": {
      border: "2px solid #272732",
      boxShadow: "none",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    ...icon(data.icon),
    alignItems: "center",
    justifyContent: "start",
    display: "flex",
    position: "relative",
    backgroundColor: isDisabled ? data.color : isFocused ? "#21212" : "#21212b",
    color: isFocused ? "#272732" : isSelected && "white",
    cursor: isDisabled ? "not-allowed" : "default",

    ":after": {
      position: "absolute",
      borderRadius: 10,
      content: '"√"',
      display: isSelected ? "block" : "none",
      right: 12,
    },
    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled && (isSelected ? "white" : "#ddd"),
    },
  }),
  input: (styles) => ({ ...styles, ...icon() }),
  placeholder: (styles) => ({
    ...styles,
    ...icon(),
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...icon(data.icon),
    color: "white",
  }),
  defaultInputValue: () => ({
    test,
  }),
}
