const install = (Vue) => {
  Vue.directive('ripple-fx', {
    inserted(el, binding) {
      let options = {
        enableWhen: true,
        disableRedirect: false,
      };

      if (binding.value) {
        options = {
          ...options,
          ...binding.value,
        };
      }

      if (!options.enableWhen) {
        return;
      }

      el.addEventListener('click', (e) => {
        const parent = document.createElement('div');
        const href = el.getAttribute('href');

        if (href !== null && href !== undefined) {
          e.preventDefault();
        }

        el.insertAdjacentElement('afterbegin', parent);
        parent.classList.add('v-ripple-fx-ink-parent');

        const originalPosition = window.getComputedStyle(el).position;

        if (originalPosition !== 'relative') {
          el.setAttribute('data-v-ripple-fx-original-pos', originalPosition);
          el.style.position = 'relative';
        }

        if (parent.querySelectorAll('.v-ripple-fx-ink').length === 0) {
          const span = document.createElement('span');
          span.classList.add('v-ripple-fx-ink');
          parent.insertBefore(span, parent.firstChild);
        }

        const ink = parent.querySelectorAll('.v-ripple-fx-ink')[0];

        ink.classList.remove('animate');

        if (!ink.offsetHeight && !ink.offsetWidth) {
          const d = Math.max(parent.offsetHeight, parent.offsetWidth);
          ink.style.height = `${d}px`;
          ink.style.width = `${d}px`;
        }

        ink.style.left = `${e.offsetX - (ink.offsetWidth / 2)}px`;
        ink.style.top = `${e.offsetY - (ink.offsetHeight/ 2)}px`;
        ink.classList.add('animate');

        setTimeout(() => {
          if (
            href &&
            href !== '#' &&
            !options.disableRedirect
          ) {
            if (el.getAttribute('target') === '_blank') {
              window.open(href, '_blank');
            } else {
              location.href = el.getAttribute('href');
            }
          }

          if (el.getAttribute('data-v-ripple-fx-original-pos') && el.querySelectorAll('.v-ripple-fx-ink-parent').length === 1) {
            el.style.position = el.getAttribute('data-v-ripple-fx-original-pos');
            el.removeAttribute('data-v-ripple-fx-original-pos');
          }

          parent.remove();
          ink.remove();
        }, 300);
      });
    },
  });
};

export default install;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}