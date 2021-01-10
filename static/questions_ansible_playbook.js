var questions = [
    {
        "title": "Ansible Playbooks",
        "question": "Update name of the play to <code>Execute a date command on localhost</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
          "name": "playbook1.yaml",
          "stage": [{"name":"Play 1", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}]}],
          "answers": [[{"name":"Execute a date command on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Update the task to execute the command <code>cat /etc/hosts</code> and change task name to <code>Execute a command to display hosts file</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "playbook1.yaml",
            "stage": [{"name":"Execute a command to display hosts file on localhost","hosts":"localhost","tasks":[{"name":"Execute a date command","command":"date"}]}],
            "answers": [[{"name":"Execute a command to display hosts file on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Update the playbook to add a second task. The new task must execute the command <code>cat /etc/hosts</code> and change new task name to <code>Execute a command to display hosts file</code>",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "playbook1.yaml",
            "stage": [{"name":"Execute two commands on localhost","hosts":"localhost","tasks":[{"name":"Execute a date command","command":"date"}]}],
            "answers": [[{"name":"Execute two commands on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "We have been running all tasks on localhost. We would now like to run these tasks on the web_node1. Update the play to run the tasks on <code>web_node1</code>.",
        "subText": "",
        "files" : [
          {
            "name": "playbook1.yaml",
            "stage": [{"name":"Execute two commands on localhost", "hosts":"localhost", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}],
            "answers": [[{"name":"Execute two commands on web_node1", "hosts":"web_node1", "tasks":[{"name":"Execute a date command", "command":"date"}, {"name":"Execute a command to display hosts file", "command":"cat /etc/hosts"}]}]]
          }
        ]
    },
    {
        "title": "Ansible Playbooks",
        "question": "Refer to the attached inventory file. We would like to run the tasks defined in the play on all servers in `boston`.",
        "subText": "",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "playbook1.yaml",
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
        "question": "Create a new play named `Execute a command to display hosts file contents on web_node2` to execute `cat /etc/hosts` command on second node `web_node2` and name the task `Execute a command to display hosts file`.",
        "subText": "Refer to the attached inventory file",
        "do_not_remove_name": true,
        "files" : [
          {
            "name": "playbook1.yaml",
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
    },
    {
        "title": "Ansible Playbooks",
        "question": `You are assigned a task to restart a number of servers in a particular sequence.
The sequence and the commands to be used are given below. Note that the commands should be run on respective servers only.
Refer to the inventory file and update the playbook to create the below sequence.

> Note: Use the description below to name the plays and tasks.

1. \`Stop\` the \`web\` services on web server nodes - \`service httpd stop\`
2. \`Shutdown\` the \`database\` services on db server nodes - \`service mysql stop\`
3. \`Restart\` \`all\` servers (web and db) at once - \`/sbin/shutdown -r\`
4. \`Start\` the \`database\` services on db server nodes - \`service mysql start\`
5. \`Start\` the \`web\` services on web server nodes - \`service httpd start\`

> Warning: Do not use this playbook in a real setup. There are better ways to do these actions. This is only for simple practise.
        `,
        "subText": "",
        "files" : [
          {
            "name": "playbook1.yaml",
            "stage": [{"name":"Stop the web services on web server nodes","hosts":"web_nodes","tasks":[{"name":"Stop the web services on web server nodes","command":"service httpd stop"}]}],
            "answers": [[{"name":"Stop the web services on web server nodes","hosts":"web_nodes","tasks":[{"name":"Stop the web services on web server nodes","command":"service httpd stop"}]},{"name":"Shutdown the database services on db server nodes","hosts":"db_nodes","tasks":[{"name":"Shutdown the database services on db server nodes","command":"service mysql stop"}]},{"name":"Restart all servers (web and db) at once","hosts":"all_nodes","tasks":[{"name":"Restart all servers (web and db) at once","command":"/sbin/shutdown -r"}]},{"name":"Start the database services on db server nodes","hosts":"db_nodes","tasks":[{"name":"Start the database services on db server nodes","command":"service mysql start"}]},{"name":"Start the web services on web server nodes","hosts":"web_nodes","tasks":[{"name":"Start the web services on web server nodes","command":"service httpd start"}]}]]
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
