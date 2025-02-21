<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      row-key="id"
      :loading="isLoadingTable"
      :pagination.sync="pagination"
      ref="tableGrid"
      grid>
      <template v-slot:top>
        <div class="row full-width q-pb-sm">
          <q-select
            v-model="categorieSelected"
            label="Categoria"
            placeholder="Seleccione la categoria"
            :options="optionsCategories"
            class="q-mt-sm col-4"
            outlined>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop="categorieSelected = null"
                class="cursor-pointer"
                round dense fla
              />
            </template>
          </q-select>
          <q-input
            debounce="300"
            color="primary"
            v-model="filter"
            class="q-mt-sm q-pl-sm col-8"
            ref="searchInput"
             @keyup.enter="searchAction"
            outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:top-right>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-md col-xs-6 col-sm-6 col-md-2 col-lg-2 cursor-pointer"
          @click="clickRow(props.row)">
          <q-card class="my-card">
            <q-card-section class="text-center">
              <div class="text-subtitle text-bold q-mb-xs">{{ props.row.reference }}</div>
              <div class="text-subtitle q-mb-xs">{{ props.row.name }}</div>
              <div class="text-subtitle text-primary q-mb-xs">Stock: {{ props.row.amount }}</div>
              <div class="text-subtitle text-primary text-bold q-mb-xs">{{ currency(props.row.price) }}</div>
            </q-card-section>
            <img :src="props.row.images && props.row.images.length > 0 ? srcImage(props.row.images[0].name) : srcImage('default.jpeg')">
          </q-card>
        </div>
      </template>
    </q-table>
    <modal-product
      v-if="showModal"
      v-model="showModal"
      :item="itemSelected"
      @onClosedModal="closedModal"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ModalProduct from 'components/home/ModalProduct.vue';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';
import { formatCurrency } from '../../helpers/formats';

export default {
  data() {
    return {
      stars: 5,
      isLoading: false,
      isLoadingTable: false,
      itemSelected: {},
      categorieSelected: null,
      columns: [
        {
          name: 'images',
          required: true,
          label: 'Imagenes',
          align: 'left',
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'reference',
          required: true,
          label: 'Referencia',
          align: 'left',
          field: (row) => row.reference,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 40,
      },
      filter: '',
      showModal: false,
      fileName: null,
      showOverlay: false,
      imageSrc: '',
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchProducts();
    await this.fetchCategories();
    this.isLoadingTable = false;
    this.$nextTick(() => {
      this.$refs.searchInput.focus();
    });
  },
  watch: {
    showModal() {
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
  },
  computed: {
    ...mapState(productTypes.PATH, [
      'products',
    ]),
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    data() {
      const text = this.filter.toLowerCase();
      let items = this.products.filter(({ name, reference }) => (name.toLowerCase().includes(text) || reference.toLowerCase().includes(text)));
      if (this.categorieSelected && this.categorieSelected.value) {
        const val = this.categorieSelected.value;
        items = items.filter(({ categorie_id }) => parseInt(categorie_id, 10) === parseInt(val, 10));
      }
      return items;
    },
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
    },
  },
  methods: {
    ...mapActions(productTypes.PATH, {
      fetchProducts: productTypes.actions.FETCH_PRODUCTS,
      updateProduct: productTypes.actions.UPDATE_PRODUCT,
      deleteProduct: productTypes.actions.DELETE_PRODUCT,
    }),
    ...mapActions(categoryTypes.PATH, {
      fetchCategories: categoryTypes.actions.FETCH_CATEGORIES,
    }),
    closedModal() {
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    srcImage(name) {
      return `${process.env.URL_FILES}/products/${name}`;
    },
    currency(value) {
      return `${formatCurrency(value)}`;
    },
    searchAction() {
      console.log('searchAction');
    },
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value.value || value;
      await this.updateProduct(this.itemSelected);
      await this.fetchProducts();
      this.isLoadingTable = false;
    },
    clickRow(row) {
      this.itemSelected = { ...row };
      this.showModal = true;
    },
    openModal(action, row) {
      if (action === 'delete') {
        this.$q.dialog({
          title: 'Eliminar',
          message: 'Está seguro que desea eliminar el producto?',
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: 'negative',
            text: 'adsa',
          },
          persistent: true,
        }).onOk(async () => {
          this.isLoadingTable = true;
          await this.deleteProduct(row.id);
          await this.fetchProducts();
          this.isLoadingTable = false;
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      }
    },
  },
  components: {
    ModalProduct,
  },
};
</script>
<style scoped>
</style>
