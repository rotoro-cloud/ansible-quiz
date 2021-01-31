var questions = [
    {
        "title": "Ansible Playbooks",
        "question": "Установи название (параметр `name`) в `play` в значение <code>Execute a date command on localhost</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
          "name": "simple-playbook.yml",
          "stage": [{"name":"Play 1", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}]}],
          "answers": [[{"name":"Execute a date command on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Измени `task` так, чтобы в нем выполнялась команда <code>cat /etc/hosts</code> и измени его название (`name`) на <code>Execute a command to display hosts file</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "simple-playbook.yml",
            "stage": [{"name":"Execute a command to display hosts file on localhost","hosts":"localhost","tasks":[{"name":"Execute a date command","command":"date"}]}],
            "answers": [[{"name":"Execute a command to display hosts file on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Добавь в `playbook` еще один `task`. Этот новый `task` должен выполнять команду <code>cat /etc/hosts</code> и его название должно быть <code>Execute a command to display hosts file</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "simple-playbook.yml",
            "stage": [{"name":"Execute two commands on localhost","hosts":"localhost","tasks":[{"name":"Execute a date command","command":"date"}]}],
            "answers": [[{"name":"Execute two commands on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Мы запустили и проверили все эти `tasks` на `localhost`. Теперь мы хотим запустить их в боевой среде на хосте `web_node1`. Обновил этот `play`, чтобы запуск был на узле <code>web_node1</code>.",
        "subText": "",
        "files" : [
          {
            "name": "simple-playbook.yml",
            "stage": [{"name":"Execute two commands on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}],
            "answers": [[{"name":"Execute two commands on web_node1", "hosts":"web_node1", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Изучи прикрепленный inventory-файл. Нам требуется запустить `tasks` определенные в `play` на серверах, которые территориально находятся в `boston`. Отрази эти сервера в `playbook`.",
        "subText": "Вкладка на inventory-файл находится вверху справа",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "simple-playbook.yml",
            "stage": [{"name":"Execute two commands on web_node1", "hosts":"web_node1", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}],
            "answers": [[{"name":"Execute two commands on web_node1", "hosts":"boston_nodes", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}],
                        [{"name":"Execute two commands on web_node1","hosts":"sql_db1,web_node1","tasks":[{"name":"Execute a date command","command":"date"},{"name":"Execute a command to display hosts file","command":"cat /etc/hosts"}]}],
                        [{"name":"Execute two commands on web_node1","hosts":"web_node1,sql_db1","tasks":[{"name":"Execute a date command","command":"date"},{"name":"Execute a command to display hosts file","command":"cat /etc/hosts"}]}]]
          },{
            "name": "inventory",
            "mode": "ini",
            "readOnly": true,
            "stage": `# Sample Inventory File

# Web Servers
sql_db1 ansible_host=sql01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
sql_db2 ansible_host=sql02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
web_node1 ansible_host=web01.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node2 ansible_host=web02.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node3 ansible_host=web03.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass

[db_nodes]
sql_db1
sql_db2

[web_nodes]
web_node1
web_node2
web_node3

[boston_nodes]
sql_db1
web_node1

[dallas_nodes]
sql_db2
web_node2
web_node3

[us_nodes:children]
boston_nodes
dallas_nodes`
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Создай новый `play` с названием `Execute a command to display hosts file contents on web_node2`, который выполнит команду `cat /etc/hosts` на ноде `web_node2` и название `task` должно быть `Execute a command to display hosts file`.",
        "subText": "Вкладка на inventory-файл находится вверху справа",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "simple-playbook.yml",
            "stage": [{"name":"Execute command to display date on web_node1","hosts":"web_node1","tasks":[{"name":"Execute a date command","command":"date"}]}],
            "answers": [[{"name":"Execute command to display date on web_node1","hosts":"web_node1","tasks":[{"name":"Execute a date command","command":"date"}]},{"name":"Execute a command to display hosts file contents on web_node2","hosts":"web_node2","tasks":[{"name":"Execute a command to display hosts file","command":"cat /etc/hosts"}]}]]
          },{
            "name": "inventory",
            "mode": "ini",
            "readOnly": true,
            "stage": `# Sample Inventory File

# Web Servers
sql_db1 ansible_host=sql01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
sql_db2 ansible_host=sql02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
web_node1 ansible_host=web01.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node2 ansible_host=web02.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass
web_node3 ansible_host=web03.xyz.com ansible_connection=ssh ansible_user=administrator ansible_ssh_pass=Win$Pass

[db_nodes]
sql_db1
sql_db2

[web_nodes]
web_node1
web_node2
web_node3

[boston_nodes]
sql_db1
web_node1

[dallas_nodes]
sql_db2
web_node2
web_node3

[us_nodes:children]
boston_nodes
dallas_nodes`
          }
        ]
    }
  ]
