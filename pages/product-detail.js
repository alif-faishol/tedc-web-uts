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
    <article class="media" v-if="!loading && data">
      <figure class="media-left is-5by3" >
        <img :src="data.image" :alt="data.name" style="object-fit: cover">
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ data.name }}</strong>
            <br>
            <br/>
            
            Rp. {{ data.price }} 
            <br/>
            <br/>
            <b-button type="is-success" tag="router-link" :to="{path: '/pembayaran/' + data.id}">buy it</b-button>            
          </p>
        </div>
      </div>
    </article>
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
