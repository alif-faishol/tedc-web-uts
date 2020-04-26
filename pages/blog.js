const NEWS_API_KEY = 'db9b661f07bd4234917209689296ee31'

const ArticleCard = {
  props: ['article'],
  template: `
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="article.urlToImage || 'https://source.unsplash.com/random'" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
  `
}


const Blog = {
  data: function() {
    return {
      data: [],
      page: 1,
      totalPage: 1,
      styles: {
        articleContainer: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gridGap: '1rem',
          justifyContent: 'center',
        }
      }
    };
  },
  components: {
    'article-card': ArticleCard
  },
  template: `
  <div>
    <div :style="styles.articleContainer">
      <article-card :article="article" v-for="article in data" />
    </div>
    <p>Page: {{page}}</p>
    <p>Total Page: {{totalPage}}</p>
  </div>
  `,
  methods: {
    loadData: function() {
      fetch('https://newsapi.org/v2/everything?language=id&q=burung',
        {
          headers: {
            Authorization: `Bearer ${NEWS_API_KEY}`,
          },
        }
      )
        .then(res => res.json())
        .then(json => {
          this.data = json.articles
          this.totalPage = Math.ceil(json.totalResults / 20)
        })
    }
  },
  mounted: function() {
    this.loadData()
  }
};

export default Blog;
