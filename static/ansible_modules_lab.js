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
    },
    {
        "title": "Ansible Modules",
        "question": "Обнови playbook и добавь в него новый task, так, чтобы он был первым. Этот task должен вносить запись в файл `/etc/resolv.conf` для этих `web_nodes`. Строка, которую надо добавить: `nameserver 10.1.250.10`",
        "subText": `
> ИНФО: Новый task должен быть выполнен \`первым\`, так что запиши его в соответствующем месте.

Используй информацию из <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html' target='blank'>Lineinfile module</a>`,
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Execute a script on all web server nodes", "hosts":"web_nodes", "tasks":[{"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":{"name":"httpd", "state":"present"}}]}],
            "answers": [[{"name":"Execute a script on all web server nodes and start httpd service", "hosts":"web_nodes", "tasks":[{"name":"Update entry into /etc/resolv.conf", "lineinfile":{"path":"/etc/resolv.conf", "line":"nameserver 10.1.250.10"}}, {"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":{"name":"httpd", "state":"present"}}]}]]
          },
          {
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
        "question": "Измени playbook и добавь в него новый task на вторую позицию (как раз после добавления строки в `resolv.conf`), который будет создавать нового пользователя на веб-сервере.",
        "subText": "Используй информацию из <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html' target='blank'>user module</a> для этого. Данные для добавления пользователя: <br>**Username**: web\\_user <br>**uid**: 1040 <br>**group**: developers",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Execute a script on all web server nodes and start httpd service", "hosts":"web_nodes", "tasks":[{"name":"Update entry into /etc/resolv.conf", "lineinfile":{"path":"/etc/resolv.conf", "line":"nameserver 10.1.250.10"}}, {"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":{"name":"httpd", "state":"present"}}]}],
            "answers": [[{"name":"Execute a script on all web server nodes and start httpd service", "hosts":"web_nodes", "tasks":[{"name":"Update entry into /etc/resolv.conf", "lineinfile":{"path":"/etc/resolv.conf", "line":"nameserver 10.1.250.10"}}, {"name":"Create a new user", "user":{"name":"web_user", "uid":1040, "group":"developers"}}, {"name":"Execute a script", "script":"/tmp/install_script.sh"}, {"name":"Start httpd service", "service":{"name":"httpd", "state":"present"}}]}]]
          },
          {
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
