var questions = [
    {
        "title": "Ansible Modules",
        "question": "Update the playbook with a play to `Execute a script on all web server nodes`. The script is located at `/tmp/install_script.sh`",
        "subText": "Use the <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html' target='blank'>Script module</a>",
        "files" : [
          {
          "name": "playbook1.yaml",
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
        "title": "Ansible Playbooks",
        "question": "Update the playbook to add a new task to `start httpd services` on all web nodes",
        "subText": "Use the <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html' target='blank'>Service module</a>",
        "files" : [
          {
            "name": "playbook1.yaml",
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
        "title": "Ansible Playbooks",
        "question": "Update the playbook to add a new task in the beginning to add an entry into `/etc/resolv.conf` file for hosts. The line to be added is `nameserver 10.1.250.10`",
        "subText": `
> Note: The new task must be executed first, so place it accordingly.

Use the <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html' target='blank'>Lineinfile module</a>`,
        "files" : [
          {
            "name": "playbook1.yaml",
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
        "title": "Ansible Playbooks",
        "question": "Update the playbook to add a new task at second position (right after adding entry to resolv.conf) to create a new web user.",
        "subText": "Use the <a href='https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html' target='blank'>user module</a> for this. User details to be used are given below: <br>**Username**: web\\_user <br>**uid**: 1040 <br>**group**: developers",
        "files" : [
          {
            "name": "playbook1.yaml",
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
