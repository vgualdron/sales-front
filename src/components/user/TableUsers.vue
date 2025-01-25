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
          @click="showForm(null, 'C')"
          :disabled="!validatedPermissions.create.status"
          :title="validatedPermissions.create.title"
        />
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
              icon="edit"
              size="xs"
              round
              :disabled="!validatedPermissions.edit.status"
              :title="validatedPermissions.edit.title"
              @click="showForm(props.row.id, 'E')"
            />
            <q-btn
              class="q-ml-xs"
              color="red"
              field="delete"
              icon="delete"
              size="xs"
              round
              :disabled="!validatedPermissions.delete.status"
              :title="validatedPermissions.delete.title"
              @click="showForm(props.row.id, 'D')"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <form-users
      ref="formUserReference"
      :showNotificationsRef="showNotification"
      :listUsersMountedRef="listUsersMounted"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormUsers from 'components/user/FormUsers.vue';
import userTypes from '../../store/modules/user/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';
import { havePermission } from '../../helpers/havePermission';

export default {
  components: {
    FormUsers,
  },
  data() {
    return {
      route: '/user',
      name: 'Usuarios',
      columns: [
        {
          name: 'documentNumber',
          label: 'Documento',
          align: 'left',
          field: 'documentNumber',
          sortable: true,
          visible: true,
          headerStyle: 'height: 50px',
        },
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
          name: 'yard',
          align: 'left',
          label: 'Sector',
          field: 'yard',
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
          name: 'pushToken',
          align: 'left',
          label: 'Token Push',
          field: 'pushToken',
          sortable: false,
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
          name: 'actions',
          label: 'Acciones',
          align: 'center',
          visible: false,
        },
      ],
      pagination: {
        rowsPerPage: 50,
      },
      filter: '',
      data: [],
    };
  },
  async mounted() {
    await this.listUsersMounted();
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'users',
      'responseMessages',
      'status',
      'user',
    ]),
    validatedPermissions() {
      const statusCreate = havePermission('user.create');
      const statusEdit = havePermission('user.update');
      const statusDelete = havePermission('user.delete');
      return {
        create: {
          title: statusCreate ? 'Registrar usuario' : 'No tiene permisos para registrar usuarios',
          status: statusCreate,
        },
        edit: {
          title: statusEdit ? 'Editar usuario' : 'No tiene permisos para editar usuarios',
          status: statusEdit,
        },
        delete: {
          title: statusDelete ? 'Eliminar usuario' : 'No tiene permisos para eliminar usuarios',
          status: statusDelete,
        },
      };
    },
  },
  methods: {
    ...mapActions(userTypes.PATH, {
      listUsers: userTypes.actions.LIST_USERS,
      getUser: userTypes.actions.GET_USER,
    }),
    openInGoogleMaps(lat, lon) {
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
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
