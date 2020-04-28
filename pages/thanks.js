const Thanks = {
  data: function () {
    return {
      total: 0,
    };
  },
  mounted() {
    if (localStorage.getItem('pay')) {
      this.total = localStorage.getItem('pay');
    }
  },
  template: `
    <div id="app">
      <b>Total Rp. {{total}}</b>
    </div>
  `,
};
export default Thanks;
