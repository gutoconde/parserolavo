'use strict';

const yargs = require('yargs');
const httpUtil = require('./HttpUtil');
const fs = require('fs');
const dateFormat = require('dateformat');
const olavoParser = require('./OlavoParser');

const urlBase = 'https://www.ironstudios.com.br/fabricante';

module.exports.execute = async() => {
    var argv = yargs
        .usage('Modo de uso : $0 [opções]')
        .example('$0', 'Gera o arquivo de figuras sem detalhes.')
        .nargs('f', 1).describe('f', 'Nome do arquivo')
        .help('h')
        .alias('h', 'help')
        .boolean(['d'])
        .describe('d', 'Gera o arquivo de figuras com detalhes')
        .default('d', false).argv;

    console.log(new Date().toISOString(), ': Recuperando figuras. Aguarde...');
    var figuras = await this.recuperarFiguras(urlBase);
    console.log(new Date().toISOString(), ': ' + figuras.length + ' figuras recuperadas.');
    if(argv.d) {
        console.log(new Date().toISOString(), ': Recuperando detalhes de ' + figuras.length + ' figuras. Esta operação pode demorar...');
        figuras = await this.recuperaDetalhes(figuras);
        console.log(new Date().toISOString(), ': Detalhes das figuras recuperados.');
    }
    console.log(new Date().toISOString(), ': Gerando arquivo...');
    this.gerarArquivo(figuras, argv.f);
    
};

/**
 * Recupera figuras a partir de uma URL base
 */
module.exports.recuperarFiguras = async(urlBase) => {
    var html = await httpUtil.recuperarPagina(urlBase);
    var figuras = await olavoParser.recuperaFiguras(html);
    var numeroResultados = await olavoParser.recuperaNumeroResultados(html);
    
    var link = olavoParser.recuperaLink(html);
    var pageNumber = 2;
    
    var ProgressBar = require('progress');
    
    var total = numeroResultados - figuras.length;
    var bar = new ProgressBar(':bar', 
        { 
            complete: '#',
            incomplete: '_',
            width: 100,
            total: total
        });

    do {
        var url = urlBase + '/' + link + pageNumber;
        html = await httpUtil.recuperarPagina(url);
        var figs = await olavoParser.recuperaFiguras(html);
        if(figs.length === 0) {
            break;
        }
        figuras.push.apply(figuras, figs);
        pageNumber++
        bar.tick(figs.length);
    } while(true);
    return figuras;
};

/**
 * Recupera detalhes das figuras
 */
module.exports.recuperaDetalhes = async(figuras) => {
    var ProgressBar = require('progress');
    var bar = new ProgressBar(':bar', 
        { 
            complete: '#',
            incomplete: '_',
            width: 100,
            total: figuras.length
        });
    for(let index = 0; index < figuras.length; index++) {
        var htmlDetalhe = await httpUtil.recuperarPagina(figuras[index].url);
        var detalhe = await olavoParser.recuperaDetalhe(htmlDetalhe);
        figuras[index].detalhe = detalhe;
        bar.tick(1);
    }
    return figuras;
};

/**
 * Gera o arquivo JSON de figuras.
 */
module.exports.gerarArquivo = async(figuras, nomeArquivo) => {
    var fileName = nomeArquivo ? nomeArquivo : dateFormat(new Date(), 'ddmmyyyyHHMMss') + '.json';
    fs.writeFile(fileName, JSON.stringify(figuras, null, "\t"), 'utf8', (err) => {
        if(err){
            throw err;
        }
        console.log(new Date().toISOString(), ': Arquivo ' + fileName + ' gerado com sucesso');
    });
};

this.execute();