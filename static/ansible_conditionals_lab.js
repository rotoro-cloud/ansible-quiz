var questions = [
    
    {
        "title": "Ansible Conditionals",
        "question": "Приведенный playbook пытается запустить службу `mysql` на `all_servers`. Используй условие `when`, чтобы запустить task в случае если `ansible_host` является сервером баз данных.",
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
    },
	
    {
        "title": "Ansible Conditionals",
        "question": "В этом playbook мы хотим, чтобы происходило добавление новой строки в файл `/etc/resolv.conf` для `nameserver`.",
        "subText": `Сначала, мы запускаем команду с помощью модуля \`shell\`, чтобы получить содержимое файла \`/etc/resolv.conf\`, а потом  добавляем в него новую линию, содержащую данные для разрешения имени этого сервера. Однако, при многократном запуске данный playbook будет каждый раз вносить дубликаты этой строки в данный файл \`resolv.conf\`.

1. Добавь директиву \`register\`, которая сохранит вывод  первой команды в переменную \`command_output\`

2. Теперь добавь \`условие\` во вторую команду, чтобы проверить, содержится ли уже в выводе первой команды сервер имен  \`10.0.250.10\`. Используй условие \`command_output.stdout.find(<IP>) == -1\`
> ИНФО: Лучший способ делать такие вещи - это модуль \`lineinfile\`. Не используй это в своих решениях, мы просто тренируемся.


> Инфо: модули \`shell\` и \`command\` похожи в том, что они используются для выполнения команд в управляемых системах. Однако, модуль \`shell\` выполняет команду внутри оболочки целевой системы, в которой нам доступны переменные окружения и редиректы при помощи \`>>\`
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
