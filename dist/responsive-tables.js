$.fn.responsiveTables = function (options) {



  // Version
  // ===========================================================
  this.version = '0.1.0';
  // ===========================================================



  // Setup Options
  // ===========================================================
  var defaults = {
    classResponsiveTableWrap: 'responsive-table-wrap',
    dataAttrPriority:         'data-priority',
    AccendingPriorityOrder:   true,
  };

  var o = $.extend({}, defaults, options);
  // ===========================================================



  // Start
  // ===========================================================
  return this.each(function () {
    var $table = $(this);
    initTableRequiredAttrs($table, o);
    initResponsiveTable($table, o);
  });
  // ===========================================================



  // Init Table Required Styles
  // ===========================================================
  function initTableRequiredAttrs($table, o) {
    $table.wrap('<div class="' + o.classResponsiveTableWrap + '"></div>');
    $table.css('width', '100%');
  }
  // ===========================================================



  // Init Responsive Table
  // ===========================================================
  function initResponsiveTable($table, o) {


    // Show All columns
    // ---------------------------------------------------------
    $table.find('th, td').show();
    // ---------------------------------------------------------


    // Find Priorities
    // ---------------------------------------------------------
    var priorities = {
      indexes:        {}, // list of indexes grouped by priority
      hidden: []
    };

    $table.find('thead').find('th').map(function (i, th) {
      var $th   = $(th);
      var priority = $th.attr(o.dataAttrPriority);

      // ensure we have priority
      if ( !priorities.indexes[priority]                    ) priorities.indexes[priority] = [];
      if ( !priorities.indexes[priority].includes(priority) ) priorities.indexes[priority].push(i);
    });
    // ---------------------------------------------------------


    // Initial Check
    // ---------------------------------------------------------
    check();
    // ---------------------------------------------------------


    // Add Check On Resize Event
    // ---------------------------------------------------------
    $(window).on('resize', function () {

      // Reset Hidden
      $table.find('td, th').show();
      priorities.hidden = [];

      // Run Check
      check();

    });
    // ---------------------------------------------------------


    // Check Loop Function
    // ---------------------------------------------------------
    function check() {
      var wrap_width  = $table.parent().width();
      var table_width = $table.width();

      if ( wrap_width < table_width ) {
        var next_to_hide = nextPriorityToHide();

        if (next_to_hide) {

          $table.find('> thead').find('> tr').find('> th').each(function(th_i, th) {
            if (priorities.indexes[next_to_hide.toString()].includes(th_i)) $(th).hide();
          });

          $table.find('> tbody').find('> tr').each(function(tr_i, tr) {
            var $tr = $(tr);

            $tr.find('> td').each(function(td_i, td) {
              if (priorities.indexes[next_to_hide.toString()].includes(td_i)) $(td).hide();
            });
          });

          priorities.hidden.push(next_to_hide);

          check();
        }
      }
    }
    // ---------------------------------------------------------


    // Get Last Priority To Hide
    // ---------------------------------------------------------
    function lastPriorityToHide() {
      var last_hidden;

      if (o.AccendingPriorityOrder) {
        last_hidden = Math.max(...priorities.hidden);
      } else {
        last_hidden = Math.min(...priorities.hidden);
      }

      if (last_hidden === Infinity)  last_hidden = null;
      if (last_hidden === -Infinity) last_hidden = null;

      return last_hidden;
    }
    // ---------------------------------------------------------


    // Get Next Priority To Hide
    // ---------------------------------------------------------
    function nextPriorityToHide() {
      var priority_list;
      var next_to_hide;
      var last_hidden = lastPriorityToHide();

      if (last_hidden) {
        if (o.AccendingPriorityOrder) {
          priority_list = Object.keys(priorities.indexes).map(p => parseInt(p)).filter(i => i > 0).filter(p => p > last_hidden);
        } else {
          priority_list = Object.keys(priorities.indexes).map(p => parseInt(p)).filter(i => i > 0).filter(p => p < last_hidden);
        }
      } else {
        priority_list = Object.keys(priorities.indexes).map(p => parseInt(p)).filter(i => i > 0);
      }

      if (o.AccendingPriorityOrder) {
        next_to_hide = Math.min(...priority_list);
      } else {
        next_to_hide = Math.max(...priority_list);
      }

      if (next_to_hide === Infinity)  next_to_hide = null;
      if (next_to_hide === -Infinity) next_to_hide = null;

      return next_to_hide;
    }
    // ---------------------------------------------------------


  }
  // ===========================================================



};
