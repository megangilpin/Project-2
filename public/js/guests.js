require();;

// Get references to page elements
var $guestFirstName = $("#guest-first-name");
var $guestLastName = $("#guest-last-name");
var $guestEmail = $("#guest-email");
var $guestOrg = $("#guest-org");
var $guestVIP = $("#guest-vip");
var $submitBtn = $("#submit-guest");
var $guestList = $("#guest-list");
var $emailArrayCreated = $("#get-guest-emails");

// The API object contains methods for each kind of request we'll make
var API = {
  saveGuest: function(guest) {
    console.log(guest);
    return $.ajax({
      type: "POST",
      url: "api/guests/add",
      data: guest
    });
  },
  getGuest: function() {
    return $.ajax({
      type: "GET",
      url: "api/guests"
    });
  },
  deleteGuest: function(id) {
    return $.ajax({
      type: "DELETE",
      url: "api/guest/" + id
    });
  },
  sendCheckInEmail: function(id) {
    return $.ajax({
      type: "GET",
      url: "/api/guest/checkin/" + id
    });
  },
  sendInviteEmail: function(email) {
    return $.ajax({
      type: "GET",
      url: "/api/guest/invite/" + email
    });
  }
};

// UPDATE ONCE YINGYING ADDS IDS TO THE EVENT/GUESTS HANDLEBARS PAGE
var refreshGuests = function() {
  var theTemplateScript = $("#example-template").html();
  var theTemplate = Handlebars.compile(theTemplateScript);

  API.getGuest().then(function(data) {
    console.log("refreshGuests function -------");

    var context = {
      people: [
        { id: data.id },
        { first_name: data.first_name },
        { last: data.last_name },
        { email: data.email },
        { organization: data.organization },
        { vip: data.vip }
      ]
    };

    var theCompiledHtml = theTemplate(context);

    $(document.body).append(theCompiledHtml);

    // var $guests = data.map(function(guest) {
    //   var $gfn = $("<td>")
    //     // WHY IS THIS ".TEXT"?
    //     .text(guest)
    //     .attr({
    //       href: "/guests/" + guest.id,
    //       "data-id": guest.id
    //     });

    //   var $gln = $("<td>")
    //     .text(guest)
    //     .attr({
    //       class: "list-group-item",
    //       "data-id": guest.id
    //     });

    //   var $ge = $("<td>")
    //     .text(guest)
    //     .attr({
    //       class: "list-group-item",
    //       "data-id": guest.id
    //     });

    //   var $go = $("<td>")
    //     .text(guest)
    //     .attr({
    //       "data-id": guest.id
    //     });

    //   var $vip = $("<td>")
    //     .text(guest)
    //     .attr({
    //       "data-id": guest.id
    //     });

    //   var $tableRow = $("tr>");

    //   $tableRow
    //     .append($gfn)
    //     .append($gln)
    //     .append($ge)
    //     .append($go)
    //     .append($vip);

    //   console.log($tableRow);
    //   return $tableRow;
    // });

    // $guestList.empty();
    // $guestList.append($guests);
  });
};

// handleFormSubmit is called whenever we submit a new guest
// Save the new guest to the db and refresh the list
var handleFormSubmit = function(guest) {
  console.log("SUBMIT BUTTON CLICKED");
  guest.preventDefault();

  var guest = {
    first_name: $guestFirstName.val().trim(),
    last_name: $guestLastName.val().trim(),
    email: $guestEmail.val().trim(),
    org: $guestOrg.val().trim(),
    vip: $guestVIP.val().trim()
  };

  if (!guest.email) {
    alert("You must enter an email address");
    return;
  }
  console.log(JSON.stringify(guest, null, 2));

  // TRIGGERs MAILGUN TO SEND EMAIL
  handleSendEmail(guest.email);
  // --------------------------------
  API.saveGuest(guest).then(function() {
    console.log("guest added");
    refreshGuests();
  });

  $guestFirstName.val("");
  $guestLastName.val("");
  $guestEmail.val("");
  $guestOrg.val("");
  $guestVIP.val("1");
};

// handleDeleteBtnClick is called when an guest's delete button is clicked
// Remove the guest detail from the db and refresh the list
// ALSO NEED TO TRIGGER AN EMAIL TO BE SENT TO THE GUEST
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteGuest(idToDelete).then(function() {
    refreshGuests();
  });
};

// pass an array to this function
var handleSendEmail = function(data) {
  console.log("running handleSendEmail function -------");

  API.sendInviteEmail(data);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$guestList.on("click", ".delete", handleDeleteBtnClick);
