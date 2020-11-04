import NProgress from 'nprogress';

require('./src/styles/global.css')
require(`katex/dist/katex.min.css`)

export const onClientEntry = () => {
  const options = {
    color: '#1890ff',
    showSpinner: false,
  };

  const styles = `
    #nprogress {
     pointer-events: none;
     position: fixed;
     z-index: 1031;
    }
    #nprogress .bar {
      background: ${options.color};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${options.color}, 0 0 5px ${options.color};
      opacity: 1.0;
      z-index: 1031;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
  `;

  const node = document.createElement('style');
  node.id = 'nprogress-styles';
  node.innerHTML = styles;
  document.head.appendChild(node);

  NProgress.configure(options);
};

export const onPreRouteUpdate = () => {
  NProgress.start();
  NProgress.set(0.6);
};

export const onRouteUpdate = () => {
  NProgress.done();
};

export const shouldUpdateScroll = () => true;