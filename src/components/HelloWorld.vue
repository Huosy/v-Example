<template>
  <div class="page-field">
    <div class="upload">
      <!-- 图片展示 -->
      <div class="cha">
        <!-- 删除icon -->
        <div class="del" v-show="(imgUrl)">
          <i class="el-icon-delete" @click="delImg"></i>
        </div>
        <img class="filimage" width="100%" :src="imgUrl">
      </div>
      <!-- 图片上传控件 -->
      <div class="load" v-show="(!imgUrl)">
        <input type="file" name="" id="uploadbtn" accept="image/*" @change="uploadIMG">
      </div>
    </div>
    <div class="page-part">
      <mt-field label="姓　名" placeholder="请输入姓名" :attr="{ maxlength: 10 }"></mt-field>
      <mt-field label="邮　箱" placeholder="请输入邮箱" type="email"></mt-field>
      <mt-field label="密　码" placeholder="请输入密码" type="password"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
      <mt-field label="生　日" placeholder="请输入生日" type="date"></mt-field>
      <mt-field label="介　绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-field',
  props: ["uploadUrl"],
  data() {
    return {
      picavalue: "",
      imgUrl: null,
      isEnlargeImage: false
    };
  },
  methods: {
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      console.log(this.picavalue.size / 1024);
      if (this.picavalue.size / 1024 > 5000) {
        this.$message({
          message: "图片过大不支持上传",
          type: "warning"
        });
      } else {
        this.imgPreview(this.picavalue);
      }
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          console.log("********未压缩前的图片大小********");
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img);
            self.imgUrl = result;

            let blob = self.dataURItoBlob(data);

            console.log("*******base64转blob对象******");
            console.log(blob);

            var formData = new FormData();
            formData.append("file", blob);
            console.log("********将blob对象转成formData对象********");
            console.log(formData.get("file"));
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            // 发送请求;
            self.axios.post(self.uploadUrl.url, formData, config).then(res => {
              // console.log(res);
              // console.log(res.data.data.resultftphost)
              // console.log(res.data.data.resulturl)
              // this.$emit('')
              if (res.data.code == 200) {
                self.$emit(
                  "getImgsrc",
                  res.data.data.resultftphost,
                  res.data.data.resulturl
                );
              } else {
                self.$message({
                  message: "图片上传失败，请重试",
                  type: "warning"
                });
              }
            });
          };
        };
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      console.log("*******压缩后的图片大小*******");
      console.log(ndata)
      console.log(ndata.length);
      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    //删除事件
    delImg() {
      this.imgUrl = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-field{width: 10rem;}
.upload {
  position: relative;
  width: 8rem;
  margin: 0 auto 1rem;
  height: auto;
}
/* 图片展示 */
.cha {
  position: relative;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  box-sizing: border-box;
}
.del {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  background-color: #41b883;
}
.del i{
  color: #FFF;
  display: block;
  line-height: 1rem;
  font-size: .6rem;
}
/* 鼠标放上时显示删除 */
.cha:hover .del {
  opacity: 1;
}
.cha>.filimage{
  display: block;
  width: 100%;
}
/* 点击上传 */
.load {
  position: absolute;
  top: 0;
  left: 0;
  width: 7.90rem;
  height: 7.90rem;
  border: .05rem dashed #CCC;
}
.load input {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.load::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-3rem);
  width: .02rem;
  height: 6rem;
  border-right: 1px solid #CCC;
}
.load:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-3rem);
  width: 6rem;
  height: 1px;
  border-top: 1px solid #CCC;
}
</style>