const NEWS_API_KEY = 'db9b661f07bd4234917209689296ee31'
const NEWS_API_PAGE_SIZE = 4

const ArticleCard = {
  props: ['article', 'index'],
  template: `
<router-link :to="{ path: '/blog/' + index }">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="article.urlToImage || 'https://source.unsplash.com/random'" alt="Thumbnail">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ article.title }}</p>
          <p class="subtitle is-6">{{ article.author }}</p>
        </div>
      </div>
  
      <div class="content">
        <time>{{ new Date(article.publishedAt).toLocaleString() }}</time>
      </div>
    </div>
  </div>
</router-link>
  `
}


const Blog = {
  data: function() {
    return {
      data: [],
      page: 1,
      totalResults: 1,
      loading: true,
      styles: {
        articleContainer: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gridGap: '1rem',
          justifyContent: 'center',
          marginBottom: '2rem',
        }
      }
    };
  },
  components: {
    'article-card': ArticleCard
  },
  template: `
  <div>
    <template v-if="!loading">
      <div :style="styles.articleContainer">
        <article-card v-for="(article, index) in data" :article="article" :index="(page - 1) * ${NEWS_API_PAGE_SIZE} + index" />
      </div>
      <div class="container">
        <b-pagination
          :total="totalResults"
          :per-page="${NEWS_API_PAGE_SIZE}"
          :current.sync="page"
          icon-prev="chevron-left"
          icon-next="chevron-right"
        >
        </b-pagination>
      </div>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function() {
      this.loading = true;
      fetch(`https://newsapi.org/v2/everything?language=id&qInTitle=burung&page=${this.page}&pageSize=${NEWS_API_PAGE_SIZE}`,
        {
          headers: {
            Authorization: `Bearer ${NEWS_API_KEY}`,
          },
        }
      )
        .then(res => res.json())
        .then(json => {
          this.data = json.articles;
          this.totalResults = json.totalResults;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false
        })
    }
  },
  watch: {
    page: function(newPage) {
      this.loadData()
    }
  },
  mounted: function() {
    this.loadData()
  }
};

export default Blog;
