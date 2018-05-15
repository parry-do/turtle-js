"use strict";

// Lessons to be added
var files = ["Introduction 1",
             "Introduction 2",
             "Data Types 1", 
             "Data Types 2"]

define(["text!./../lessons/Introduction 1.txt", 
        "text!./../lessons/Introduction 2.txt",
        "text!./../lessons/Data Types 1.txt",
        "text!./../lessons/Data Types 2.txt",], function() {
  
  var lessons = files.map((e, i) => [e, arguments[i]]);
  
  return function Cookbook(editor, repl, recorder) {
    lessons.forEach(function(lesson) {
      addExample(lesson[0], lesson[1]);
    })
    
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
      recorder._recorder._reset()
      editor.setValue(text)
      //repl.paste(text)
      setTimeout(function() {
        $("#cookbook ul").slideUp("fast")
      }, 100)
    })
  }
});
