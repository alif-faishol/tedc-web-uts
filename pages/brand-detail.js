const BrandDetail = {
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
      <h1 class="title">{{ data.name }}</h1>
      <p>{{ data.description }}</p>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function() {
      this.loading = true;
      fetch('/res/brand.json')
        .then(res => res.json())
        .then(json => {
          this.data = json.data.find(brand => brand.id.toString() === this.$route.params.id)
          this.loading = false;
        })
        .catch(err => {
          this.error = err;
          this.loading = false;
        })
    }
  },
  mounted: function() {
    this.loadData()
  }
};

export default BrandDetail;
