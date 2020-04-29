const Pembayaran = {
  data: function () {
    return {
      data: null,
      loading: true,
      error: null,
      howmuch: '',
    };
  },
  template: `
    <div class="container">
      <article class="media" v-if="!loading && data">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ data.name }}</strong>
              <br>
              <br/>
              
              Rp. {{ data.price }} 
              <br/>
              <br/>
              how much do you want to buy : <b-input type="number" v-model="howmuch"></b-input>
              <br/>
              <br/>
              <b><h3>Total : Rp. {{data.price * howmuch}}</h3><b/>
              <b-button type="is-success" tag="router-link" :to="{path: '/thankyou/' + data.id}" @click="pay">buy it</b-button>            
            </p>
          </div>
        </div>
      </article>
      <b-skeleton :active="loading" />
    </div>
  `,
  watch: {
    howmuch: function (val) {
      localStorage.setItem('pay', this.data.price * val);
      localStorage.howmuch = val;
    },
  },
  methods: {
    pay: function () {
      localStorage.total = this.data.price * this.howmuch;
      localStorage.howmuch = this.howmuch;
    },
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

export default Pembayaran;
