var questions = [
    {
        "title": "Ansible Loops",
        "question": "В данный момент playbook запускает команду, которая выводит на экран название фрукта. Примени цикл (директиву `with_items`) в этом task, чтобы отобразились все фрукты из списка преременной `fruits`.",
        "subText": "",
        "files" : [
          {
          "name": "sample-playbook.yml",
          "stage": [{
  "name": "Print list of fruits",
  "hosts": "localhost",
  "vars": {
    "fruits": [
      "Apple",
      "Banana",
      "Grapes",
      "Orange"
    ]
  },
  "tasks": [
    {
      "command": "echo \"Apple\""
    }
  ]
}],
          "answers": [[
  {
    "name": "Print list of fruits",
    "hosts": "localhost",
    "vars": {
      "fruits": [
        "Apple",
        "Banana",
        "Grapes",
        "Orange"
      ]
    },
    "tasks": [
      {
        "command": "echo \"{{ item }}\"",
        "with_items": "{{ fruits }}"
      }
    ]
  }
]]
          }
        ]
    },
    {
        "title": "Ansible Loops",
        "question": "Более реалистичный вариант использования. Нам нужно установить несколько пакетов с помощью модуля `yum`. Текущий playbook устанавливает только отдельный пакет.",
        "subText": "",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{
  "name": "Install required packages",
  "hosts": "localhost",
  "vars": {
    "packages": [
      "httpd",
      "binutils",
      "glibc",
      "ksh",
      "libaio",
      "libXext",
      "gcc",
      "make",
      "sysstat",
      "unixODBC",
      "mongodb",
      "nodejs",
      "grunt"
    ]
  },
  "tasks": [
    {
      "yum": "name=httpd state=present"
    }
  ]
}],
            "answers": [[{"name":"Install required packages","hosts":"localhost","vars":{"packages":["httpd","binutils","glibc","ksh","libaio","libXext","gcc","make","sysstat","unixODBC","mongodb","nodejs","grunt"]},"tasks":[{"yum":{"name":"{{ item }}","state":"present"},"with_items":"{{ packages }}"}]}],
                       [{
  "name": "Install required packages",
  "hosts": "localhost",
  "vars": {
    "packages": [
      "httpd",
      "binutils",
      "glibc",
      "ksh",
      "libaio",
      "libXext",
      "gcc",
      "make",
      "sysstat",
      "unixODBC",
      "mongodb",
      "nodejs",
      "grunt"
    ]
  },
  "tasks": [
    {
      "yum": "name={{ item }} state=present",
      "with_items": "{{ packages }}"
    }
  ]
}]]
          }
        ]
    }
  ]
