var questions = [
    
    {
        "title": "Ansible Conditionals",
        "question": "В этом playbook мы хотим, чтобы происходило добавление новой строки в файл `/etc/resolv.conf` для `nameserver`.",
        "subText": `
         `,
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Add name server entry if not already entered","hosts":"localhost","tasks":[{"shell":"cat /etc/resolv.conf"},{"shell":"echo \"nameserver 10.0.250.10\" >> /etc/resolv.conf"}]}],
            "answers": [[{"name":"Add name server entry if not already entered","hosts":"localhost","tasks":[{"shell":"cat /etc/resolv.conf","register":"command_output"},{"shell":"echo \"nameserver 10.0.250.10\" >> /etc/resolv.conf","when":"command_output.stdout.find(\"10.0.250.10\") == -1"}]}]]
          }
        ]
    }
    
  ]
