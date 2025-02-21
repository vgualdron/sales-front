<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nuevo producto</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="row">
            <div class="col-6 q-pl-none">
              <q-select
                outlined
                v-model="categorie_id"
                label="Categoria *"
                placeholder="Seleccione la categoria"
                reactive-rules
                :options="optionsCategories"
                :rules="[(val) => (!!val) || 'La categoria es requerida']" />
            </div>
            <div class="col-6 q-pl-sm">
              <q-input
                outlined
                v-model="name"
                label="Nombre *"
                placeholder="Escriba el nombre"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-6 q-pl-none">
              <q-input
                outlined
                v-model="reference"
                label="Referencia *"
                placeholder="Escriba la referencia"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-6 q-pl-sm">
              <q-input
                outlined
                v-model="brand"
                label="Marca *"
                placeholder="Escriba la marca"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-12 q-pl-none q-mb-md">
              <q-input
                v-model="description"
                placeholder="Escriba la descripción"
                label="Descripción"
                outlined/>
            </div>
            <div class="col-2 q-pl-none">
              <q-input
                outlined
                v-model="price"
                label="Precio *"
                placeholder="Escriba precio"
                type="number"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-2 q-pl-sm">
              <q-input
                outlined
                v-model="amount"
                label="Cantidad *"
                placeholder="Escriba la cantidad actual"
                type="number"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-2 q-pl-sm">
              <q-input
                outlined
                v-model="amountMin"
                label="Minima *"
                placeholder="Escriba la cantidad minima"
                type="number"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-2 q-pl-sm">
              <q-input
                outlined
                v-model="amountMiddle"
                label="Media *"
                placeholder="Escriba la cantidad media"
                type="number"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-2 q-pl-sm">
              <q-input
                outlined
                v-model="amountMax"
                label="Maxima *"
                placeholder="Escriba la cantidad maxima"
                type="number"
                reactive-rules
                :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-2 q-pl-sm">
              <q-input
                outlined
                v-model="priority"
                label="Prioridad *"
                placeholder="Escriba la prioridad"
                reactive-rules
                :rules="[val => val && val >= 0 || 'Este campo es obligatorio']"
                type="number"/>
              </div>
            <q-separator />
            <div class="col-12 text-right">
              <q-btn
                label="cancelar"
                type="reset"
                color="primary"
                :disable="isLoading"
                outline
                class="col"
                v-close-popup/>
                <q-btn
                  label="Aceptar"
                  type="submit"
                  color="primary"
                  :loading="isLoading"
                  class="col q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      name: '',
      reference: '',
      amount: 0,
      amountMin: 0,
      amountMax: 0,
      amountMiddle: 0,
      brand: '',
      description: '',
      price: '',
      priority: 0,
      categorie_id: '',
    };
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
  },
  methods: {
    ...mapActions(productTypes.PATH, {
      fetchProducts: productTypes.actions.FETCH_PRODUCTS,
      addProduct: productTypes.actions.ADD_PRODUCT,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.addProduct({
        name: this.name,
        description: this.description,
        reference: this.reference,
        brand: this.brand,
        amount: this.amount,
        amountMin: this.amountMin,
        amountMax: this.amountMax,
        amountMiddle: this.amountMiddle,
        price: this.price,
        priority: this.priority,
        categorie_id: this.categorie_id.value || this.categorie_id,
      });
      if (this.statusAddProduct.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddProduct.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Producto agregado con éxito',
        });
        this.showDialog = false;
        await this.fetchProducts();
      }
      this.isLoading = false;
    },
  },
};
</script>
