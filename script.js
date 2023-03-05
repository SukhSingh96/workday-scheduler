$(function () {

  // Function to display the current day and time
  function updateTime() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, h:mm A"));
  }

  // Displays the current day and time at top of the page
  updateTime();

  // Sets interval to update the current time for every minute
  setInterval(updateTime, 60000);

  // Function to apply designated class for each time block and compare time 
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);
      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Calls the updateHourBlocks function
  updateTimeBlocks();

  // Sets the interval to call updateHourBlocks function every 15 minutes
  setInterval(updateTimeBlocks, 900000);
  // The purpose of updating the classes every 15 minutes is to help manage 
  // the schedule more effectively by allowing accurate timings.

  // Loads saved events from local storage
  $(".description").each(function () {
    var id = $(this).parent().attr("id");
    $(this).val(localStorage.getItem(id));
  });

  // Saves user information to local storage when save button is selected
  $(".saveBtn").on("click", function () {
    var id = $(this).parent().attr("id");
    var event = $(this).siblings(".description").val().trim();
    localStorage.setItem(id, event);
  });

});