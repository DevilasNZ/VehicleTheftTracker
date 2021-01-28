// Get the element with id="defaultOpen" and click on it
document.getElementById("timeDefaultOpen").click();
document.getElementById("weekDefaultOpen").click();
document.getElementById("MonthDefaultOpen").click();
document.getElementById("AllTimeDefaultOpen").click();

function openTimePeriod(evt, contentName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("timeperiod");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("timetablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(contentName).style.display = "block";
  evt.currentTarget.className += " active";
}

//------------------------------------------------------------------------------------------------

function openDataTab(evt, contentName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab
  var tabcontents = document.getElementsByClassName(contentName);

  for(var i=0; i<tabcontents.length; i++) {
    tabcontents[i].style.display = "block";
  }

  //add the active class to relative buttons
  tablinks = document.getElementsByClassName(contentName+"-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className += " active";
  }
}
