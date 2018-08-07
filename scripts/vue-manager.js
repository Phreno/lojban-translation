console.log("inf: création de l'instance")
let application = new Vue({
  el: "#application",
  data: {
    view: {
      title: "ci'argun",
      heading: "",
      subHeading: "",
      home: "zdani",
      readMore: "zmadu tcidu ...",
      search: "gugle",
      searchPlaceholder: "gugle ...",
      menu: "cmima tcidu",
      copyright: "Copyright © K€rn3l P4n1k 2018"
    },
    values: {
      selected: "main",
      articles: [],
      search: ""
    }
  },
  created() {
    console.log("inf: le composant est créé")

    let mapper = (item) => {
      let sandbox = document.createElement("div");
      sandbox.innerHTML = item.articleBody;
      item.articleBodySanitized = (
        sandbox.textContent ||
        sandbox.innerText ||
        ""
      )
      return item
    }

    if (DATA) {
      console.log("inf: utilisation des données locales")
      this.values.articles = DATA.map(mapper)
    } else {
      console.log("inf: utilisation des données en base")
      let query = {
        url: "http://localhost:3000/api/articles"
      }

      $.ajax(query)
        .done((data) => {
          console.log("inf: récupération des articles")
          console.log(data)
          this.values.articles = data.map(mapper)
        })
    }
  },
  computed: {
    articleFilter() {
      return this.values.articles.filter(item => {
        return item.articleBody.match(this.values.search)
      })
    },
    isHomeTab() {
      return 'main' === this.values.selected
    },
    isEmpty() {
      return 0 === this.articleFilter.length
    }
  },
  methods: {
    goto(selection) {
      let empty = ''
      if (selection) {
        console.log("inf: nouvel onglet ouvert")
        console.log(selection)
        this.values.search = empty
        this.values.selected = selection
      } else {
        console.error("err: action inconnue")
      }
    }
  }
})

console.log(application)