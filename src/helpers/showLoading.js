import { Loading } from 'quasar';

const showLoading = (message, detail, html) => {
  Loading.show({
    spinnerSize: 30,
    delay: 100, // Evita parpadeos si la navegación es rápida
    message: `<b>
                ${message}
              </b>
              <br/>
              <span
                class="text-amber text-italic"
              >
                ${detail}
              </span>`,
    html,
  });
};

export { showLoading };
