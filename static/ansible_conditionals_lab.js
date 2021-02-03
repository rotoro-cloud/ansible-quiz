var questions = [
    
    {
        "title": "Ansible Conditionals",
        "question": "В этом playbook мы хотим, чтобы происходило добавление новой строки в файл `/etc/resolv.conf` для `nameserver`.",
        "subText": `Сначала, мы запускаем команду с помощью модуля \`shell\`, чтобы получить содержимое файла \`/etc/resolv.conf\`, а потом  добавляем в него новую линию, содержащую данные для разрешения имени этого сервера. Однако, при многократном запуске данный playbook будет кажды раз вносить дубликаты этой строки в данный файл `resolv.conf`.

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
