.env.example переименовать в .env

в постман коллекции по запросу createUser типо "регистрируемся", пример данных
{
"username": "tester322",
"role": "smart"
}

из ответа забираем себе куда нибудь
"clientId": "0bc94880-09ac-450e-8d8c-80252da3cc72",
"clientSecret": "653af561-3e52-40da-b1b7-506c0181b9e8"

по гет запросу authorize добавляем квери

clientId: 0bc94880-09ac-450e-8d8c-80252da3cc72
state: любая неугадываемая строка
response_type: code

из ответа забираем себе
"authorizationCode": "588314961328732329357beabbb97afbe3597eec",

по пост запросу token заполняем x-www-form-urlencoded
"clientId": "0bc94880-09ac-450e-8d8c-80252da3cc72",
"clientSecret": "653af561-3e52-40da-b1b7-506c0181b9e8"
"grant_type": "authorization_code"
"code": "authorizationCode" из предыдущего ответа
"redirect_uri": сейчас любой юрл валидный вставляем

забираем access_token из ответа и добавляем в Headers Auth с настройкой Bearer Token (я добавил пепременную, туда просто перезаписать можно)

и кликаем с включенным хедерсом get запрос authenticate
