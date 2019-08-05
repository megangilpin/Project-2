/* eslint-disable camelcase */
// Get references to page elements
var $eventName = $("#event-name");
var $eventDescription = $("#event-description");
var $eventType = $("#event-type");
var $startTime = $("#start-time");
var $endTime = $("#end-time");
var $date = $("#date");
var $addressLine = $("#event-address");
var $eventCity = $("#event-city");
var $eventState = $("#event-state");
var $eventZipcode = $("#event-zipcode");
var $questionOne = $("#question-one");
var $questionTwo = $("#question-two");
var $questionThree = $("#question-three");
var $submitBtn = $("#submit");
var $eventList = $("#event-list");
var $signup = $("#signup");
var $newUserName = $("#newUserName");
var $newUserEmail = $("#newUserEmail");
var $newUserPass = $("#newUserPass");
var $reNewUserPass = $("#reNewUserPass");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/events",
      data: JSON.stringify(event)
    });
  },
  getEvent: function() {
    return $.ajax({
      url: "api/events",
      type: "GET"
    });
  },
  deleteEvent: function(id) {
    return $.ajax({
      url: "api/events/" + id,
      type: "DELETE"
    });
  },
  addUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(user)
    });
  }
};

// refreshEvents gets new events from the db and repopulates the list
var refreshEvents = function() {
  API.getEvent().then(function(data) {
    var $events = data.map(function(event) {
      var $a = $("<a>")
        .text(event.text)
        .attr("href", "/event/" + event.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": event.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

// handleFormSubmit is called whenever we submit a new event
// Save the new event to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var event = {
    name: $eventName.val().trim(),
    description: $eventDescription.val().trim(),
    event_type: $eventType.val().trim(),
    start_time: $startTime.val().trim(),
    end_time: $endTime.val().trim(),
    date: $date.val().trim(),
    address_line: $addressLine.val().trim(),
    city: $eventCity.val().trim(),
    state: $eventState.val().trim(),
    zipcode: $eventZipcode.val().trim(),
    question1: $questionOne.val().trim(),
    question2: $questionTwo.val().trim(),
    question3: $questionThree.val().trim()
  };

  if (!(event.name && event.description)) {
    alert("You must enter event details!");
    return;
  }
  console.log(JSON.stringify(event));

  API.saveEvent(event).then(function() {
    refreshEvents();
  });

  $eventName.val("");
  $eventDescription.val("");
  $eventType.val("");
  $startTime.val("");
  $endTime.val("");
  $date.val("");
  $addressLine.val("");
  $eventCity.val("");
  $eventState.val("");
  $eventZipcode.val("");
  $questionOne.val("");
  $questionTwo.val("");
  $questionThree.val("");
};

// Adds new user
var addNewUserSubmit = function(user) {
  event.preventDefault();

  var user = {
    name: $newUserName.val().trim(),
    email: $newUserEmail.val().trim(),
    password: $newUserPass.val().trim(),
    re_password: $reNewUserPass.val().trim()
  };
  console.log(user);
  if (user.password !== user.re_password) {
    alert("Your passwords don't match, please try again");
    return;
  }
  console.log(JSON.stringify(user));

  API.addUser(user).then(function () {
    alert("Congrats! You have registered, now lets plan that even!");
  });

  $newUserName.val("");
  $newUserEmail.val("");
  $newUserPass.val("");
  $reNewUserPass.val("");
};

// handleDeleteBtnClick is called when an event's delete button is clicked
// Remove the event detail from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteEvent(idToDelete).then(function() {
    refreshEvents();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$signup.on("click", addNewUserSubmit);
$eventList.on("click", ".delete", handleDeleteBtnClick);
