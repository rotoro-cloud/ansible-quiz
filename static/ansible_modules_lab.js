var questions = [
    {
        "title": "Ansible Modules",
        "question": "В playbook нужно добавить play для выполнения скрипта на всех веб-серверах. Название у play будет `Execute a script on all web server nodes`. Сам скрипт находится в размещении `/tmp/install_script.sh`",
        "subText": "Используй информацию из <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html' target='blank'>Script module</a>",
        "files" : [
          {
          "name": "sample-playbook.yml",
          "stage": "",
          "answers": [[{"name":"Execute a script on all web server nodes","hosts":"web_nodes","tasks":[{"name":"Execute a script on all web server nodes","script":"/tmp/install_script.sh"}]}]]
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

[all_nodes:children]
db_nodes
web_nodes`
          }
        ]
    },
    {
        "title": "Ansible Modules",
        "question": "Измени playbook, добавив в него новый task, который запустит сервис `httpd` на всех `web`-хостах",
        "subText": "Используй информацию из <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html' target='blank'>Service module</a>",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Execute a script on all web server nodes","hosts":"web_nodes","tasks":[{"name":"Execute a script on all web server nodes","script":"/tmp/install_script.sh"}]}],
            "answers": [[{"name":"Execute a script on all web server nodes", "hosts":"web_nodes", "tasks":[{"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":"name=httpd state=started"}]}],
                        [{"name":"Execute a script on all web server nodes", "hosts":"web_nodes", "tasks":[{"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":{"name":"httpd", "state":"started"}}]}]]
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

  [all_nodes:children]
  db_nodes
  web_nodes`
            }
        ]
    }
  ]
