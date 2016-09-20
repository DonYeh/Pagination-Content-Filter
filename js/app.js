// use strict
"use strict";

// Globals
var $studentItems = $('.student-item');
var $studentList = studentArray($studentItems);
var studentSearch ='<div class="student-search"><input id="search" placeholder="Search for studentsz..."><button>Search</button></div>';
$('.page-header').append(studentSearch);
var paginationHTML ='<div class="pagination"><ul></ul></div>';

// Generate a new array of students for each page and limit the number of students to 10.
function studentArray(list) {
  // Create a copy of the student list
  var studentsArray = list.slice(0);
  var pagesArray = [];
  // Generate an array of pages with each page containing an array of 10 students
  while (studentsArray.length) {
    pagesArray.push(studentsArray.splice(0, 10));
  }
  return pagesArray;
}

// Generate the pages array of students, display the first page and hide the rest. 
function displayPages(pageNumber, pageList) {
  // hide all the students 
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          // slide down animation for extra credit
          $(listItem).slideDown('fast');
        });
      }
  });
}

// Append buttons to page and set/remove active pages
function appendButtons(pageList) {
  $('.page').append(paginationHTML);
  var pagesTotal = pageList.length;
  // create page links
  for (var i = 1; i <= pagesTotal; i++) {
    var buttons = '<li><a href="#">' + i + '</a></li>';
    $('.pagination ul').append(buttons);
  }
  // Set the first page to active
  $('.pagination ul li a').first().addClass('active');
  // Add click listeners
  $(".pagination ul li a").on("click", function(e) {
    // Get the page number of the clicked link
    var pageSelection = parseInt($(this)[0].text) - 1;
    displayPages(pageSelection, pageList);
    // Remove the active class from the previous page
    $(".pagination ul li a").removeClass();
    // Set a new active class to the clicked page
    $(this).addClass("active");
    // prevents links from going to the top of the page when clicked
    e.preventDefault();
  });
}

 
// Search function finds both name and/or email. Display No Matches if no matches are found.
function searchList() { 
  var searchTerm = $('#search').val().toLowerCase();
  // Search for by name and email. Return true is there is a match, false otherwise.
  var filteredStudents = $studentItems.filter(function(i) {
    //student names are located in the h3 selector
    var studentNames = $(this).find('h3').text();
    var studentEmail = $(this).find('.email').text();
    if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
        return true;
    }
    return false;
  });
  if (filteredStudents.length === 0 ) {
    $('.page-header h2').text('No Matches');
  } else {
    $('.page-header h2').text('STUDENTS');
  }
  var paginatedStudents = studentArray(filteredStudents);
  $('.pagination').remove();
  if (filteredStudents.length >= 10) {
    appendButtons(paginatedStudents);
  }
  displayPages(0, paginatedStudents);
}

// Inits
appendButtons($studentList);
displayPages(0, $studentList);


// Event Handlers
$('.student-search').find('button').on('click', searchList);
$('.student-search').find('input').keyup(searchList);


