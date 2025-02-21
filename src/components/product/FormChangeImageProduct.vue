<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nueva imagen</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="flex column justify-center text-center text-body1">
            <p>Cargar imagen</p>
            <q-file outlined clearable v-model="fileName" class="q-mb-md" label="Buscar imagen..."
              accept=".jpg, image/*" @input="handleFile" />
            <p>Click en la imagen para empezar a editar</p>
            <div id="display-area" ref="displayAreaRef">
              <div class="container cursor-pointer column items-center"
                @mouseover="showOverlay = !showOverlay">
                <img ref="image" :src="imageSrc" style="width: 250px;" >
                <div class="overlay flex justify-center items-center" :hidden="showOverlay">
                  <q-icon name="crop" size="xl" color="grey-10" class="crop-icon" />
                </div>
              </div>
            </div>
            <q-popup-proxy ref="popup" anchor="center middle" self="center left"
              transition-show="scale" transition-hide="scale" target="#display-area">
              <CropperDialog @destroy="finishCropper" :imageSrc="imageSrc" />
            </q-popup-proxy>
          </div>
          <q-separator class="q-mt-md"/>
          <div class="row text-center q-mt-md">
            <q-btn label="cancelar" type="reset" color="primary" :loading="isLoading"
              :disable="disabledBtns" outline class="col" v-close-popup/>
            <q-btn label="Aceptar" type="submit" color="primary" :loading="isLoading"
              :disable="disabledBtns" class="col q-ml-sm" @click="saveImage"/>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import CropperDialog from 'components/common/CropperDialog.vue';
import userTypes from '../../store/modules/user/types';

export default {
  data() {
    return {
      isLoading: false,
      imageSrc: 'https://media.istockphoto.com/id/969564218/vector/no-photo-set.jpg?s=612x612&w=0&k=20&c=Th8J1GoW55Tj-dfb1CCwelwx4sj82itv3PDjLHK2FEI=',
      showOverlay: false,
      fileName: null,
    };
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'statusChangeImageProfile',
    ]),
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    disabledBtns() {
      return !this.imageSrc || !this.imageSrc.includes('data:image');
    },
    idUser() {
      const user = localStorage.getItem('user');
      let id = '';
      if (user) {
        id = JSON.parse(user).id;
      }
      return `${id}`;
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (this.src) {
      this.imageSrc = this.src;
    }
  },
  methods: {
    ...mapActions(userTypes.PATH, {
      changeImageProfile: userTypes.actions.CHANGE_IMAGE_PROFILE,
      getUser: userTypes.actions.GET_USER,
    }),
    handleFile(file) {
      this.imageSrc = URL.createObjectURL(file);
      const { displayAreaRef } = this.$refs;
      if (displayAreaRef) {
        displayAreaRef.click();
      }
    },
    finishCropper(croppedImage) {
      this.imageSrc = croppedImage;
    },
    async saveImage() {
      this.isLoading = true;
      await this.changeImageProfile({
        image: this.imageSrc,
      });
      await this.getUser(this.idUser);
      window.location.reload();
      this.isLoading = false;
      this.showDialog = false;
    },
  },
  components: {
    CropperDialog,
  },
};
</script>
<style lang="stylus" scoped>
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
