const productCard = {
  props: ['product'],
  template: `
  <router-link :to="{ path: '/product/' + product.id }">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="product.image" alt="Placeholder image" style="object-fit: cover">
        </figure>
      </div>
      <div class="card-header">
        <div class="card-header-title">{{ product.name }}</div>
      </div>
      <div class="card-content">
        <div class="content">Price Rp.{{product.price}}</div>
        <b-button type="is-success" expanded>see more</b-button>
      </div>
    </div>
  </router-link>
  `,
};
const Product = {
  data() {
    return {
      keyword: '',
      data: [],
      page: 1,
      totalPage: 1,
      loading: true,
      error: null,
      styles: {
        productContainer: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gridGap: '1rem',
          justifyContent: 'center',
        },
      },
    };
  },
  components: {
    'product-card': productCard,
  },
  template: `
  <div id="app">
    <b-input placeholder="silahkan cari nama burung yang kamu mau" v-model="keyword"></b-input>
    <br/><br/>
    <template v-if="!loading">
      <div :style="styles.productContainer">
        <product-card :product="product" v-for="product in filterBurungs" />
      </div>
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
          this.data = json.data;
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
  computed: {
    filterBurungs() {
      const keyword = this.keyword;
      return this.data.filter((bird) => {
        return bird.name.toLowerCase().includes(this.keyword.toLowerCase());
      });
    },
  },
};
export default Product;
