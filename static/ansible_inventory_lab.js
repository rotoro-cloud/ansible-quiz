var questions = [
    {
        "title": "Ansible Inventory",
        "question": "У нас есть одинаковые записи в inventory файле для 3 серверов в списке. Добавь четвертый сервер с именем `server4.domain.com`",
        "subText": "",
        "files" : [
          {
            "name": "inventory",
            "mode": "ini",
            "stage": `# Sample Inventory File

server1.domain.com
server2.domain.com
server3.domain.com`,
           "answers": [`# Sample Inventory File

server1.domain.com
server2.domain.com
server3.domain.com
server4.domain.com`]
          }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "Мы добавили алиас `web1`, `web2` и `web3` для первых трех серверов. Обнови server4, чтобы у него был алиас `db1`",
        "subText": "",
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

web1 ansible_host=server1.domain.com
web2 ansible_host=server2.domain.com
web3 ansible_host=server3.domain.com
server4.domain.com`,
              "answers": [
                `# Sample Inventory File

web1 ansible_host=server1.domain.com
web2 ansible_host=server2.domain.com
web3 ansible_host=server3.domain.com
db1 ansible_host=server4.domain.com`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "Наши вебсерверы на Linux, но сервер базы данных на Windows. Добавь дополнительные параметры в каждую строку, чтобы были `ansible_connection`, `ansible_user` и `password`. Используй приведенную ниже таблицу учетных данных с информацией о доступе.",
        "subText": `
| Alias    | Host                | Connection  | User           | Password     |
| -------- |:-------------------:| :----------:|:--------------:|:-----------: |
| web1     | server1.domain.com | SSH         | root           | Password123! |
| web2     | server2.domain.com | SSH         | root           | Password123! |
| web3     | server3.domain.com | SSH         | root           | Password123! |
| db1      | server4.domain.com | Windows     | administrator  | Password123! |

> ИНФО: Для Linux используй \`ansible_ssh_pass\`, а для Windows используй \`ansible_password\`. Коннектор для Windows \`winrm\`
        `,
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

web1 ansible_host=server1.domain.com
web2 ansible_host=server2.domain.com
web3 ansible_host=server3.domain.com
db1 ansible_host=server4.domain.com`,
              "answers": [
                `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.domain.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "Мы создали группу вебсерверов. Таким же образом создай группу для серверов баз данных с названием `db_servers` и добавь туда сервер `db1`.",
        "subText": "",
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.domain.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!

[web_servers]
web1
web2
web3

`,
              "answers": [
`# Sample Inventory File

# Web Servers
web1 ansible_host=server1.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.domain.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


[web_servers]
web1
web2
web3

[db_servers]
db1`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "Давай создадим группу, содержащую группы. Создай группу с названием `all_servers` и добавь в нее ранее созданные группы `web_servers` и `db_servers`.",
        "subText": `
> ИНФО: Syntax: <br>
[parent\\_group:children] <br>
child\\_group1 <br>
child\\_group2
        `,
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.domain.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


[web_servers]
web1
web2
web3

[db_servers]
db1
`,
              "answers": [
`# Sample Inventory File

# Web Servers
web1 ansible_host=server1.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.domain.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.domain.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


[web_servers]
web1
web2
web3

[db_servers]
db1

[all_servers:children]
web_servers
db_servers`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "Попробуй представить приведенные ниже в таблице данные в формате Ansible Inventory",
        "subText": `
|Server Alias| Server Name    |    OS   |    User       |    Password  |
|------------|----------------|---------|---------------|--------------|
|sql_db1     | sql01.xyz.com  | Linux   |   root        |  Lin$Pass    |
|sql_db2     | sql02.xyz.com  | Linux   |   root        |  Lin$Pass    |
|web_node1   | web01.xyz.com  | Win     | administrator |  Win$Pass    |
|web_node2   | web02.xyz.com  | Win     | administrator |  Win$Pass    |
|web_node3   | web03.xyz.com  | Win     | administrator |  Win$Pass    |

Сгруппируй серверы на основе этой таблицы:

| Group             | Members                           |
| ------------------|-----------------------------------|
| db_nodes          | sql\\_db1, sql\\_db2                  |
| web_nodes         | web\\_node1,  web\\_node2, web\\_node3  |
| boston_nodes      | sql\\_db1, web\\_node1                |
| dallas_nodes      | sql\\_db2, web\\_node2, web\\_node3     |
| us_nodes          | boston\\_nodes, dallas\\_nodes        |

        `,
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `
`,
              "answers": [
`# Sample Inventory File

# Web Servers
web_node1 ansible_host=web01.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass
web_node2 ansible_host=web02.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass
web_node3 ansible_host=web03.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass

# DB Servers
sql_db1 ansible_host=sql01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
sql_db2 ansible_host=sql02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass

# Groups
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
              ]
            }
        ]
    }
  ]
