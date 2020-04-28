const NEWS_API_KEY = 'db9b661f07bd4234917209689296ee31'

const BlogDetail = {
  data: function() {
    return {
      data: null,
      loading: true,
      error: null,
    }
  },
  template: `
  <div>
    <template v-if="!loading && data">
      <figure class="image is-5by3" style="margin-bottom: 1rem">
        <img :src="data.urlToImage || 'https://source.unsplash.com/random'" alt="cover" style="object-fit: cover">
      </figure>
      <h1 class="title">{{ data.title }}</h1>
      <p class="subtitle">{{ data.author }}</p>
      <div class="content">
        {{ data.content }}
        <br>
        <a :href="data.url">Baca selengkapnya</a>
      </div>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function() {
      this.loading = true;
      fetch(`https://newsapi.org/v2/everything?language=id&qInTitle=burung&pageSize=${parseInt(this.$route.params.id, 10) + 1}`,
        {
          headers: {
            Authorization: `Bearer ${NEWS_API_KEY}`,
          },
        }
      )
        .then(res => res.json())
        .then(json => {
          this.data = json.articles[parseInt(this.$route.params.id, 10)];
          console.log(json.articles)
          console.log(this.data)
          this.loading = false;
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  },
  mounted: function() {
    this.loadData()
  }
};

export default BlogDetail;
