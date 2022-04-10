import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Field, Cell, CellGroup, Button, Icon, Form,Tabbar, TabbarItem,Search,
  List,NavBar,Uploader,Area,ActionSheet,Empty,Loading,PullRefresh,Step, Steps,
  AddressList,Popup,Toast,DatetimePicker } from 'vant';
import { Image as VanImage,Cascader  } from 'vant';
import axios from 'axios';
import { Popover } from 'vant';

import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Cascader );
Vue.use(DatetimePicker);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(AddressList);
Vue.use(Step);
Vue.use(Steps);
Vue.use(PullRefresh);
Vue.use(Loading);
Vue.use(Empty);
Vue.use(ActionSheet);
Vue.use(Area);
Vue.use(Uploader);
Vue.use(NavBar);
Vue.use(List);
Vue.use(Search);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);

Vue.config.productionTip = false

axios.defaults.baseURL="https://2a0e7195.cpolar.cn";
// axios.defaults.baseURL="http://116.205.137.0:80";
// axios.defaults.withCredentials= true;
axios.defaults.headers.common['Authorization'] = "";

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')


