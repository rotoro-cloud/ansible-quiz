var questions = [
    {
        "title": "Ansible Conditionals",
        "question": "Приведенный playbook пытается запустить службу `service` на `all_servers`. Используй условие `when`, чтобы запустить task в случае если `ansible_host` является сервером баз данных.",
        "subText": "Обратись к inventory-файлу, чтобы определить имя сервера базы данных.",
        "files" : [
          {
          "name": "sample-playbook.yml",
          "stage": [{"name":"Execute a script on all web server nodes","hosts":"all_servers","tasks":[{"service":"name=mysql state=started"}]}],
          "answers": [[{"name":"Execute a script on all web server nodes","hosts":"all_servers","tasks":[{"service":"name=mysql state=started","when":"ansible_host==\"server4.company.com\""}]}]]
        },{
            "name": "inventory",
            "mode": "ini",
            "readOnly": true,
            "stage": `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_ssh_pass=Password123!

[web_servers]
web1
web2
web3

[db_servers]
db1`
          }
        ]
    },
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
