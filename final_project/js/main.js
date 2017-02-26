// grab node you want to append template to
var $optionsContainer = $('#options-display');

// define car options to be used for template
var colorOptions = [
	{choice: 'red', price: 80},
	{choice: 'green', price: 80},
	{choice: 'blue', price: 100},
];

// define color options to be used for template
var detailOptions = [
	{choice: 'white', price: 0},
	{choice: 'purple', price: 0},
	{choice: 'teal', price: 10},
];

// define car package option
var extraOptions = [
	{choice: 'Waterproof', price: 30},
	{choice: 'Reflective', price: 50},
	{choice: 'Monogrammed Initials', price: 25},
	{choice: 'Extra Laces', price: 15}
];

var shoeSelection = {
  color: {choice: 'Not Selected', price: 0},
  detail: {choice: 'Not Selected', price: 0},
  extra: {choice: 'Not Selected', price: 0}
};


// add click event to li nodes that will handle style changes
// and dynamically render DOM specific to option selected
$('li').on('click', function() {

  // remove active styling from all lis then add active styling to clicked li
  $('li').removeClass('active');
  $(this).addClass('active');

  // Find out which tab was clicked
  var tabOption = $(this).data('tab');

  // Empty out the container that will display the options
  $optionsContainer.empty();

  displayPanelContent(tabOption);

});


function displayPanelContent (contentType) {
  var source = $('#' + contentType + '-options-template').html();
  var template = Handlebars.compile(source);

  switch(contentType) {
    case 'color':
      renderOptions(colorOptions, template, contentType);
      break;
    case 'detail':
      renderOptions(detailOptions, template, contentType);
      break;
    case 'extra':
      renderOptions(extraOptions, template, contentType);
      break;
    case 'summary':
      renderOptions(shoeSelection, template, contentType);
      break;
  }
}

function renderOptions(options, template, contentType) {

  if (contentType === 'summary') {
    var html = template(options);
    $optionsContainer.append(html);

  } else {
    for (var i = 0; i < options.length; i++) {

      var html = template(options[i]);

      $optionsContainer.append(html);
    }
  }

}

$('.options-container').on('click', 'div[class*="option"]', function () {
  var panel = $(this).data('panel');

  shoeSelection[panel].choice = $(this).data('option');
  shoeSelection[panel].price = $(this).data('price');

  if (shoeSelection.detail.choice !== 'Not Selected' && shoeSelection.color.choice !== 'Not Selected') {
    $('.shoe-display').attr('src', 'assets/' + shoeSelection.color.choice + '-' + shoeSelection.detail.choice + '.png');
  } else if (shoeSelection.color.choice !== 'Not Selected') {
    $('.shoe-display').attr('src', 'assets/' + shoeSelection.color.choice + '-' + 'white' + '.png');
  }

  updateCost();
});


function updateCost () {
  var cost = shoeSelection.detail.price + shoeSelection.color.price + shoeSelection.extra.price;

  cost = moneyFormat(cost);

  $('.cost-display').text('$' + cost);
}

function moneyFormat(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


displayPanelContent('vehicle');