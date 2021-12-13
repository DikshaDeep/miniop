/**
 * @author Raman kant
 */

const ENV = {
  DEV: {
    TYPE: 1,
    API_HOST: 'https://mini.natraj.shop/',
    IS_LIVE: false,
  },
  LIVE: {
    TYPE: 3,
    API_HOST: 'https://mini.natraj.shop/',
    IS_LIVE: true,
  },
};

export default ENV.DEV;
