<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-9 text-center">
        <q-input
          dense
          debounce="400"
          color="primary"
          v-model="filter"
          class="q-ml-xs"
          placeholder="Buscar usuario"
          clearable
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
      row-key="id"
      :selected.sync="selected"
      :loading="isLoadingTable"
      :filter="filter"
      :pagination.sync="pagination"
      class="q-mt-md"
      separator="cell"
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
          <q-td key="description" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.description }}
            <q-popup-edit :value="props.row.description" v-slot="scope" buttons
              @input="val => save('description', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <form-category v-if="showModal" v-model="showModal"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormCategory from 'components/category/FormCategory.vue';
import categoryTypes from '../../store/modules/category/types';

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
          name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true,
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
    await this.fetchCategories();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    data() {
      return [...this.categories];
    },
  },
  methods: {
    ...mapActions(categoryTypes.PATH, {
      fetchCategories: categoryTypes.actions.FETCH_CATEGORIES,
      updateCategory: categoryTypes.actions.UPDATE_CATEGORY,
      deleteCategory: categoryTypes.actions.DELETE_CATEGORY,
    }),
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value;
      await this.updateCategory(this.itemSelected);
      await this.fetchCategories();
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
          message: 'Está seguro que desea eliminar la categoria?',
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
          await this.deleteCategory(row.id);
          await this.fetchCategories();
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
    FormCategory,
  },
};
</script>
