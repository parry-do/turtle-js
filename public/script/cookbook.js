"use strict";

// Path leading to the lesson files
path = "text!../lessons/";

// Lessons to be added
//var lessons = [["Data Types 1", "//This lesson is empty right now"]];
var files = ["Data Types 1.txt",
               "Data Types 2.txt"];

define(files, function() {
  
  return function Cookbook(editor, repl) {

    lessons = files.map((e, i) => [e, arguments[i]]});
    
    lessons.forEach(function(lesson) {
      addExample(lesson[0], lesson[1]);
    })
    
    var square = "function square() {\n  for (var i=1; i <= 4; i++) {\n    fd(50)\n    lt(90)\n  }\n}"
    addExample("Turtle moves", "fd(50)\nlt(45)\nfd(50)\nrt(45)\nfd(50)")
    addExample("Square", square + "\nsquare()")
    addExample("Spiral", "clear()\ni = 1\nwhile (i < 300) {\n  fd(i*1)\n  lt(i*1)\n  i++\n}")
    addExample("Clear", "clear()")

    $("#cookbook label").click(function() {
      $("#cookbook ul").slideToggle("fast")
    })
    function addExample(name, code) {
      var element = $("<li>").attr("data-code", code).text(name)
      $("#cookbook ul").append(element)
    }
    $("#cookbook li").click(function() {
      var text = $(this).attr("data-code")
      editor.reset()
      repl.paste(text)
      setTimeout(function() {
        $("#cookbook ul").slideUp("fast")
      }, 100)
    })
  }
});
