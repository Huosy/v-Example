<template>
	<el-row class="el-main">
		<el-row class="upload" v-show="(step1)">
			<!-- 图片展示 -->
			<div class="cha">
				<img v-show="(!imgUrl)" class="filimage" src="../assets/user_default.jpg">
				<img class="uploadimgbox" v-show="(imgUrl)" :src="imgUrl">
			</div>
			<div class="layui-btn-box">
				<el-button class="Localalbum" type="primary"><span v-show="(!imgUrl)">上传照片</span><span v-show="(imgUrl)">重新上传</span><input type="file" accept="image/*" @change="uploadIMG"></el-button>
				<el-button v-show="(imgUrl)" @click="Clickstepone">下一步</el-button>
			</div>
		</el-row>
		<el-row class="page-part" v-show="(step2)">
			<el-form ref="form" :model="form" label-width="80px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<el-radio v-model="form.sex" label="1">男</el-radio>
							<el-radio v-model="form.sex" label="0">女</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出生日期">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="籍贯">
							<el-input v-model="form.origin"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="民族">
							<el-input v-model="form.ethnic"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="刑事记录">
							<el-radio v-model="form.criminal" label="1">无</el-radio>
							<el-radio v-model="form.criminal" label="0">有</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身心状况">
							<el-select v-model="form.health" clearable placeholder="请选择">
								<el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="婚姻状况">
							<el-radio v-model="form.marriage" label="0">未婚</el-radio>
							<el-radio v-model="form.marriage" label="1">已婚</el-radio>
							<el-radio v-model="form.marriage" label="2">离异</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="传染病史">
							<el-radio v-model="form.disease" label="1">无</el-radio>
							<el-radio v-model="form.disease" label="0">有</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button type="primary">立即创建</el-button>
					<el-button>下一步</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row class="page-part" v-show="(step3)">

		</el-row>
		<el-row class="page-part" v-show="(step4)">

		</el-row>
	</el-row>
</template>

<script>
	export default {
		name: 'el-main',
		props: ["uploadUrl"],
		data() {
			return {
				active: 0,
				picavalue: "",
				imgUrl: null,
				step1: true,
				step2: false,
				step3: false,
				step4: false,
				isEnlargeImage: false,
				currentName: "拍摄照片",
				currentNummer: 1,
				form: {
          name: '',
					sex: '0',
          date: '',
					origin: '',
					ethnic: '',
					criminal: '',
					health: '',
					marriage: '0',
					options: [{
						value: '选项1',
						label: '黄金糕'
					}, {
						value: '选项2',
						label: '双皮奶'
					}, {
						value: '选项3',
						label: '蚵仔煎'
					}, {
						value: '选项4',
						label: '龙须面'
					}, {
						value: '选项5',
						label: '北京烤鸭'
					}]
        }
			};
		},
		methods: {
			uploadIMG(e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.picavalue = files[0];
				console.log(this.picavalue.size / 1024);
				if (this.picavalue.size / 1024 > 1024 * 5) {
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

							// 上传图片发送请求;
							/*
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
							*/
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
				// console.log("*******压缩后的图片大小*******");
				// console.log(ndata)
				// console.log(ndata.length);
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
			// 下一步操作
			Clickstepone() {
				if(this.imgUrl != null){
					this.step1 = false;
					this.step2 = true;
					this.currentNummer = 2;
					this.currentName = "基本资料";
				}
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
	.page-field{width: 100%;}
	.upload {
		position: relative;
		width: 4.5rem;
		margin: 0 auto 1rem;
		height: auto;
	}
	/* 图片展示 */
	.cha {
		position: relative;
		width: 4.5rem;
		height: 6rem;
		overflow: hidden;
		background-color:#FFF;
	}
	.cha > img{
		display: block;
		width: 4.5rem;
	}
	/* 点击上传 */
	.Localalbum{
		position:relative;
	}
	.Localalbum input{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		display: block;
		opacity: 0;
		width: 100%;
		height: 100%;
	}
	.layui-btn-box{
		margin-top: .5rem;
	}
	.page-title{
		font-size: .4rem;
    margin: .5rem auto;
    text-align: center;
    display: block;
    line-height: 1;
	}
</style>