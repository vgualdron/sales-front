<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nuevo parametro</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="name" label="Nombre *" hint="Escriba el nombre"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input outlined v-model="reference" label="Referencia *" hint="Escriba la referencia"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input outlined v-model="dato" label="Valor *" hint="Escriba el valor"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
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
import configurationTypes from '../../store/modules/configuration/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      name: '',
      reference: '',
      dato: '',
    };
  },
  computed: {
    ...mapState(configurationTypes.PATH, [
      'statusAddConfiguration',
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
    ...mapActions(configurationTypes.PATH, {
      fetchConfigurations: configurationTypes.actions.FETCH_CONFIGURATIONS,
      addConfiguration: configurationTypes.actions.ADD_CONFIGURATION,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.addConfiguration({
        name: this.name,
        reference: this.reference,
        value: this.dato,
      });
      if (this.statusAddConfiguration.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddConfiguration.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Parametro agregado con éxito',
        });
        this.showDialog = false;
        await this.fetchConfigurations();
      }
      this.isLoading = false;
    },
  },
};
</script>
