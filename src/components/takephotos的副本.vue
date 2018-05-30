<template>
	<el-row class="el-main">
		<el-form ref="form" :model="form" label-width="100px">
			<el-row class="upload" v-show="(step1)">
				<!-- 图片展示 -->
				<div class="cha">
					<img v-show="(!imgUrl)" class="filimage" src="../assets/user_default.jpg">
					<img class="uploadimgbox" v-show="(imgUrl)" :src="imgUrl">
				</div>
				<div class="layui-btn-box rowcenter">
					<el-button class="Localalbum" type="primary"><span v-show="(!imgUrl)">上传照片</span><span v-show="(imgUrl)">重新上传</span><input type="file" accept="image/*" @change="uploadIMG"></el-button>
					<el-button v-show="(imgUrl)" @click="goNext(1)">下一步</el-button>
				</div>
			</el-row>
			<el-row class="page-part" v-show="(step2)">
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名">
							<el-input v-model="form.fullname"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出生日期">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<el-radio v-model="form.gender" label="0">男</el-radio>
							<el-radio v-model="form.gender" label="1">女</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="籍贯">
							<el-input v-model="form.nativePlaceId"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="民族">
							<el-select v-model="form.nationId" placeholder="请选择">
								<el-option v-for="(item, index) in form.nationIdlist" :key="index" :label="item" :value="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="刑事记录">
							<el-radio v-model="form.haveCriminal" label="0">否</el-radio>
							<el-radio v-model="form.haveCriminal" label="1">是</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身心状况">
							<el-select v-model="form.health" placeholder="请选择">
								<el-option v-for="item in form.heathly" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="婚姻状况">
							<el-select v-model="form.marriage" placeholder="请选择">
								<el-option v-for="item in form.marriages" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="传染病史">
							<el-radio v-model="form.haveMedical" label="0">否</el-radio>
							<el-radio v-model="form.haveMedical" label="1">是</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="E-Mail">
							<el-input v-model="form.email"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机">
							<el-input v-model="form.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="微信">
							<el-input v-model="form.wechat"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="住寺天数">
							<el-input v-model="form.visitdays"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="户籍地址">
							<el-input v-model="form.nativeAddr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号">
							<el-input v-model="form.identityCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="现在住址">
							<el-input v-model="form.currentAddr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮编">
							<el-input v-model="form.zipcode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="紧急联系人">
							<el-input v-model="form.emerContact"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关系">
							<el-select v-model="form.emergency1Relation" placeholder="请选择">
								<el-option v-for="item in form.emergency1Relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机">
							<el-input v-model="form.Cellphone2"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="来寺途径">
							<el-select v-model="form.templeway" placeholder="请选择">
								<el-option v-for="item in form.templeways" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="性格优缺点">
							<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.character"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(2)">上一步</el-button>
					<el-button @click="goNext(2)" type="primary">下一步</el-button>
				</el-row>
			</el-row>
			<el-row class="page-part" v-show="(step3)">
				<el-row>
					<el-col :span="6">
						<el-form-item label="最高学历">
							<el-select v-model="form.edulevel" placeholder="请选择">
								<el-option v-for="item in form.edulevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="获得日期">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.obtainedDate1" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学习专业">
							<el-input v-model="form.Learnmajor1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="毕业学校">
							<el-input v-model="form.School1"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="其他学历">
							<el-select v-model="form.edulevel2" placeholder="请选择">
								<el-option v-for="item in form.edulevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="获得日期">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.obtainedDate2" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学习专业">
							<el-input v-model="form.Learnmajor2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="毕业学校">
							<el-input v-model="form.School2"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<hr>
				<h3 class="Medium">工作经历：</h3>
				<el-row>
					<el-col :span="7">
						<el-form-item label="公司">
							<el-input v-model="form.Companyname1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行业">
							<el-input v-model="form.Industry1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="时间">
							<el-date-picker v-model="form.period1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" style="width:100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<el-form-item label="公司">
							<el-input v-model="form.Companyname2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="行业">
							<el-input v-model="form.Industry2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="时间">
							<el-date-picker v-model="form.period2" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" style="width:100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<hr>
				<h3 class="Medium"></h3>
				<el-row>
					<el-col :span="6">
						<el-form-item label="外语语种">
							<el-select v-model="form.language" placeholder="请选择">
								<el-option v-for="item in form.languages" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="水平">
							<el-radio v-model="form.languageslevel" label="0">专业</el-radio>
							<el-radio v-model="form.languageslevel" label="1">优良</el-radio>
							<el-radio v-model="form.languageslevel" label="2">一般</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="外语擅长">
							<el-checkbox-group v-model="form.langoodat">
								<el-checkbox v-for="item in form.langoodats" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
							</el-checkbox-group>
							<el-input v-model="form.langoodatOther"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="专长">
							<el-radio v-model="form.expertise" label="0">图书编辑</el-radio>
							<el-radio v-model="form.expertise" label="1">文字编辑</el-radio>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="工作优劣势">
							<el-input type="textarea" :rows="3" placeholder="请输入工作的优劣势" v-model="form.workQuality"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(3)">上一步</el-button>
					<el-button @click="goNext(3)" type="primary">下一步</el-button>
				</el-row>
			</el-row>
			<el-row class="page-part" v-show="(step4)">
				<el-row>
					<el-col :span="12">
						<el-form-item label="是否皈依">
							<el-radio v-model="form.isRelyon" label="0">否</el-radio>
							<el-radio v-model="form.isRelyon" label="1">是</el-radio>
						</el-form-item>
					</el-col>

					<el-col v-if="form.isRelyon == 1" :span="12">
						<el-form-item label="皈依日期">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.conversionDate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col v-if="form.isRelyon == 1" :span="12">
						<el-form-item label="其他宗教信仰">
							<el-input v-model="form.religion"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<hr>
				<h3 class="Medium">学佛小组</h3>
				<el-row>
					<el-col :span="12">
						<el-form-item label="学佛小组">
							<el-input v-model="form.learnBuddhaname"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="讲师姓名">
							<el-input v-model="form.lecturerName"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="参加时间">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.joinTime" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="参加频率">
							<el-input v-model="form.joinHz"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="学习课程">
							<el-input v-model="form.LearnCourses"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="承担经历">
							<el-input v-model="form.experience"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="其他">
							<el-input v-model="form.others"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<h3 class="Medium">1、到本寺做义工的初心？2、受何人何事影响？3、个人承担意愿？</h3>
					<el-input type="textarea" :rows="3" v-model="form.otherContent"></el-input>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(4)">上一步</el-button>
					<el-button type="primary">提交</el-button>
				</el-row>
			</el-row>
		</el-form>
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
          			fullname: '',
					gender: '',
          			birthday: '',
					nativePlaceId: '',
					nationId: '',
					nationIdlist: ['汉族','蒙古族','回族','藏族','维吾尔族','苗族','彝族','壮族','布依族','朝鲜族','满族','侗族','瑶族','白族','土家族','哈尼族','哈萨克族','傣族','黎族','傈僳族','佤族','畲族','高山族','拉祜族','水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','达斡尔族','仫佬族','羌族','布朗族','撒拉族','毛南族','仡佬族','锡伯族','阿昌族','普米族','塔吉克族','怒族','乌孜别克族','俄罗斯族','鄂温克族','德昂族','保安族','裕固族','京族','塔塔尔族','独龙族','鄂伦春族','赫哲族','门巴族','珞巴族','基诺族','其他'],
					haveCriminal: '',
					health: '',
					heathly: [{
						value: '0',
						label: '良好'
					}, {
						value: '1',
						label: '差'
					}, {
						value: '2',
						label: '重大疾病'
					}, {
						value: '3',
						label: '一般'
					}, {
						value: '4',
						label: '抑郁'
					}, {
						value: '5',
						label: '失眠'
					}, {
						value: '6',
						label: '自卑敏感'
					}],
					marriage: '',
					marriages: [{ value: '0', label: '未婚' }, { value: '1', label: '已婚' }, { value: '2', label: '离异' }],
					haveMedical: '',
					email: '',
					mobile: '',
					wechat: '',
					visitdays: '',
					nativeAddr: '',
					identityCode: '',
					currentAddr: '',
					zipcode: '',
					emergency1Name: '',
					emergency1Relation: '',
					emergency1Relations: [{
						value: '0',
						label: '父子（女）'
					}, {
						value: '1',
						label: '母子（女）'
					}, {
						value: '2',
						label: '亲戚'
					}, {
						value: '3',
						label: '朋友'
					}, {
						value: '4',
						label: '夫妻'
					}],
					emergency1Mobile: '',
					templeway: '',
					templeways: [{ value: '1', label: '论坛' }, { value: '2', label: '微信公众号' }, { value: '3', label: '微博' }, { value: '4', label: '山上义工' }, { value: '5', label: '山下居士' }, {value: '6',label: '亲友'}, {value: '99',label: '其他'}],
					character: '',
					edulevel: '',
					edulevel2: '',
					edulevels: [{value: '10',label: '博士'}, {value: '20',label: '硕士'}, {value: '30',label: '本科'}, {value: '40',label: '大专'}, {value: '50',label: '高中及以下'}],
					obtainedDate1: '',
					Learnmajor1: '',
					School1: '',
					obtainedDate2: '',
					Learnmajor2: '',
					School2: '',
					Companyname1: '',
					Industry1: '',
					period1: [],
					Companyname2: '',
					Industry2: '',
					period2: [],
					language: '',
					languages: [{
						value: '1',
						label: '英语'
					}, {
						value: '2',
						label: '法语'
					}, {
						value: '3',
						label: '德语'
					}, {
						value: '4',
						label: '意大利'
					}, {
						value: '5',
						label: '西班牙'
					}],
					languageslevel: '',
					languagesgood: [],
					languagesgoods: [{
						value: '1',
						label: '听'
					},{
						value: '2',
						label: '说'
					},{
						value: '3',
						label: '读'
					},{
						value: '4',
						label: '写'
					},{
						value: '5',
						label: '笔译'
					},{
						value: '99',
						label: '其他'
					}],
					langoodatOther: '',
					expertise: '',
					workQuality: '',
					isRelyon: '0',
					conversionDate: '',
					religion: '',
					learnBuddhaname: '',
					lecturerName: '',
					joinTime: ''
        		}
			};
		},
		methods: {
			onYearChange(picker, values) {
				this.year = values[0];
			},
			uploadIMG(e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.picavalue = files[0];
				// console.log(this.picavalue.size / 1024);
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

							// 上传图片发送请求;
							/*
							let config = {
								headers: { "Content-Type": "multipart/form-data" }
							};
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
				return ndata;
			},
			/*
			 * base64转成bolb对象
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
			*/
			// 下一步操作
			goNext(itemindex) {
				if(itemindex == 1){
					this.step1 = false;
					this.step2 = true;
					this.currentNummer = 2;
					this.currentName = "基本资料";
				}else if(itemindex == 2){
					this.step2 = false;
					this.step3 = true;
					this.currentNummer = 3;
					this.currentName = "专业特长";
				}else if(itemindex == 3){
					this.step3 = false;
					this.step4 = true;
					this.currentNummer = 4;
					this.currentName = "学佛信息";
				}
			},
			// 上一步操作
			goBack(itemindex) {
				if(itemindex == 4){
					this.step4 = false;
					this.step3 = true;
					this.currentNummer = 3;
					this.currentName = "专业特长";
				}else if(itemindex == 3){
					this.step3 = false;
					this.step2 = true;
					this.currentNummer = 2;
					this.currentName = "基本资料";
				}else if(itemindex == 2){
					this.step2 = false;
					this.step1 = true;
					this.currentNummer = 1;
					this.currentName = "拍摄照片";
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
	.Medium{
		text-align: left;
		font-size: 18px;
		padding-top: .3rem;
		padding-bottom: .15rem;
	}
	.rowcenter{
		text-align: center;
	}
</style>