// Get references to page elements
var $guestFirstName = $("#guest-first-name");
var $guestLastName = $("#guest-last-name");
var $guestEmail = $("#guest-email");
var $guestOrg = $("#guest-org");
// var $guestVIP = $("#guest-vip");
var $submitBtn = $("#submit-guest");
var $guestList = $("guest-list");

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
  sendGuestEmail: function(email) {
    return $.ajax({
      type: "POST",
      url: "api/submit/" + email
    });
  }
};

var refreshGuests = function() {
  API.getGuest().then(function(data) {
    var $guests = data.map(function(guest) {
      var $a = $("<a>")
        // WHY IS THIS ".TEXT"?
        .text(guest.text)
        .attr("href", "/guests/" + guest.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": guest.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("x");

      $li.append($button);

      return $li;
    });

    $guestList.empty();
    $guestList.append($guests);
  });
};

// handleFormSubmit is called whenever we submit a new guest
// Save the new guest to the db and refresh the list
var handleFormSubmit = function(guest) {
  guest.preventDefault();

  var guest = {
    first_name: $guestFirstName.val().trim(),
    last_name: $guestLastName.val().trim(),
    email: $guestEmail.val().trim(),
    org: $guestOrg.val().trim()
    // vip: $guestVIP.val().trim()
  };

  if (!guest.email) {
    alert("You must enter an email address");
    return;
  }
  console.log(JSON.stringify(guest, null, 2));

  // TRIGGERs MAILGUN TO SEND EMAIL
  //   API.sendGuestEmail(guest.email);
  // --------------------------------
  API.saveGuest(guest).then(function() {
    console.log("guest added");
    refreshGuests();
  });

  $guestFirstName.val("");
  $guestLastName.val("");
  $guestEmail.val("");
  $guestOrg.val("");
  //   $guestVIP.val("");
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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$guestList.on("click", ".delete", handleDeleteBtnClick);
