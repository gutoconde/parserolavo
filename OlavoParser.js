'use strict';
const httpUtil = require("./HttpUtil");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.recuperaLink = (html) => {
    var regexp = /buscapagina\?fq\=.+&PS=.+&sl=.+&cc=.+&sm=.+&PageNumber\=/g;
    var matches = html.match(regexp);
    var link = null;
    if(matches) {
        link = matches[0];
    }
    return link;
};

module.exports.recuperaFiguras = (html) => {

    const promise = new Promise((resolve, reject) => {
        try {
            var figuras = [];
            const dom = new JSDOM(html);
            const figures = dom.window.document.querySelectorAll('figure._shelf-pdt-img');
            if(figures) {
                figures.forEach(node => {
                    const a = node.querySelectorAll('a');
                    const img = a[0].querySelectorAll('img');
                    var figura = {
                        titulo: a[0].title,
                        url: a[0].href,
                        urlImagem: img[0].src   
                    };
                    figuras.push(figura);
                });
            }
            resolve(figuras);
        } catch(error) {
            reject(error);
        }

    });
    return promise;
};

module.exports.recuperarDetalheUsandoUrl = async (urlDetalhe) => {
    var html = await httpUtil.recuperarPagina(urlDetalhe);
    return await this.recuperaDetalhe(html);
} 

module.exports.recuperaDetalhe = (htmlDetalhe) => {

    const promise = new Promise((resolve, reject) => {
        try {
            const dom = new JSDOM(htmlDetalhe);
            const divNome = dom.window.document.querySelectorAll('div.fn.productName');
            const divDescricao = dom.window.document.querySelectorAll('div.productDescription');
            const strongPrice = dom.window.document.querySelectorAll('strong.skuPrice');
            const imgs = dom.window.document.querySelectorAll('img');
            
            var detalhe = {
                nome: divNome[0].textContent,
                descricao: divDescricao[0].innerHTML
            };
            
            if(strongPrice[0]) {
                detalhe.price = strongPrice[0].textContent;
            }

            resolve(detalhe);
        } catch(error) {
            reject(error);
        }

    });
    return promise;
};

module.exports.recuperaNumeroResultados = (htmlDetalhe) => {

    const promise = new Promise((resolve, reject) => {
        try {
            const dom = new JSDOM(htmlDetalhe);
            const span = dom.window.document.querySelectorAll('span.resultado-busca-numero');
            const spanNumero = span[0].querySelectorAll('span.value');
            
            var resultados = 0;
            
            if(spanNumero[0]) {
                resultados = parseInt(spanNumero[0].textContent);
                
            }

            resolve(resultados);
        } catch(error) {
            reject(error);
        }

    });
    return promise;
};

