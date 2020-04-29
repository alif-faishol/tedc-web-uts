const Thanks = {
  data: function () {
    return {
      total: 0,
      amount: 0,
      data: null,
      loading: true,
      error: null,
    };
  },
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
  mounted() {
    this.loadData();
    if (localStorage.getItem('pay')) {
      this.total = localStorage.getItem('pay');
    }
    if (localStorage.howmuch) {
      this.amount = localStorage.howmuch;
    }
  },
  template: `
    <div class="container">
      <h1 class="title" style="@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap'); font-family: 'Lobster', cursive;">Terima Kasih</h1><br/>
      <table>
        <tr>
          <td>Item Name</td>
          <td>:</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>:</td>
          <td>Rp. {{data.price}}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>:</td>
          <td>{{amount}}</td>
        </tr>
      </table><br/>
      <strong class="title">Total Rp. {{total}}</strong></br>
      <b-button type="is-success" tag="router-link" :to="{path: '/product'}" style="margin-top: 50px">ok</b-button>
    </div>
  `,
};
export default Thanks;
