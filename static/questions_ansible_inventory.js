var questions = [
    {
        "title": "Ansible Inventory",
        "question": "We have a sample inventory file with 3 servers listed. Add a fourth server by the name `server4.company.com`",
        "subText": "",
        "files" : [
          {
            "name": "inventory",
            "mode": "ini",
            "stage": `# Sample Inventory File

server1.company.com
server2.company.com
server3.company.com`,
           "answers": [`# Sample Inventory File

server1.company.com
server2.company.com
server3.company.com
server4.company.com`]
          }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "We have added aliases named `web1`, `web2` and `web3` for the first three servers. Update server4 to have an alias `db1`",
        "subText": "",
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

web1 ansible_host=server1.company.com
web2 ansible_host=server2.company.com
web3 ansible_host=server3.company.com
server4.company.com`,
              "answers": [
                `# Sample Inventory File

web1 ansible_host=server1.company.com
web2 ansible_host=server2.company.com
web3 ansible_host=server3.company.com
db1 ansible_host=server4.company.com`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "The web servers are linux, but the db server is windows. Add additional parameters in each line to add `ansible_connection`, `ansible_user` and `password`. Use the below table for information about credentials.",
        "subText": `
| Alias    | Host                | Connection  | User           | Password     |
| -------- |:-------------------:| :----------:|:--------------:|:-----------: |
| web1     | server1.company.com | SSH         | root           | Password123! |
| web2     | server2.company.com | SSH         | root           | Password123! |
| web3     | server3.company.com | SSH         | root           | Password123! |
| db1      | server4.company.com | Windows     | administrator  | Password123! |

> Note: For linux use \`ansible_ssh_pass\` and for windows use \`ansible_password\`. Connector for windows is \`winrm\`
        `,
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

web1 ansible_host=server1.company.com
web2 ansible_host=server2.company.com
web3 ansible_host=server3.company.com
db1 ansible_host=server4.company.com`,
              "answers": [
                `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!`
              ]
            }
        ]
    },
    {
        "title": "Ansible Inventory",
        "question": "We have created a group for web servers. Similarly create a group for database servers named `db_servers` and add `db1` server to it.",
        "subText": "",
        "files" : [
          {
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

# Web Servers
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!

[web_servers]
web1
web2
web3

`,
              "answers": [
`# Sample Inventory File

# Web Servers
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


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
        "question": "Let us now create a group of groups. Create a new group called `all_servers` and add the previously created groups `web_servers` and `db_servers` to it.",
        "subText": `
> Note: Syntax: <br>
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
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


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
web1 ansible_host=server1.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web2 ansible_host=server2.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!
web3 ansible_host=server3.company.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Password123!

# Database Servers
db1 ansible_host=server4.company.com ansible_connection=winrm ansible_user=administrator ansible_password=Password123!


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
        "question": "Try and represent the data given in the below table in Ansible Inventory format",
        "subText": `
|Server Alias| Server Name    |    OS   |    User       |    Password  |
|------------|----------------|---------|---------------|--------------|
|sql_db1     | sql01.xyz.com  | Linux   |   root        |  Lin$Pass    |
|sql_db2     | sql02.xyz.com  | Linux   |   root        |  Lin$Pass    |
|web_node1   | web01.xyz.com  | Win     | administrator |  Win$Pass    |
|web_node2   | web02.xyz.com  | Win     | administrator |  Win$Pass    |
|web_node3   | web03.xyz.com  | Win     | administrator |  Win$Pass    |

Group the servers together based on this table

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
