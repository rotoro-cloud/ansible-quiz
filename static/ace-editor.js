


var rows = 9;
var cell_height = 100;
var cell_width = 90;

var icon_height = 50;
var icon_width = 50;

var Range = ace.require('ace/range').Range;

var app = angular.module('myApp', [
  'ngSanitize',
  'ng-showdown'
]);
app.controller('myCtrl', ['$scope', '$sce', '$timeout', '$location', '$showdown', function($scope, $sce, $timeout, $location, $showdownProvider) {
    $showdownProvider.setOption('tables', true);

    $scope.jsonData = []
    $scope.correct_answer = false;
    $scope.question_state = "light-blue darken-4"
    $scope.showSolutionFlag = false;
    $scope.lastQuestion = false;
    $scope.submittedAnswer = false;


    $('.modal').modal();
    var modal_instance = M.Modal.getInstance($('#modal1'));

    $scope.typeOfItem = function(item){

        if(typeof(item) == 'object'){

            if(Array.isArray(item)){
                return "array"
            }else{
                return "dictionary"
            }

        }else{
            return(typeof(item))
        }

    }

    var parseAnsibleInventory = function(file_contents){
      var AnsibleInventory = new InventoryParser(file_contents)
      var inv_data = AnsibleInventory.parse()

      // convert groups from list to dictionary to prevent order checking
      Object.keys(inv_data).forEach((k,v) => {
        if(k!="_meta"){
          var temp_dict = {}
          inv_data[k].forEach((item) => {
            if(item)temp_dict[item] = ""
          })
          inv_data[k] = temp_dict
        }
      })

      return inv_data

    }

    /*---------------------------------------------
    FUNCTION UPDATE JSON DATA
    ---------------------------------------------*/
    var updateJsonData = function(editor, index){
        editor.getSession().clearAnnotations()
        // markerId && editor.getSession().removeMarker(markerId)
        yamlString = editor.getValue();

        try{
            //$scope.jsonData[index] = YAML.parse(yamlString);
            $scope.jsonData[index] = jsyaml.load(yamlString)
            //console.log($scope.jsonData[index])
        }catch(err) {
          //console.log(err.message);
          // markerId = editor.session.addMarker(new Range(err.mark.line, err.mark.column, err.parsedLine, err.mark.column+1), "myMarker");
          if(!$scope.current_question.hideAnnotations){
            editor.getSession().setAnnotations([{
              row: err.mark.line || editor.getSelectionRange().start.row,
              column: 0,
              text: (err.message || ""), // Or the Json reply from the parser
              type: "error" // also "warning" and "information"
            }])
          }
        }

    }

    /*---------------------------------------------
    FUNCTION UPDATE INI DATA
    ---------------------------------------------*/
    var updateIniData = function(editor, index){
        editor.getSession().clearAnnotations()
        // markerId && editor.getSession().removeMarker(markerId)
        yamlString = editor.getValue();

        $scope.jsonData[index] = yamlString;

    }

    /*---------------------------------------------
    FUNCTION INITIALIZE EDITOR
    ---------------------------------------------*/
    var initializeEditor = function(editorId, mode, content, readOnly, badYaml){
      var editor = ace.edit(editorId);
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/" + (mode || "yaml"));
      editor.setReadOnly(readOnly);
      if(mode == "ini"){
        editor.setValue(content, 1);
      }
      else{
        if(badYaml){
            editor.setValue(content, 1);
        }else{
            editor.setValue(YAML.stringify(content, 10), 1);
        }
      }
      editor.setShowPrintMargin(false);
      return editor
    }

    //updateJsonData()

    /*---------------------------------------------
    FUNCTION INITIALIZE TABS
    ---------------------------------------------*/
    var initializeTabs = function(){

      M.Tabs.init($('#solutionTabs'))
      M.Tabs.init($('#inputTabs'), {
        onShow: function(tab){
          var solutionInstance = M.Tabs.getInstance($('#solutionTabs'));
          var solutionTabId = 'solutiontab-' + tab.id.split("-")[1]
          if($scope.showSolutionFlag && solutionInstance && $('#' + solutionTabId)){
            solutionInstance.select(solutionTabId)
            solutionInstance.updateTabIndicator();
          }
        }
      })

    }

    /*---------------------------------------------
    FUNCTION STAGE QUESTION
    ---------------------------------------------*/
    var stageQuestion = function(){
        //$('.tabs').tabs();
        $scope.submittedAnswer = false;
        $scope.showSolutionFlag = false;
        $scope.showHintFlag = false;

        $('#visual').html("");

        initializeTabs();

        $scope.silent_change = true

        $scope.current_question.files && $scope.current_question.files.forEach((file, index) =>{

          var editor = initializeEditor("editor-"+index, file.mode, file.stage, false, file.badYaml)
          editor.session.on('change', function(delta) {
              if($scope.silent_change) return

              if(file.mode== 'ini'){
                updateIniData(editor, index)
              }
              else {
                updateJsonData(editor, index)
              }

              $scope.$apply(function(){
                  $scope.checkAnswer()
              });
          });

          var answer_contents = file.answers && file.answers[0] || file.stage
          initializeEditor("solutionEditor-"+index, file.mode, answer_contents, true)
          if(file.mode== 'ini'){
            updateIniData(editor, index)
          }
          else {
            updateJsonData(editor, index)
          }
        })

        M.Tabs.getInstance($('#inputTabs')).select('tab-0')

        $scope.silent_change = false
    }

    /*---------------------------------------------
    UTILITY CLONE & Omit Deep
    ---------------------------------------------*/
    var clone = function(obj){
        if(obj)return JSON.parse(JSON.stringify(obj));
    }

    var omitDeep = function(collection, excludeKeys) {

      function omitFn(value) {

        if (value && typeof value === 'object') {
          excludeKeys.forEach((key) => {
            delete value[key];
          });
        }
      }

      return _.cloneDeepWith(collection, omitFn);
    }

    /*---------------------------------------------
    FUNCTION SUBMIT SOLUTION and CHECK ANSWER
    ---------------------------------------------*/
    $scope.submitSolution = function(){
      $scope.submittedAnswer = true
      $scope.checkAnswer(true);
    }

    //---------------------------------------------

    var testJson = function(file, jsonData){
      var copy_of_jsonData = clone(jsonData);
      var matches_any_one_answer = false

      file.answers && file.answers.forEach((answer) => {

        var copy_of_expected_answer = clone(answer);

        // Remove name
        if(!$scope.current_question.do_not_remove_name){
          omitDeep(copy_of_jsonData, ["name"])
          omitDeep(copy_of_expected_answer, ["name"])
        }

        // Remove spaces
        copy_of_jsonData = JSON.parse(JSON.stringify(copy_of_jsonData).replace(/\s/g,''))
        copy_of_expected_answer = JSON.parse(JSON.stringify(copy_of_expected_answer).replace(/\s/g,''))

        // No variable separation required for variables
        // copy_of_jsonData = JSON.parse(JSON.stringify(copy_of_jsonData).replace(/{\s+/g,'{').replace(/\s+}/g,'}'))
        // copy_of_expected_answer = JSON.parse(JSON.stringify(copy_of_expected_answer).replace(/{\s+/g,'{').replace(/\s+}/g,'}'))

        // Replace single quotes with double quotes
        copy_of_jsonData = JSON.parse(JSON.stringify(copy_of_jsonData).replace(/\'/g, '\\"'))
        copy_of_expected_answer = JSON.parse(JSON.stringify(copy_of_expected_answer).replace(/\'/g, '\\"'))

        var state = _.isEqual(copy_of_jsonData, copy_of_expected_answer)

        if(!state && $scope.showHintFlag){
          if(!matches_any_one_answer){
            var delta = jsondiffpatch.diff(copy_of_jsonData, copy_of_expected_answer);
            $('#visual').html(jsondiffpatch.formatters.html.format(delta, copy_of_jsonData));
          }
        }

        matches_any_one_answer = matches_any_one_answer || state;
      })



      return matches_any_one_answer;
    }

    // - Test text

    var testIni = function(file, iniData){
      var matches_any_one_answer = false

      var json_iniData = parseAnsibleInventory(iniData);
      console.log(json_iniData)

      file.answers && file.answers.forEach((answer) => {

        var json_answerData = parseAnsibleInventory(answer);

        var state = _.isEqual(json_iniData, json_answerData)

        if(!state && $scope.showHintFlag){
          if(!matches_any_one_answer){
            var delta = jsondiffpatch.diff(json_iniData, json_answerData);
            $('#visual').html(jsondiffpatch.formatters.html.format(delta, json_iniData));
          }
        }

        matches_any_one_answer = matches_any_one_answer || state;
      })
      return matches_any_one_answer;
    }

    // - Test text

    var testText = function(file, textData){
      var matches_any_one_answer = false

      file.answers && file.answers.forEach((answer) => {

        // Remove spaces
        copy_of_textData = textData.replace(/\s/g,'')
        copy_of_expected_answer = answer.replace(/\s/g,'')

        // Replace single qoutes to double quotes
        copy_of_textData = copy_of_textData.replace(/'/g,'"')
        copy_of_expected_answer = copy_of_expected_answer.replace(/'/g,'"')

        var state = copy_of_textData == copy_of_expected_answer
        matches_any_one_answer = matches_any_one_answer || state;
      })
      return matches_any_one_answer;
    }

    //------------------ ************** CHECK ANSWER ************ ---------------------------

    $scope.checkAnswer = function(user_initiated){

      $scope.correct_answer = true;
      var syntex_error_shown = false;
      $scope.current_question.files && $scope.current_question.files.forEach((file, index) =>{
        if(file.readOnly){
          return
        }

        try{
          if(file.mode == 'ini'){
            file.state = testIni(file, $scope.jsonData[index])
          }else{
            file.state = testJson(file, $scope.jsonData[index])
          }
        }catch(err){
          console.log(err)
          if(user_initiated){
              syntex_error_shown = true;
              $scope.showHintFlag = false;
              $scope.modal_header = "Syntax Error"
              $scope.modal_message = "There is an error with the structure of the file - " + file.name + ". Fix it and then try again."
              modal_instance.open();
          }
          file.state = false;
        }


        $scope.correct_answer = $scope.correct_answer && file.state
      });

      if($scope.correct_answer){
        $scope.showSolutionFlag = false;
        $scope.showHintFlag = false;
        $('#visual').html("");
        $scope.question_state = "teal darken-3";
      }else{
        if(user_initiated && !syntex_error_shown && !$scope.showHintFlag){
            $scope.modal_header = "Answer does not match"
            $scope.modal_message = "The given answer does not match expected answer. Make sure you used all the correct details asked in the question. To view the difference try using the Show Hint button."
            modal_instance.open();
        }
      }

    }

    /*---------------------------------------------
    FUNCTION LOAD QUESTION
    ---------------------------------------------*/
    var loadQuestion = function(){
        $scope.current_question = questions[$scope.current_question_number]
        $scope.current_question.question = $scope.current_question.question
        $scope.current_question.subText = $scope.current_question.subText
        $scope.correct_answer = false;

        $scope.question_state = "light-blue darken-4"
        if($scope.current_question_number >= (questions.length - 1))$scope.lastQuestion = true
        else $scope.lastQuestion = false

        $timeout(function(){
          stageQuestion();
        }, 500)

    }

    $scope.nextQuestion = function(){
        $scope.current_question_number += 1
        loadQuestion()
    }

    $scope.previousQuestion = function(){
        $scope.current_question_number -= 1
        loadQuestion()
    }

    $scope.showSolution = function(){
        $scope.showSolutionFlag = !$scope.showSolutionFlag
        // if($scope.showSolutionFlag){
        //     solutionEditor.setValue(YAML.stringify($scope.current_question.answer, 10), 1);
        // }
    }

    $scope.resetAnswer = function(){
        stageQuestion()
    }

    $scope.showHintFlag = false
    $scope.showHint = function(){
      $scope.showHintFlag = !$scope.showHintFlag
      if($scope.showHintFlag){

        $scope.checkAnswer(true);

        if($scope.current_question.hideAnnotations){
          $scope.current_question.hideAnnotations = false;
          $scope.current_question.files && $scope.current_question.files.forEach((file, index) =>{
            var editor = ace.edit("editor-"+index);
            if(file.mode== 'ini'){
              updateIniData(editor, index)
            }
            else {
              updateJsonData(editor, index)
            }
          })
        }
      }
    }

    $scope.current_question_number = -1

    $scope.questions_override = $location.search();

    var questions_file = $scope.questions_override.questions || "questions_ansible_loops"

    $scope.feedback_url = $sce.trustAsResourceUrl("https://docs.google.com/forms/d/e/1FAIpQLSc1PLnyUbidMu1vgCM_sE5w76xDCTrHs8-lI02TaWiwy6sG8A/viewform?embedded=true&usp=pp_url&entry.1324405225=" + questions_file);
//	$.ajaxSetup({ cache: true })
    $.getScript( "static/" + ( questions_file + ".js"))
      .done(function( script, textStatus ) {
        $scope.questions = questions;
        $scope.$apply();
        $timeout(function(){
          $scope.nextQuestion();
        }, 100)

      })
      .fail(function( jqxhr, settings, exception ) {
        console.error(exception);
    });


}]);
