# Responsive Tables

![Language](badges/language.svg)
![Requirements](badges/requirements.svg)
[![License](badges/license.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Simple and lightweight jquery plugin to make responsive table.

This plugin hides columns in a specific order
(based on table container not window width).

[Example available here](http://responsive-tables.edcordata.com/).



## Usage
```html
<script type="application/javascript" src="responsive-tables.js"></script>
```
```html
<table id="table_by_width" border="1">
  <thead>
    <tr>
      <th data-priority="0">#</th>
      <th data-priority="0">E-mail</th>
      <th data-priority="8">First Name</th>
      <th data-priority="8">Last Name</th>
      <th data-priority="7">Phone Nr.</th>
      <th data-priority="6">Prefix</th>
      <th data-priority="5">Title</th>
      <th data-priority="4">Salary</th>
      <th data-priority="3">Vehicle</th>
      <th data-priority="2">Address</th>
      <th data-priority="1">City</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

The `data-priority` attribute (can be changed with `dataAttrPriority`)
controls the order, in which the columns are hidden in. First columns,
to be hidden, are with the lowest value (can be changed with
`AccendingPriorityOrder`). Columns with value `0` will always stay visible.

```javascript
$(document).ready(function () {
  
  var options = {
    classResponsiveTableWrap: 'responsive-table-wrap',
    dataAttrPriority:         'data-priority',
    AccendingPriorityOrder:   true
  };
  
  $('table').responsiveTables(options);
  
});
```



## License
This project is licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license,
which means this plugin is free for personal use only.

Contact info:
<br/>
[https://github.com/EdCordata](https://github.com/EdCordata)
