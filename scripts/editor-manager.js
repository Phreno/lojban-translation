// @auto-fold here
function guid() {
  function s4(count = 1) {
    let segment = ""
    while (count--) {
      segment += `${
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)}`;
    }
    return segment
  }
  return `${s4(2)}-${s4()}-${s4()}-${s4()}-${s4(3)}`;
}

let library = {}
library.json = {
  replacer: function (match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var r = pIndent || '';
    if (pKey)
      r = r + '&quot;' + key + pKey.replace(/[": ]/g, '') + '</span>&quot;: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  },
  prettyPrint: function (obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(jsonLine, library.json.replacer);
  }
};


let application = new Vue({
  el: '#application',
  // @auto-fold here
  data: {
    "guid": guid(),
    "action": "",
    "@context": "https://phreno.github.io/lojban-translation/",
    "@type": "Article",
    "headline": "",
    "alternativeHeadline": "",
    "image": "https://picsum.photos/750/300",
    "author": "Phreno",
    "award": "Commentaire",
    "editor": "Phreno",
    "genre": "article",
    "keywords": "",
    "publisher": "Phreno",
    "url": "https://phreno.github.io/lojban-translation/",
    "datePublished": new Date(),
    "dateCreated": new Date(),
    "dateModified": new Date(),
    "description": "",
    "rawArticle": "",
    "articleBody": "",
    "wordcount": 0
  },
  // @auto-fold here
  computed: {
    prettyJson() {
      return library
        .json
        .prettyPrint(this.$data)
    }
  },
  // @auto-fold here
  watch: {
    rawArticle() {
      this.rawArticle = this.rawArticle.replace(/"/g, '\'')

      this.wordcount = $("<div/>")
        .html(this.rawArticle)
        .text().split(/\s+/g)
        .length

      this.articleBody = this.rawArticle
    }
  }
})