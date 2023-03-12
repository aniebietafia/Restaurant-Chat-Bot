const displayItems = (result, menu_items) => {
  let display_msg = "";

  if (result == "main_menu") {
    display_msg = menu_items
      .map((item) => {
        return `${item.itemId}: ${item.info}`;
      })
      .join(" ");
    display_msg = `Enter the corresponding number to get started: <br>` + display_msg;
    return display_msg;
  }

  display_msg = result
    .map((item, index) => {
      return `${index + 1}: ${item.menu}`;
    })
    .join(" ");

  display_msg = `${result}: <br>` + display_msg;
  return display_msg;
};

module.exports = displayItems;
