const displayOptions = (msg, list) => {
  let arrayMsg = "";

  if (msg == "mainMenu") {
    arrayMsg = list
      .map((item) => {
        return `${item.number}: ${item.text}`;
      })
      .join(`<br>`);
    arrayMsg = `Please select a number from the list below: <br>` + arrayMsg;
    return arrayMsg;
  }

  arrayMsg = list
    .map((item, index) => {
      return `${index + 1}: ${item.food}`;
    })
    .join(`<br>`);

  arrayMsg = `${msg}: <br>` + arrayMsg;
  return arrayMsg;
};

module.exports = displayOptions;
