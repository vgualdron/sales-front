<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-9 text-center">
        <q-input
          debounce="400"
          color="primary"
          v-model="filter"
          class="q-ml-xs"
          placeholder="Buscar"
          clearable
          dense
          outlined
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div
        class="col-3
        text-center"
      >
        <q-btn
          color="primary"
          label="Agregar"
          @click="addRow"
          :disable="isDiabledAdd"
        />
      </div>
    </div>
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :selected.sync="selected"
      :loading="isLoadingTable"
      :filter="filter"
      :pagination.sync="pagination"
      separator="cell"
      class="q-mt-md"
      dense>
      <template v-slot:body="props">
        <q-tr :props="props" @click="clickRow(props.row)">
          <q-td key="actions" :props="props">
            <q-btn icon="delete" type="reset" color="primary" flat size="sm"
              class="col q-ml-sm" @click="openModal('delete', props.row)" />
          </q-td>
          <q-td key="name" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.name }}
            <q-popup-edit :value="props.row.name" v-slot="scope" buttons
              @input="val => save('name', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="reference" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.reference }}
            <q-popup-edit :value="props.row.reference" v-slot="scope" buttons
              @input="val => save('reference', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="value" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.value }}
            <q-popup-edit :value="props.row.value" v-slot="scope" buttons
              @input="val => save('value', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <form-configuration v-if="showModal" v-model="showModal"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormConfiguration from 'components/configuration/FormConfiguration.vue';
import configurationTypes from '../../store/modules/configuration/types';

export default {
  data() {
    return {
      isLoadingTable: false,
      selected: [],
      itemSelected: {},
      columns: [
        {
          name: 'actions',
          required: true,
          label: 'Acciones',
          align: 'left',
          style: 'width: 100px',
          headerStyle: 'height: 50px',
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
          align: 'left',
          label: 'Referencia',
          field: 'reference',
          sortable: true,
        },
        {
          name: 'value',
          label: 'Valor',
          field: 'value',
          sortable: true,
          align: 'center',
        },
      ],
      pagination: {
        rowsPerPage: 30,
      },
      filter: '',
      isDiabledAdd: false,
      showModal: false,
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchConfigurations();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(configurationTypes.PATH, [
      'configurations',
    ]),
    data() {
      return [...this.configurations];
    },
  },
  methods: {
    ...mapActions(configurationTypes.PATH, {
      fetchConfigurations: configurationTypes.actions.FETCH_CONFIGURATIONS,
      updateConfiguration: configurationTypes.actions.UPDATE_CONFIGURATION,
      deleteConfiguration: configurationTypes.actions.DELETE_CONFIGURATION,
    }),
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value;
      await this.updateConfiguration(this.itemSelected);
      await this.fetchConfigurations();
      this.isLoadingTable = false;
    },
    clickRow(row) {
      this.itemSelected = { ...row };
    },
    addRow() {
      this.showModal = true;
    },
    openModal(action, row) {
      if (action === 'delete') {
        this.$q.dialog({
          title: 'Eliminar',
          message: 'Está seguro que desea eliminar la configuración?',
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
          await this.deleteConfiguration(row.id);
          await this.fetchConfigurations();
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
    FormConfiguration,
  },
};
</script>
