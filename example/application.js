$(document).ready(function () {
  generateTables(10);

  setTimeout(function () {

    $('table#table_by_width').responsiveTables();

  }, 100);

});


// =============================================================================
function generateTables(column_count) {
  $.each($('table'), function (i, table) {
    var $table = $(table);

    var items = [
      {name: 'E-mail',     method: 'faker.internet.email();'},
      {name: 'First Name', method: 'faker.name.firstName();'},
      {name: 'Last Name',  method: 'faker.name.lastName();'},
      {name: 'Phone Nr.',  method: 'faker.phone.phoneNumberFormat();'},
      {name: 'Prefix',     method: 'faker.name.prefix();'},
      {name: 'Title',      method: 'faker.name.title();'},
      {name: 'Salary',     method: 'faker.commerce.price();'},
      {name: 'Vehicle',    method: 'faker.vehicle.vehicle();'},
      {name: 'Address',    method: 'faker.address.streetAddress();'},
      {name: 'City',       method: 'faker.address.city();'}
    ];

    // add rows
    // -----------------------------------
    for (let i = 0; i < column_count; i++) {
      var $tr = $('<tr></tr>');

      $tr.append('<td>' + (i + 1) + '</td>');

      items.forEach(function (item) {
        $tr.append('<td>' + eval(item.method) + '</td>');
      });

      $table.find('tbody').append($tr);
    }
    // -----------------------------------

  });
}

// =============================================================================
