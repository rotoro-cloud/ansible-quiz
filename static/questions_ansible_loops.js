var questions = [
    {
        "title": "Ansible Loops",
        "question": "The playbook currently runs an echo command to print a fruit name. Apply a loop directive (with_items) to the task to print all fruits defined in the `fruits` variable.",
        "subText": "",
        "files" : [
          {
          "name": "playbook1.yaml",
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
        "question": "To a more realistic use case. We are attempting to install multiple packages using yum module.The current playbook installs only a single package.",
        "subText": "",
        "files" : [
          {
            "name": "playbook1.yaml",
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
