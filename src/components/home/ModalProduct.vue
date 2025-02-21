<template>
  <div class="q-pa-md">
    <q-dialog v-if="showDialog" v-model="showDialog" full-height>
      <q-card style="width: 700px; max-width: 80vw; max-height: 80vw;">
        <q-card-section style="height: 90vh" class="scroll">
          <div class="q-pa-md full-height text-center q-ma-none">
            <template v-if="item.images && item.images.length > 0">
              <q-carousel
                swipeable
                animated
                v-model="slide"
                thumbnails
                infinite
                class="col-xs-12 col-sm-12 col-md-7 q-mb-md"
              >
                <q-carousel-slide
                  v-for="image in item.images"
                  :name="image.id"
                  :key="image.name"
                  :img-src="srcImage(image.name)" />
              </q-carousel>
            </template>
            <img
              v-else
              width="200px"
              :src="srcImage('default.jpeg')">
            <div class="col-12 q-px-md">
              <div class="text-title text-bold">{{ item.name }}</div>
              <span class="text-h6 text-bold q-ml-sm">{{ currency(item.price) }}</span>
              <div class="text-body1 q-mt-md">{{ item.description }}</div>
              <div class="text-body1 q-mt-lg">
              </div>
              <div class="text-body1 q-mt-lg">
                <q-input
                  color="primary"
                  class="q-mt-sm col-xs-12 col-sm-12 col-md-4"
                  type="number"
                  label="Cantidad"
                  v-model="count"
                  outline>
                </q-input>
              </div>
              <div class="text-body1 q-mt-lg">
                <q-btn color="primary" label="Agregar al carrito" class="full-width" />
              </div>
              <div class="text-body1 q-mt-lg">
                <q-btn color="white" text-color="black" label="Cerrar" class="full-width" @click="showDialog = false"/>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { formatCurrency } from '../../helpers/formats';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      stars: 5,
      count: 1,
      isLoading: false,
      showModal: false,
      slide: 1,
    };
  },
  mounted() {
    if (this.item.images && this.item.images.length > 0) {
      this.slide = this.item.images[0].id;
    }
  },
  computed: {
    ...mapState(productTypes.PATH, [
      'statusAddProduct',
    ]),
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
    },
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      require: true,
    },
  },
  methods: {
    ...mapActions(productTypes.PATH, {
      fetchProducts: productTypes.actions.FETCH_PRODUCTS,
      addProduct: productTypes.actions.ADD_PRODUCT,
    }),
    srcImage(name) {
      return `${process.env.URL_FILES}/products/${name}`;
    },
    currency(value) {
      return `${formatCurrency(value)}`;
    },
    address() {
      return `${process.env.ADDRESS_COMPANY}`;
    },
  },
};
</script>
<style>
  @media (max-width: 600) {
    .f-h-phone-size {
      height: 100% !important;
      width: 100% !important;
    }
  }
</style>
