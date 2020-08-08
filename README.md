# DESCRIÇÃO

O parser Olavo é uma ferramenta para recuperar informações sobre Action Figures do Site Iron Studios (www.ironstudios.com.br). A princípio ele baixa figuras a partir do menu 'fabricante' (https://www.ironstudios.com.br/fabricante), mas ele pode ser ajustado para baixar a partir de qualquer menu do site, bastando substituir o valor da variável urlBase no arquivo index.js .

## INSTALAÇÃO

Utilizando o GIT baixe o projeto para uma pasta local:

> git clone https://github.com/gutoconde/parserolavo.git


Caso seu ambiente não possua o NODEJS, baixe e instale a partir do site https://nodejs.org .
Baixe também o gerenciador de pacotes NPM do site npmjs.com .

Depois de instalar o NODEJS e o NPM, execute o comando abaixo, dentro da pasta <b>parserolavo</b>, para baixar as dependências do projeto:

> npm install

## UTILIZAÇÃO

### Exemplo Simples

Para recuperar informações básicas dos Action Figures, execute o comando :

```bash
> npm start

2020-08-08T21:00:28.899Z : Recuperando figuras. Aguarde...
####################################################################################################
2020-08-08T21:01:30.279Z : 734 figuras recuperadas.
2020-08-08T21:01:30.280Z : Gerando arquivo...
2020-08-08T21:01:30.288Z : Arquivo 08082020180130.json gerado com sucesso
```

### Recuperando Informações Detalhadas

Para recuperar mais detalhes sobre os Action Figures, execute o comando com a opção <b>d</b> :

```bash
> npm start -- -d


2020-08-08T21:27:53.995Z : Recuperando figuras. Aguarde...
####################################################################################################
2020-08-08T21:28:36.838Z : 734 figuras recuperadas.
2020-08-08T21:28:36.839Z : Recuperando detalhes de 734 figuras. Esta operação pode demorar...
####################################################################################################
2020-08-08T21:41:29.008Z : Detalhes das figuras recuperados.
2020-08-08T21:41:29.009Z : Gerando arquivo...
2020-08-08T21:41:29.027Z : Arquivo 08082020184129.json gerado com sucesso
```

Obs.: Essa operação pode demorar alguns minutos.

###Definindo o nome do arquivo

É possível definir o nome do arquivo criado utilizando a opção <b>f</b>, conforme o comando abaixo :

```bash
> npm start -- -f arquivo-action-figures.json

2020-08-08T21:42:36.750Z : Recuperando figuras. Aguarde...
####################################################################################################
2020-08-08T21:43:20.085Z : 734 figuras recuperadas.
2020-08-08T21:43:20.086Z : Gerando arquivo...
2020-08-08T21:43:20.092Z : Arquivo arquivo-action-figures.json gerado com sucesso
```
