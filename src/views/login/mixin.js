import routes from '@/router/routes'

export default {
  data() {
    return {
      loading: false,
      // 当前使用的 element-plus（^1.0.2-beta.48） 表单绑定数据放在 setup 中会有 bug
      ruleForm: {
        userName: '',
        phone: '',
        email: '',
        password: '',
        checkPass: ''
      },
      //验证规则
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, message: '用户名长度最少4位', trigger: 'blur' },
          { max: 10, message: '用户名长度最多10位', trigger: 'blur' },
          { validator: this.validateName, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: this.validatePhone, trigger: 'blur' }
        ],
        email: { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' },
          { max: 18, message: '密码长度最多18位', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' },
          { max: 18, message: '密码长度最多18位', trigger: 'blur' },
          { validator: this.validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //校验用户名
    validateName(rule, value, callback) {
      const reg = /^\w*$/;
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('用户名只能是英文、数字和下划线'))
      }
    },
    //校验手机
    validatePhone(rule, value, callback) {
      const reg = /^(13[0-9]|14[5-8]|15[^4]|16[56]|17[0-9]|18[0-9]|19[189])\d{8}$/;
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的手机号码'))
      }
    },
    //检验密码
    validateCheckPass(rule, value, callback) {
      if (this.ruleForm.password != value) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    //获取菜单
    getMenu(){
      sessionStorage.menu = JSON.stringify(routes);
    },
    //跳转页面
    goPage(redirect=null){
      this.getMenu();
      this.$router.push(redirect||'/');
    }
  },
  mounted(){
    if(sessionStorage.userName && sessionStorage.menu){
      this.goPage();
    }
  }
}
