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
        <!-- <q-btn
          color="primary"
          label="Agregar"
          @click="addRow"
          :disable="isDiabledAdd"
        /> -->
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
            <upload-image
              :config="{
                name: 'LOGO_SHOP',
                storage: 'shops',
                modelName: 'shops',
                modelId: props.row.id
              }"
              @savedFile="fetchShops"
            />
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from 'components/common/UploadImage.vue';
import shopTypes from '../../store/modules/shop/types';

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
    await this.fetchShops();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(shopTypes.PATH, [
      'shops',
    ]),
    data() {
      return [...this.shops];
    },
  },
  methods: {
    ...mapActions(shopTypes.PATH, {
      fetchShops: shopTypes.actions.FETCH_SHOPS,
    }),
    clickRow(row) {
      this.itemSelected = { ...row };
    },
    addRow() {
      this.showModal = true;
    },
  },
  components: {
    UploadImage,
  },
};
</script>
