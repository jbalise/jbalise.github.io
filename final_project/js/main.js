var $optionsContainer = $('#options-display');


//step 2 create arrays for each option of shoe

//main color for shoe

var colorOptions = [
	{choice: 'red', price: 80},
	{choice: 'green', price: 90},
	{choice: 'blue', price: 100},
];

//detail color for shoe
var detailOptions = [
	{choice: 'white', price: 0},
	{choice: 'purple', price: 10},
	{choice: 'teal', price: 20},
];

//add-ons for shoe
var extraOptions = [
	{choice: 'Waterproof', price: 30},
	{choice: 'Reflective', price: 50},
	{choice: 'Monogrammed Initials', price: 25},
	{choice: 'Extra Laces', price: 15}
];

// step 3

var shoeSelection = {
  color: {choice: 'Not Selected', price: 0},
  detail: {choice: 'Not Selected', price: 0},
  extra: {choice: 'Not Selected', price: 0}
};

// add class .active to li

$('li').on('click', function() {

  $('li').removeClass('active');
  $(this).addClass('active');

  var tabOption = $(this).data('tab');

  $optionsContainer.empty();

  displayPanelContent(tabOption);

});

// step 4 - switch function

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

// step 6 - change image

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

//step 7 - price function

function updateCost () {
  var cost = shoeSelection.detail.price + shoeSelection.color.price + shoeSelection.extra.price;

  cost = moneyFormat(cost);

  $('.cost-display').text('$' + cost);
}

function moneyFormat(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


displayPanelContent('vehicle');