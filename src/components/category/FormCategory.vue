<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nueva categoria</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="name" label="Nombre *" hint="Escriba el nombre"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input v-model="description" hint="Escriba la descripción" label="Descripción"
              outlined/>
            <q-separator />
            <div class="row text-center">
              <q-btn label="cancelar" type="reset" color="primary" :disable="isLoading"
                outline class="col" v-close-popup/>
              <q-btn label="Aceptar" type="submit" color="primary" :loading="isLoading"
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
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      name: '',
      description: '',
    };
  },
  computed: {
    ...mapState(categoryTypes.PATH, [
      'statusAddCategory',
    ]),
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
    ...mapActions(categoryTypes.PATH, {
      fetchCategories: categoryTypes.actions.FETCH_CATEGORIES,
      addCategory: categoryTypes.actions.ADD_CATEGORY,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.addCategory({
        name: this.name,
        description: this.description,
      });
      if (this.statusAddCategory.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddCategory.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Categoria agregada con éxito',
        });
        this.showDialog = false;
        await this.fetchCategories();
      }
      this.isLoading = false;
    },
  },
};
</script>
