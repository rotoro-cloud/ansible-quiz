var questions = [
    {
        "title": "Ansible Variables",
        "question": "Этот playbook используется для обновления записей о неймсерверах в файле `resolv.conf` на localhost. Информация о нужном неймсервере также представлена в inventory-файле в переменнной `nameserver_ip`. Обратись к inventory за подробностями.",
        "subText": "Замени IP неймсервера в этом playbook, чтобы использовалось значение переменной `nameserver_ip` из inventory-файла, таким образом в будущем, когда потребуется внести изменения ты легко сможешь поправить лишь файл inventory.",
        "files" : [
          {
          "name": "sample-playbook.yml",
          "stage": [{"name":"Update nameserver entry into resolv.conf file on localhost","hosts":"localhost","tasks":[{"name":"Update nameserver entry into resolv.conf file","lineinfile":{"path":"/etc/resolv.conf","line":"nameserver 10.1.250.10"}}]}],
          "answers": [[{"name":"Update nameserver entry into resolv.conf file on localhost","hosts":"localhost","tasks":[{"name":"Update nameserver entry into resolv.conf file","lineinfile":{"path":"/etc/resolv.conf","line":"nameserver {{  nameserver_ip  }}"}}]}]]
        },{
            "name": "inventory",
            "mode": "ini",
            "readOnly": true,
            "stage": `# Sample Inventory File

localhost ansible_connection=localhost nameserver_ip=10.1.250.10`
          }
        ]
    },
    {
        "title": "Ansible Variables",
        "question": "Мы добавили в playbook новый task для отключения SNMP порта. Однако значение порта захардкожено в этом task. Измени файл inventory и добавь новую переменную `snmp_port` и присвой ей значение, как указано в этом playbook. После обнови playbook, чтобы он использовал значение этой переменной для своей работы.",
        "subText": "Не забудь про фигурные скобки вокруг имени переменной.",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Update nameserver entry into resolv.conf file on localhost","hosts":"localhost","tasks":[{"name":"Update nameserver entry into resolv.conf file","lineinfile":{"path":"/etc/resolv.conf","line":"nameserver {{ nameserver_ip }}"}},{"name":"Disable SNMP Port","firewalld":{"port":"160-161","permanent":true,"state":"disabled"}}]}],
            "answers": [[{"name":"Update nameserver entry into resolv.conf file on localhost","hosts":"localhost","tasks":[{"name":"Update nameserver entry into resolv.conf file","lineinfile":{"path":"/etc/resolv.conf","line":"nameserver {{ nameserver_ip }}"}},{"name":"Disable SNMP Port","firewalld":{"port":"{{ snmp_port }}","permanent":true,"state":"disabled"}}]}]]
          },{
              "name": "inventory",
              "mode": "ini",
              "stage": `# Sample Inventory File

localhost ansible_connection=localhost nameserver_ip=10.1.250.10`,
              "answers": [
                `# Sample Inventory File

localhost ansible_connection=localhost nameserver_ip=10.1.250.10 snmp_port=160-161`
              ]
            }
        ]
    },
    {
        "title": "Ansible Variables",
        "question": "Мы напечатали некоторою персональную информацию на экране. Мы бы хотели перенести `car_model`, `country_name` and `title` в переменные, определенные на уровне play.",
        "subText": "Создай три новые пременные (`car_model`, `country_name` and `title`) на уровне play и присвой им значения, какими они были в исходном playbook. Далее используй эти переменные в tasks.",
        "files" : [
          {
            "name": "sample-playbook.yml",
            "stage": [{"name":"Update nameserver entry into resolv.conf file on localhost","hosts":"localhost","tasks":[{"name":"Print my car model","command":"echo \"My car's model is BMW M3\""},{"name":"Print my country","command":"echo \"I live in the USA\""},{"name":"Print my title","command":"echo \"I work as a Systems Engineer\""}]}],
            "answers": [[{"hosts":"localhost", "vars":{"car_model":"BMW M3", "country_name":"USA", "title":"Systems Engineer"}, "tasks":[{"command":"echo \"My car's model is {{ car_model }}\""}, {"command":"echo \"I live in the {{ country_name }}\""}, {"command":"echo \"I work as a {{ title }}\""}]}]]
          }
        ]
    }
  ]
