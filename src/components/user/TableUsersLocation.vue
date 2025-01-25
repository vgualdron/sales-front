<template>
  <div class="q-pa-md">
    <div class="row q-mt-md">
      <div class="col-12 text-center">
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
    </div>
    <q-table
      :data="data"
      :columns="columns"
      :filter="filter"
      :pagination="pagination"
      class="q-mt-md"
      separator="cell"
      dense
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="primary"
              field="edit"
              icon="location_on"
              size="xs"
              round
              @click="openInGoogleMaps(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import userTypes from '../../store/modules/user/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';

export default {
  components: {
  },
  data() {
    return {
      route: '/users-location',
      name: 'Usuarios',
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Nombre',
          field: 'name',
          style: 'max-width: 300px',
          classes: 'ellipsis',
          sortable: true,
          visible: true,
        },
        {
          name: 'status',
          align: 'left',
          label: 'Estado',
          field: 'status',
          sortable: true,
          visible: true,
        },
        {
          name: 'phone',
          align: 'left',
          label: 'Teléfono',
          field: 'phone',
          sortable: true,
          visible: true,
        },
        {
          name: 'zone',
          align: 'left',
          label: 'Ciudad',
          field: 'zone',
          sortable: true,
          visible: true,
        },
        {
          name: 'areaName',
          align: 'left',
          label: 'Area',
          field: 'areaName',
          sortable: false,
          visible: true,
        },
        {
          name: 'date_location',
          align: 'left',
          label: 'Fecha de ubicación',
          field: 'date_location',
          sortable: false,
          visible: true,
          format: (val) => new Date(val).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        },
        {
          name: 'actions',
          label: 'Acciones',
          align: 'center',
          visible: false,
        },
      ],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'date_location',
        descending: true,
      },
      filter: '',
      data: [],
      polling: null,
    };
  },
  async mounted() {
    await this.listUsersMounted();
    this.pollData();
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'users',
      'responseMessages',
      'status',
      'user',
    ]),
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    ...mapActions(userTypes.PATH, {
      listUsers: userTypes.actions.LIST_USERS,
      getUser: userTypes.actions.GET_USER,
    }),
    async pollData() {
      this.polling = setInterval(async () => {
        await this.listUsersMounted();
      }, 60000);
    },
    openInGoogleMaps({ latitude, longitude }) {
      const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(googleMapsUrl, '_blank');
    },
    async listUsersMounted() {
      showLoading('Cargando Usuarios ...', 'Por favor, espere', true);
      await this.listUsers({ displayAll: 1 });
      if (this.status === true) {
        this.data = this.users.map((element) => ({
          ...element,
          showEdit: true,
          showDelete: true,
        }));
        this.$q.loading.hide();
      } else {
        this.showNotification(this.responseMessages, this.status, 'top-right', 5000);
        this.data = [];
        this.$q.loading.hide();
      }
    },
    async showForm(id, type) {
      showLoading('Preparando formulario ...', 'Por favor, espere', true);
      if (id === null) {
        this.$refs.formUserReference.showModal(id, null, type);
      } else {
        await this.getUser(id);
        if (this.status === true) {
          this.$refs.formUserReference.showModal(id, { ...this.user }, type);
        } else {
          this.$q.loading.hide();
          this.showNotification(this.responseMessages, 'red', 'top-right', 5000);
        }
      }
    },
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
  },
};
</script>
