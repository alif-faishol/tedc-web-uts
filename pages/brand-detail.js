const BrandDetail = {
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
      <b-field grouped group-multiline>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Color</b-tag>
            <b-tag type="is-light">{{ data.specs.color }}</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Size</b-tag>
            <b-tag type="is-info">{{ data.specs.size }}</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Lifespan</b-tag>
            <b-tag type="is-warning">{{ data.specs.lifespan }}</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Sounds</b-tag>
            <b-tag type="is-danger">{{ data.specs.sounds }}</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Interaction</b-tag>
            <b-tag type="is-success">{{ data.specs.interaction }}</b-tag>
          </b-taglist>
        </div>
      </b-field>
      <p>{{ data.description }}</p>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function () {
      this.loading = true;
      fetch('./res/brand.json')
        .then((res) => res.json())
        .then((json) => {
          this.data = json.data.find(
            (brand) => brand.id.toString() === this.$route.params.id
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

export default BrandDetail;
