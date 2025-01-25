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
          dense
          outlined
          type="date"
        >
        </q-input>
      </div>
      <div
        class="col-3
        text-center"
      >
        <q-btn
          color="primary"
          label="Buscar"
          @click="fetchListings"
        />
      </div>
    </div>
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :loading="isLoadingTable"
      :pagination.sync="pagination"
      separator="cell"
      class="q-mt-md"
      dense>
      <template v-slot:body="props">
        <q-tr :props="props" @click="clickRow(props.row)">
          <q-td key="download" :props="props">
            <q-btn
              v-if="props.row.capture_route_file"
              icon="download"
              color="primary"
              size="sm"
              class="col q-ml-sm"
              @click="downloadImage(props.row)"/>
          </q-td>
          <q-td key="delivery" :props="props">
            <q-btn
              v-if="props.row.capture_delivery_file"
              icon="visibility"
              color="primary"
              size="sm"
              class="col q-ml-sm"
              @click="openPreviewDelivery(props.row)"/>
          </q-td>
          <q-td key="list" :props="props">
            <q-btn
              v-if="props.row.capture_route_file"
              icon="visibility"
              color="primary"
              size="sm"
              class="col q-ml-sm"
              @click="openPreviewRoute(props.row)"/>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <modal-preview-file
      v-if="showModalDelivery"
      v-model="showModalDelivery"
      :url="formatLinkDelivery(itemSelected)"
      :type="itemSelected.typeFile"
      title="Entrega"
      :showBtnCancel="false"
      :showBtnAccept="false"
      />
    <modal-preview-file
      v-if="showModalRoute"
      v-model="showModalRoute"
      :url="formatLinkRoute(itemSelected)"
      :type="itemSelected.typeFile"
      title="Lista"
      :showBtnCancel="false"
      :showBtnAccept="false"
      />
  </div>
</template>
<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import ModalPreviewFile from 'components/common/ModalPreviewFile.vue';
import listingTypes from '../../store/modules/listing/types';
import { showLoading } from '../../helpers/showLoading';

export default {
  data() {
    return {
      isLoadingTable: false,
      itemSelected: {},
      columns: [
        {
          name: 'download',
          required: true,
          label: 'Descargar',
          align: 'center',
          style: 'width: 100px',
          headerStyle: 'height: 50px',
        },
        {
          name: 'delivery',
          required: true,
          label: 'Entrega',
          align: 'center',
          style: 'width: 100px',
          headerStyle: 'height: 50px',
        },
        {
          name: 'list',
          required: true,
          label: 'Lista',
          align: 'center',
          style: 'width: 100px',
          headerStyle: 'height: 50px',
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'center',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'status',
          align: 'center',
          label: 'Estado',
          field: 'status',
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 30,
      },
      filter: moment().format('YYYY-MM-DD'),
      isDiabledAdd: false,
      showModalDelivery: false,
      showModalRoute: false,
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchListings();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(listingTypes.PATH, [
      'listings',
    ]),
    data() {
      return [...this.listings];
    },
  },
  methods: {
    ...mapActions(listingTypes.PATH, {
      fetchWithDeliveries: listingTypes.actions.FETCH_WITH_DELIVERIES,
    }),
    async downloadImage(row) {
      const imageUrl = this.formatLinkRoute(row);
      const url = `${process.env.URL_API}/api/download-image-from-url?route=${(row.name)}&date=${(this.filter)}&imageUrl=${(imageUrl)}`;
      window.open(url, '_blank');
    },
    formatLinkDelivery(row) {
      if (row.capture_delivery_file) {
        return `${process.env.URL_FILES}${row.capture_delivery_file}`;
      }
      return '';
    },
    formatLinkRoute(row) {
      if (row.capture_route_file) {
        return `${process.env.URL_FILES}${row.capture_route_file}`;
      }
      return '';
    },
    async fetchListings() {
      showLoading('Consultando ...', 'Por favor, espere', true);
      await this.fetchWithDeliveries({
        date: this.filter,
      });
      this.$q.loading.hide();
    },
    clickRow(row) {
      this.itemSelected = { ...row };
    },
    openPreviewDelivery(row) {
      this.itemSelected = { ...row };
      this.showModalDelivery = true;
    },
    openPreviewRoute(row) {
      this.itemSelected = { ...row };
      this.showModalRoute = true;
    },
  },
  components: {
    ModalPreviewFile,
  },
};
</script>
