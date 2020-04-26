const NEWS_API_KEY = 'db9b661f07bd4234917209689296ee31'

const BrandCard = {
  props: ['brand'],
  template: `
  <router-link :to="{ path: '/brand/' + brand.id }">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="brand.image || 'https://source.unsplash.com/random'" alt="Placeholder image" style="object-fit: cover">
        </figure>
      </div>
      <div class="card-header">
        <div class="card-header-title">{{ brand.name }}</div>
      </div>
    </div>
  </router-link>
  `
}


const Brand = {
  data: function() {
    return {
      data: [],
      page: 1,
      totalPage: 1,
      loading: true,
      error: null,
      styles: {
        brandContainer: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gridGap: '1rem',
          justifyContent: 'center',
        }
      }
    };
  },
  components: {
    'brand-card': BrandCard
  },
  template: `
  <div>
    <template v-if="!loading">
      <div :style="styles.brandContainer">
        <brand-card :brand="brand" v-for="brand in data" />
      </div>
    </template>
    <b-skeleton :active="loading" />
  </div>
  `,
  methods: {
    loadData: function() {
      this.loading = true
      fetch('/res/brand.json')
        .then(res => res.json())
        .then(json => {
          this.data = json.data
          this.loading = false
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    }
  },
  mounted: function() {
    this.loadData()
  }
};

export default Brand;
