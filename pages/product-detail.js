const ProductDetail = {
  data: function () {
    return {
      data: null,
      loading: true,
      error: null,
    };
  },
  template: `
  <div>
    <template v-if="!loading && data">
      <figure class="image is-5by3" style="margin-bottom: 1rem">
        <img :src="data.image" :alt="data.name" style="object-fit: cover">
      </figure>
      <h1 class="title">{{ data.name }}</h1>
      <p>Rp. {{ data.price }}</p>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function () {
      this.loading = true;
      fetch('https://api.jsonbin.io/b/5ea663b998b3d537523539be/1')
        .then((res) => res.json())
        .then((json) => {
          this.data = json.data.find(
            (product) => product.id.toString() === this.$route.params.id
          );
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
        });
    },
  },
  mounted: function () {
    this.loadData();
  },
};

export default ProductDetail;
