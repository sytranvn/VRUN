import { theme } from 'antd';

const getThemeOptions = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgLayout: '#fff',
    fontFamily: 'inherit',
  },

  /* Custom component theme */
  components: {
  },
});

export default getThemeOptions;
