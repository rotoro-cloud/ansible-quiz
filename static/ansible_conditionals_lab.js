var questions = [
    
     {
        "title": "Ansible Conditionals",
        "question": "В этом playbook определена переменная с названием `age`. Два tasks выполняют команды, которые выводят на экран `I am a child` и `I am an Adult`. Используй условия `when`, чтобы в зависимости от переменной `age` выполнялся нужный task. А именно, если возраст `< 18` это ребенок, а если `>= 18`, то взрослый.",
        "subText": "",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Am I an Adult or a Child?","hosts":"localhost","vars":{"age":25},"tasks":[{"command":"echo \"I am a Child\""},{"command":"echo \"I am an Adult\""}]}],
            "answers": [[{"name":"Am I an Adult or a Child?","hosts":"localhost","vars":{"age":25},"tasks":[{"command":"echo \"I am a Child\"","when":"age < 18"},{"command":"echo \"I am an Adult\"","when":"age >= 18"}]}]]
          }
        ]
    }
    
  ]
