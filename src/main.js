import Vue from 'vue'
import App from './App.vue'
import { Container, Button, Header, Main, Form, FormItem, Input, InputNumber, Alert, Upload, Progress, Dialog, MessageBox, Message, Notification, RadioGroup, Radio, RadioButton } from 'element-ui';
import './styles/index.css'

Vue.config.productionTip = false

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Container.name, Container);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Alert.name, Alert);
Vue.component(Upload.name, Upload);
Vue.component(Progress.name, Progress);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Radio.name, Radio);
Vue.component(RadioButton.name, RadioButton);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Dialog.name, Dialog);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

new Vue({
  render: h => h(App),
}).$mount('#app')


