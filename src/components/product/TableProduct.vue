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
          placeholder="Buscar"
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
            <q-btn
              icon="delete"
              type="reset"
              color="primary"
              flat
              size="sm"
              class="col q-ml-sm"
              @click="openModal('delete', props.row)" />
          </q-td>
          <q-td key="images" :props="props">
            <q-btn
              size="sm"
              :color="props.row.images && props.row.images.length > 0 ? 'primary' : 'grey'"
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'">
            </q-btn>
          </q-td>
          <q-td key="name" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.name }}
            <q-popup-edit :value="props.row.name" v-slot="scope" buttons
              @input="val => save('name', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="categorie_id" :props="props">
            <q-icon size="xs" name="edit" />
            {{ optionsCategories.find((item) => props.row.categorie_id === item.value).label }}
            <q-popup-edit
              :value="optionsCategories.find((item) => props.row.categorie_id === item.value)"
              v-slot="scope"
              @input="val => save('categorie_id', val)"
              buttons>
              <q-select
                outlined
                v-model="scope.value"
                :options="optionsCategories"/>
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
          <q-td key="brand" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.brand }}
            <q-popup-edit :value="props.row.brand" v-slot="scope" buttons
              @input="val => save('brand', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="amount" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.amount }}
            <q-popup-edit :value="props.row.amount" v-slot="scope" buttons
              @input="val => save('amount', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
          <q-td key="amountMin" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.amountMin }}
            <q-popup-edit :value="props.row.amountMin" v-slot="scope" buttons
              @input="val => save('amountMin', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
          <q-td key="amountMiddle" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.amountMiddle }}
            <q-popup-edit :value="props.row.amountMiddle" v-slot="scope" buttons
              @input="val => save('amountMiddle', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
          <q-td key="amountMax" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.amountMax }}
            <q-popup-edit :value="props.row.amountMax" v-slot="scope" buttons
              @input="val => save('amountMax', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
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
          <q-td key="price" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.price }}
            <q-popup-edit :value="props.row.price" v-slot="scope" buttons
              @input="val => save('price', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
          <q-td key="priority" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.priority }}
            <q-popup-edit :value="props.row.priority" v-slot="scope" buttons
              @input="val => save('priority', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
        </q-tr>
        <q-tr v-if="props.expand" :props="props">
          <q-td colspan="100%" class="is-flex">
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card
                class="my-card bg-grey-1 q-pa-md"
                flat
                bordered
                v-for="image in props.row.images"
                :key="`btn_dropdown_${image.id}_${image.name}`">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">{{ image.name }}</div>
                    <div class="text-subtitle2">
                      Orden:
                      <q-badge color="green">
                        {{ image.order }}
                      </q-badge>
                    </div>
                    <img class="image_product" :src="srcImage(image.name)">
                  </div>
                </div>
                <q-separator />
                <q-card-actions align="right">
                  <q-btn flat @click="openModalDeleteImage(image)">
                    Borrar imagen
                  </q-btn>
                  <q-btn flat @click="itemSelectedImage=image">
                    Editar orden
                    <q-popup-edit
                        :value="image.order"
                        v-slot="scope"
                        @input="val => saveImage('order', val)"
                        buttons>
                      <q-input v-model="scope.value" dense autofocus type="number" />
                    </q-popup-edit>
                  </q-btn>
                </q-card-actions>
              </q-card>

              <q-card
                class="my-card bg-grey-1 q-pa-md"
                flat
                bordered>
                <div class="flex column justify-center text-center text-body1">
                  <p>Cargar imagen</p>
                  <q-file
                    outlined
                    clearable
                    v-model="fileName"
                    class="q-mb-md"
                    label="Buscar imagen..."
                    accept=".jpg, image/*"
                    @input="handleFile(fileName, `displayAreaRef_${props.row.id}`)" />
                  <p v-if="imageSrc">Click en la imagen para empezar a editar</p>
                  <div :id="`display-area_${props.row.id}`" :ref="`displayAreaRef_${props.row.id}`">
                    <div class="container cursor-pointer column items-center"
                      @mouseover="showOverlay = !showOverlay">
                      <img
                        :ref="`imageProduct_${props.row.id}`"
                        :src="imageSrc"
                        style="width: 250px;">
                      <div class="overlay flex justify-center items-center" :hidden="showOverlay">
                        <q-icon name="crop" size="xl" color="grey-10" class="crop-icon" />
                      </div>
                    </div>
                  </div>
                  <q-popup-proxy
                    ref="popup"
                    anchor="center middle"
                    self="center left"
                    transition-show="scale"
                    transition-hide="scale"
                    :target="`#display-area_${props.row.id}`">
                    <CropperDialog
                      :id="`imageProduct_${props.row.id}`"
                      :imageSrc="imageSrc"
                      :aspectRatio="{ left: 1, right: 1 }"
                      @destroy="finishCropper"/>
                  </q-popup-proxy>
                </div>
                <q-separator class="q-mt-md"/>
                <div class="row text-center q-mt-md">
                  <q-btn label="cancelar" type="reset" color="primary" :loading="isLoading"
                    :disable="disabledBtns" outline class="col" v-close-popup/>
                  <q-btn label="Aceptar" type="submit" color="primary" :loading="isLoading"
                    :disable="disabledBtns" class="col q-ml-sm" @click="insertImage"/>
                </div>
                <q-separator />
              </q-card>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <form-product v-if="showModal" v-model="showModal"/>
    <form-change-image-product
      v-if="showModalChangeImageProduct"
      v-model="showModalChangeImageProduct"
      :src="srcProfile"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormProduct from 'components/product/FormProduct.vue';
import CropperDialog from 'components/common/CropperDialog.vue';
import productTypes from '../../store/modules/product/types';
import imageTypes from '../../store/modules/image/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      isLoading: false,
      isLoadingTable: false,
      selected: [],
      itemSelected: {},
      itemSelectedImage: {},
      columns: [
        {
          name: 'actions',
          required: true,
          label: 'Acciones',
          align: 'left',
        },
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
          name: 'categorie_id',
          required: true,
          label: 'Categoria',
          align: 'left',
        },
        {
          name: 'reference', align: 'left', label: 'Referencia', field: 'reference', sortable: true,
        },
        {
          name: 'brand', align: 'left', label: 'Marca', field: 'brand', sortable: true,
        },
        {
          name: 'amount', align: 'left', label: 'Stock', field: 'amount', sortable: true,
        },
        {
          name: 'amountMin', align: 'left', label: 'Min', field: 'amountMin', sortable: true,
        },
        {
          name: 'amountMiddle', align: 'left', label: 'Medio', field: 'amountMiddle', sortable: true,
        },
        {
          name: 'amountMax', align: 'left', label: 'Max', field: 'amountMax', sortable: true,
        },
        {
          name: 'description', align: 'left', label: 'Descripción', field: 'description', sortable: true,
        },
        {
          name: 'price', align: 'center', label: 'Precio', field: 'price', sortable: true,
        },
        {
          name: 'priority', align: 'center', label: 'Prioridad', field: 'priority', sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 30,
      },
      filter: '',
      isDiabledAdd: false,
      showModal: false,
      showModalChangeImageProduct: false,
      fileName: null,
      showOverlay: false,
      imageSrc: '',
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchCategories();
    await this.fetchProducts();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(productTypes.PATH, [
      'products',
    ]),
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    ...mapState(imageTypes.PATH, [
      'statusAddImage',
    ]),
    data() {
      return [...this.products];
    },
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
    },
    disabledBtns() {
      return !this.imageSrc || !this.imageSrc.includes('data:image');
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
    ...mapActions(imageTypes.PATH, {
      addImage: imageTypes.actions.ADD_IMAGE,
      updateImage: imageTypes.actions.UPDATE_IMAGE,
      deleteImage: imageTypes.actions.DELETE_IMAGE,
    }),
    srcImage(name) {
      return `${process.env.URL_FILES}/products/${name}`;
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
    },
    addRow() {
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
    handleFile(file, ref) {
      this.imageSrc = URL.createObjectURL(file);
      const displayAreaRef = this.$refs[ref];
      if (displayAreaRef) {
        displayAreaRef.click();
      }
    },
    finishCropper(croppedImage) {
      this.imageSrc = croppedImage;
    },
    async insertImage() {
      this.isLoading = true;
      await this.addImage({
        image: this.imageSrc,
        order: 1,
        product_id: this.itemSelected.id,
      });
      await this.fetchProducts();
      this.isLoading = false;
      this.showDialog = false;
      this.imageSrc = '';
      this.fileName = null;
    },
    async saveImage(field, value) {
      this.isLoadingTable = true;
      const row = { ...this.itemSelectedImage };
      row[field] = value;
      await this.updateImage(row);
      await this.fetchProducts();
      this.isLoadingTable = false;
    },
    openModalDeleteImage(row) {
      this.$q.dialog({
        title: 'Eliminar',
        message: 'Está seguro que desea eliminar la imagen?',
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
        await this.deleteImage(row.id);
        await this.fetchProducts();
        this.isLoadingTable = false;
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
    },
  },
  components: {
    FormProduct,
    CropperDialog,
  },
};
</script>
<style lang="stylus" scoped>
  .image_product
    max-width 230px
    display flex
  .container
    position relative
    max-width 80vw
    max-height 50vh
    overflow hidden
  .container img
    display block
    max-width 100%
    max-height 50vh
  .container .overlay
    position absolute
    display flex
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    height 100%
    background-color rgba(#fff, .7)
    opacity 0
    transition .3s ease
    &:hover
      opacity 0.6
  .crop-icon
    opacity 1
</style>
