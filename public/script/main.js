"use strict";
require.config({
  paths: {
    "jquery": "../../bower_components/jquery/jquery"
    ,"lodash": "../../bower_components/lodash/dist/lodash"
    ,"jquery.cookie": "../../bower_components/jquery.cookie/jquery.cookie"
    ,"jquery.leanmodal": "../lib/jquery.leanModal"
    ,"jq-console": "../../bower_components/jq-console/jqconsole.min"
    ,"bacon": "../../bower_components/bacon/dist/Bacon"
    ,"bacon.model": "../../bower_components/bacon.model/dist/bacon.model"
    ,"bacon.jquery": "../../bower_components/bacon.jquery/dist/bacon.jquery"
    ,"bacon.validation": "../../bower_components/bacon.validation/dist/bacon.validation"
    ,"handlebars": "../../bower_components/handlebars/handlebars.amd"
    ,"text": "../lib/text"
    ,"speak": "../speak.js/speakClient"
    ,"parsestack": "../lib/parse-stack"
  },
  shim: {
    'jq-console': {
      deps: ["jquery"]
    }
    ,'jquery.leanmodal': {
      deps: ["jquery"]
    }
  },
  waitSeconds: 60
})
require(["lodash", "jquery", "jsenv", "jsrepl", "turtle", "turtlebundle", "editor", "commands", "cookbook", "storage", "sharing", "cheatsheet", "help"], 
    function(_, $, JsEnv, JsRepl, Turtle, TurtleBundle, Editor, Commands, Cookbook, storage, Sharing) {
  var overhead = 300
  if (window.self !== window.top) {
    $("body").addClass("embedded")
    overhead = 200
  }
  function width() { return $("body").width() }
  function height() { 
    return Math.min(width() / 2, $(window).height() - overhead)
  }

  var element = $("#turtle")
  var jsEnv = JsEnv()
  var repl = JsRepl.init(element.find(".console"), jsEnv)
  var editor = Editor(element, jsEnv, repl)
  var turtle = Turtle(element.find(".turtlegraphics"), width(), height(), editor)

  TurtleBundle(jsEnv, turtle, repl, editor)

  turtle.spin(360, 10)
  Cookbook(editor, repl, turtle)
  Sharing(editor.code)

  storage.openResult.onValue(function(turtle) {
    editor.reset()
    repl.paste(turtle.content.code)
    document.title = turtle.content.description + " -" + document.title
  })
  var turtleId = document.location.search.split("=")[1]
  if (turtleId) storage.open(turtleId)
  element.removeClass("loading")
  takeFocus()
  
  element.find(".turtlegraphics").clickE().onValue(takeFocus)

  toggle = function() {
    element.toggleClass("editor-mode")
    takeFocus()
    editor.refresh()
  }
  toggle()
  element.find(".editor-link").asEventStream("click").onValue(toggle)

  $(window).resize(function() {
    turtle.resize(width(), height())
  })

  function takeFocus() {
    if (element.find(".editor").is(":visible")) {
      element.find(".editor textarea").focus()
    } else {
      repl.focus()
    }
  }
})

function nonEmpty(x) { return x && x.length > 0 }
