var Handlebars = require('handlebars');

module.exports = {
  option: function (selected, value, text) {
    var selectOption;
    selected  = Handlebars.Utils.escapeExpression(selected);
    value = Handlebars.Utils.escapeExpression(value);
    text = Handlebars.Utils.escapeExpression(text);
    if (selected === value) {
      selectOption = '<option value="' + value + '" selected="selected">' + text + '</option>';
    } else {
      selectOption = '<option value="' + value + '">' + text + '</option>';
    } 
    return new Handlebars.SafeString(selectOption);
  }
};