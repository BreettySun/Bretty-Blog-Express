<template>
  <div :style="{
    height: windowHeight < 550 ? 550 : windowHeight - 1 + 'px',
    backgroundColor: '#475164'
  }">
    <div :style="{ height: windowHeight < 550 ? 0 : windowHeight - 650 + 'px' }"></div>
    <div class="cont">
      <div class="form sign-in">
        <h2>Welcome back,</h2>
        <div style="height: 10px;"></div>
        <label>
          <span>Name</span>
          <input type="text" v-model="nameSignIn" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" v-model="passwordSignIn" />
        </label>
        <!-- <p class="forgot-pass">Forgot password?</p> -->
        <div style="height: 30px;"></div>
        <button type="button" class="submit" @click="handleSignIn">Sign In</button>
        <button type="button" class="fb-btn">Connect with <span>WeChat</span></button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div style="height: 40px;"></div>
          <div class="img__text m--up">
            <div style="height: 40px;"></div>
            <h2>New here?</h2>
            <p>Sign up and discover a different <span style="font-size: 22px;">me!</span></p>
          </div>
          <div class="img__text m--in">
            <div style="height: 40px;"></div>
            <h2>You know me?</h2>
            <p>If you already has an account, just sign in. I've missed &nbsp;<span style="font-size: 20px;">you!</span>
            </p>
          </div>
          <div class="img__btn" @click="switchSignUpIn">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>Time to feel like home,</h2>
          <label>
            <span>Name</span>
            <input type="text" v-model="nameSignUp" />
          </label>
          <label>
            <span>NiCKNAME</span>
            <input type="email" v-model="emailSignUp" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" v-model="passwordSignUp" />
          </label>
          <button type="button" class="submit" @click="handleSignUp">SIGN UP</button>
          <button type="button" class="fb-btn">Join with <span>WeChat</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '../../request/index.js'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue';

const router = useRouter()

const windowHeight = window.innerHeight

const switchSignUpIn = () => {
  document.querySelector('.cont').classList.toggle('s--signup');
}

const nameSignIn = ref('')
const passwordSignIn = ref('')
const handleSignIn = () => http.get('/users', {
  params: {
    username: nameSignIn.value,
    password: passwordSignIn.value
  }
}).then((res) => {
  const token = res.data.token
  const uid = res.data.userInfo.uid
  const headImg = res.data.userInfo.headImg
  if (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('uid', uid)
    localStorage.setItem('headImg', headImg)
    router.push('/backstage')
  }
}).catch((err) => {
  passwordSignIn.value = ''
  Message.error("用户名或密码错误")
})

const nameSignUp = ref('')
const emailSignUp = ref('')
const passwordSignUp = ref('')
const handleSignUp = async () => {
  console.log(nameSignUp.value, emailSignUp.value, passwordSignUp.value)
  const res = await http.post('/users', {
    username: nameSignUp.value,
    // email: emailSignUp.value,
    password: passwordSignUp.value,
    nickname: nameSignUp.value,
    headImg: ''
  })
  console.log(res);
}
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.cont {
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  margin: auto;
  background: #fff;
  border-radius: 25px;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;
  margin-top: 40px;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: transform 1.2s ease-in-out;
}

.cont.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  /* background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg"); */
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201909%2F30%2F20190930024017_xhotp.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686756075&t=cdc5a25ee46f1632d602b3500a03f819");
  background-size: cover;
  transition: transform 1.2s ease-in-out;
}

.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.cont.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;
}

.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

.img__text p {
  font-size: 14px;
  line-height: 1.5;
}

.cont.s--signup .img__text.m--up {
  transform: translateX(520px);
}

.img__text.m--in {
  transform: translateX(-520px);
}

.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}

.img__btn span.m--in {
  transform: translateY(-72px);
}

.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}

.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #acacac;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #acacac;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}

.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}

.cont.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 1.2s;
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  transform: translate3d(-900px, 0, 0);
}

.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;
}

.icon-link img {
  width: 100%;
  vertical-align: top;
}

.icon-link--twitter {
  left: auto;
  right: 5px;
}
</style>