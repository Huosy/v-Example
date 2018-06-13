<template>
	<el-row class="el-main">
    <fieldset class="layui-field-title">
      <legend>{{currentName}}</legend>
    </fieldset>
		<el-form :model="form" :rules="rules" ref="form" label-width="100px">
			<el-row class="upload" v-show="(step1)">
				<croppa v-model="croppa" :width="getWiHi(true)" :height="getWiHi(false)" placeholder="" :file-size-limit="1024 * 1024 * 5" :prevent-white-space="true" initial-size="natural" initial-position="center" @loading-end="imgUrl = croppa.generateDataUrl()" @image-remove="imgUrl = null">
					<img slot="placeholder" src="../assets/user_default.jpg" >
				</croppa>
				<div class="rowcenter">
					<el-button @click="goNext(1)">下一步</el-button>
				</div>
			</el-row>
			<el-row class="page-part" v-show="(step2)">
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="fullname">
							<el-input v-model="form.fullname"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出生日期" prop="birthday">
							<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="gender">
							<el-radio v-model="form.gender" label="0">男</el-radio>
							<el-radio v-model="form.gender" label="1">女</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="籍贯" prop="nativePlaceId">
							<el-input v-model="form.nativePlaceId"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="民族" prop="nationId">
							<el-select v-model="form.nationId" placeholder="请选择">
								<el-option v-for="(item, index) in nationIdlist" :key="index" :label="item" :value="index"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="刑事记录" prop="haveCriminal">
							<el-radio v-model="form.haveCriminal" label="0">否</el-radio>
							<el-radio v-model="form.haveCriminal" label="1">是</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="身心状况" prop="health">
							<el-select v-model="form.health" placeholder="请选择">
								<el-option v-for="item in heathly" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="婚姻状况" prop="marriage">
							<el-select v-model="form.marriage" placeholder="请选择">
								<el-option v-for="item in marriages" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="传染病史" prop="haveMedical">
							<el-radio v-model="form.haveMedical" label="0">否</el-radio>
							<el-radio v-model="form.haveMedical" label="1">是</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="E-Mail" prop="email">
							<el-input type="email" v-model="form.email"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机" prop="mobile">
							<el-input type="tel" v-model="form.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="微信" prop="wechat">
							<el-input v-model="form.wechat"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="住寺天数" prop="visitdays">
							<el-input type="number" v-model="form.visitdays"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="户籍地址" prop="nativeAddr">
							<el-input v-model="form.nativeAddr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="identityCode">
							<el-input type="number" v-model="form.identityCode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="现在住址" prop="currentAddr">
							<el-input v-model="form.currentAddr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮编" prop="zipcode">
							<el-input type="number" v-model="form.zipcode"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="紧急联系人" prop="emergency1Name">
							<el-input v-model="form.emergency1Name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关系" prop="emergency1Relation">
							<el-select v-model="form.emergency1Relation" placeholder="请选择">
								<el-option v-for="item in emergency1Relations" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机" prop="emergency1Mobile">
							<el-input type="tel" v-model="form.emergency1Mobile"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="来寺途径" prop="templeway">
							<el-checkbox-group v-model="form.templeway">
								<el-checkbox v-for="item in templeways" :label="item.value" :key="item.label">{{item.label}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="性格优缺点" prop="selfDescribing">
							<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.selfDescribing"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(2)">上一步</el-button>
					<el-button @click="submitForm('form',2)" type="primary">下一步</el-button>
				</el-row>
			</el-row>
			<el-row class="page-part" v-show="(step3)">
				<el-row>
					<el-col :span="6">
						<el-form-item label="最高学历" prop="highestEducation">
							<el-select v-model="form.highestEducation" placeholder="请选择">
								<el-option v-for="item in edulevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="获得日期" prop="schoolDatestr">
							<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM" v-model="form.schoolDatestr" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学习专业" prop="specialtyId">
							<el-input v-model="form.specialtyId"></el-input>
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
								<el-option v-for="item in edulevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="时间">
							<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM" v-model="form.schoolDatestr" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学习专业">
							<el-input v-model="form.specialtyId"></el-input>
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
							<el-input v-model="form.companyName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="工作描述">
							<el-input v-model="form.companyInfo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="时间">
							<el-date-picker v-model="form.workDatestr" type="daterange" start-placeholder="开始日期" value-format="yyyy-MM" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"
								style="width:100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<el-form-item label="公司">
							<el-input v-model="form.companyName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="工作描述">
							<el-input v-model="form.companyInfo"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="时间">
							<el-date-picker v-model="form.workDatestr" type="daterange" value-format="yyyy-MM" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"
								style="width:100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<hr>
				<h3 class="Medium"></h3>
				<el-row>
					<el-col :span="6">
						<el-form-item label="外语语种">
							<el-select v-model="form.languages" placeholder="请选择">
								<el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
							<el-col :span="16">
								<el-checkbox-group v-model="form.languagesgood">
									<el-checkbox v-for="item in languagesgoods" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>

								</el-checkbox-group>
							</el-col>
							<el-col :span="8">
								<el-input v-model="form.languagesgoodo"></el-input>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="专长">
							<el-checkbox-group v-model="form.strongSuit">
								<el-checkbox v-for="items in strongSuits" :label="items" :key="items">{{items}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="工作优劣势">
							<el-input type="textarea" :rows="3" placeholder="请输入工作的优劣势" v-model="form.workDescribing"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(3)">上一步</el-button>
					<el-button @click="submitForm('form',3)" type="primary">下一步</el-button>
				</el-row>
			</el-row>
			<el-row class="page-part" v-show="(step4)">
				<el-row>
					<el-col :span="12">
						<el-form-item label="是否皈依">
							<el-radio v-model="form.buddhist" label="0">否</el-radio>
							<el-radio v-model="form.buddhist" label="1">是</el-radio>
						</el-form-item>
					</el-col>

					<el-col v-if="form.buddhist == 1" :span="12">
						<el-form-item label="龙泉寺皈依">
							<el-radio v-model="form.buddhistLqs" label="0">否</el-radio>
							<el-radio v-model="form.buddhistLqs" label="1">是</el-radio>
						</el-form-item>
					</el-col>
					<el-col v-if="form.buddhist == 1" :span="12">
						<el-form-item label="皈依日期">
							<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.buddhistDate" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col v-if="form.buddhist == 1" :span="12">
						<el-form-item label="其他宗教信仰">
							<el-input v-model="form.otherBelief"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<hr>
				<h3 class="Medium">学佛小组</h3>
				<el-row>
					<el-col :span="8">
						<el-form-item label="参加学佛小组">
							<el-radio v-model="form.joinGroup" label="0">否</el-radio>
							<el-radio v-model="form.joinGroup" label="1">是</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="学佛小组">
							<el-input v-model="form.groupName"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="讲师姓名">
							<el-input v-model="form.lecturers"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="参加时间">
							<el-input v-model="form.joinLong"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="参加频率">
							<el-input v-model="form.joinFreq"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="学习课程">
							<el-input v-model="form.courseName"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="承担经历">
							<el-input v-model="form.volExperience"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="form.joinGroup == 1">
						<el-form-item label="其他">
							<el-input v-model="form.otherExperience"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<h3 class="Medium">1、到本寺做义工的初心？</h3>
					<el-input type="textarea" :rows="3" v-model="form.firstThing"></el-input>
					<h3 class="Medium">2、受何人何事影响？</h3>
					<el-input type="textarea" :rows="3" v-model="form.secondThing"></el-input>
					<h3 class="Medium">3、个人承担意愿？</h3>
					<el-input type="textarea" :rows="3" v-model="form.thirdThing"></el-input>
				</el-row>
				<el-row class="rowcenter">
					<el-button @click="goBack(4)">上一步</el-button>
					<el-button @click="submitForm('form',4)" type="primary">提交</el-button>
				</el-row>
			</el-row>
		</el-form>
	</el-row>
</template>

<script>
export default {
  name: "el-main",
  data() {
    var isValidatePhone = (value, callback) => {
      var str = /^((13[0-9])|(14[5,7,9])|(15[^4])|(16[6])|(17[0,1,2,3,5,6,7,8])(18[0-9])|(19[8,9]))\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!str.test(value)) {
        callback(new Error("请输入正确手机号码"));
      }
    };
    var isValidateEmail = (value, callback) => {
      var str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!str.test(value)) {
        callback(new Error("请输入正确邮箱"));
      }
    };
    var isValidateZipcode = (value, callback) => {
      var str = /^\d{6}$/;
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else if (!str.test(value)) {
        callback(new Error("请输入正确邮编"));
      }
    };
    var isValidateIdcode = (value, callback) => {
      var str = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (value === "") {
        callback(new Error("请输入身份证号码"));
      } else if (!str.test(value)) {
        callback(new Error("请输入正确身份证号码"));
      }
    };
    return {
      rules: {
        fullname: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
				],
        birthday: [
          { type: 'date', required: true, message: "请填写出生生日", trigger: "blur" }
        ],
				gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
				nativePlaceId: [{ required: true, message: "请填写籍贯", trigger: "blur" }],
				nationId: [{ required: true, message: "请选择性别", trigger: "blur" }],
				haveCriminal: [{ required: true, message: "请选择刑事记录", trigger: "blur" }],
				health: [{ required: true, message: "请选择身心状况", trigger: "blur" }],
				marriage: [{ required: true, message: "请选择婚姻状况", trigger: "blur" }],
				haveMedical: [{ required: true, message: "请选择传染病史", trigger: "blur" }],
				email: [{ validator: isValidateZipcode, required: true, trigger: "blur" }]
      },
      croppa: {},
      dataUrl: "../assets/user_default.jpg",
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      imgUrl: null,
      currentName: "拍摄照片",
      currentNummer: 1,
      nationIdlist: [
        "汉族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "朝鲜族",
        "满族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛南族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "德昂族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族",
        "其他"
      ],
      heathly: [
        { value: "0", label: "良好" },
        { value: "1", label: "差" },
        { value: "2", label: "重大疾病" },
        { value: "3", label: "一般" },
        { value: "4", label: "抑郁" },
        { value: "5", label: "失眠" },
        { value: "6", label: "自卑敏感" }
      ],
      emergency1Relations: [
        { value: "0", label: "父母" },
        { value: "1", label: "夫妻" },
        { value: "2", label: "朋友" }
      ],
      templeways: [
        { value: "1", label: "论坛" },
        { value: "2", label: "微信公众号" },
        { value: "3", label: "微博" },
        { value: "4", label: "山上义工" },
        { value: "5", label: "山下居士" },
        { value: "6", label: "亲友" },
        { value: "99", label: "其他" }
      ],
      marriages: [
        { value: "0", label: "未婚" },
        { value: "1", label: "已婚" },
        { value: "2", label: "离异" }
      ],
      edulevels: [
        { value: "10", label: "博士" },
        { value: "20", label: "硕士" },
        { value: "30", label: "本科" },
        { value: "40", label: "大专" },
        { value: "50", label: "高中及以下" }
      ],
      language: [
        { value: "1", label: "英语" },
        { value: "2", label: "法语" },
        { value: "3", label: "德语" },
        { value: "4", label: "意大利" },
        { value: "5", label: "西班牙" }
      ],
      languagesgoods: [
        { value: "1", label: "听" },
        { value: "2", label: "说" },
        { value: "3", label: "读" },
        { value: "4", label: "写" },
        { value: "5", label: "笔译" },
        { value: "99", label: "其他" }
      ],
      strongSuits: [
        "文字编辑",
        "图书编目",
        "平面设计",
        "建筑设计",
        "动画制作",
        "广播主持",
        "茶道香道",
        "制作课件",
        "编写程序",
        "推拿药剂",
        "驾驶A本",
        "驾驶B本",
        "驾驶C本",
        "PS软件",
        "写代码",
        "公众号推广",
        "弱电音控设备",
        "水暖电工电焊",
        "摄像及视频剪辑",
        "其他"
      ],
      form: {
        photoUrl: {},
        fullname: "",
        birthday: "",
        gender: "",
        nativePlaceId: "",
        nationId: "",
        haveCriminal: "",
        health: "",
        marriage: "",
        haveMedical: "",
        email: "",
        mobile: "",
        wechat: "",
        visitdays: "",
        nativeAddr: "",
        identityCode: "",
        currentAddr: "",
        zipcode: "",
        emergency1Name: "",
        emergency1Relation: "",
        emergency1Mobile: "",
        templeway: [],
        selfDescribing: "",
        workDescribing: "",
        highestEducation: "",
        schoolDatestr: "",
        specialtyId: "",
        School1: "",
        School2: "",
        companyName: "", //公司名称
        companyInfo: "", //公司描述
        workDatestr: "", //工作时间
        languages: "", //外语语种
        languageslevel: "", //外语水平
        languagesgood: [], //外语擅长
        languagesgoodo: "", //外语擅长其他
        strongSuit: [], //专长
        workDescribing: "", //工作优劣势
        buddhist: "0", //是否皈依
        buddhistLqs: "", //龙泉寺皈依
        buddhistDate: "", //皈依时间
        otherBelief: "", //其他宗教信仰
        joinGroup: "0", //是否参加学佛小组  0否、1是
        groupName: "", //学佛小组
        lecturers: "", //讲师姓名
        joinLong: "", //参加学佛小组多久
        joinFreq: "", //参加频率
        courseName: "", //学习课程
        volExperience: "", //义工承担经历
        otherExperience: "", //其他
        firstThing: "",
        thirdThing: "",
        thirdThing: "",
        photoUrl: null
      }
    };
  },
  methods: {
		getWiHi(wh) {
			let WinWidth = window.screen.width;
			if(wh){
				return WinWidth * 0.45;
			}else{
				return WinWidth * 0.6;
			}
		},
    // 下一步操作
    goNext(itemindex) {
      if (itemindex == 1) {
				if(this.imgUrl != null){
					this.step1 = false;
					this.step2 = true;
					this.currentNummer = 2;
					this.currentName = "基本资料";
				}else{
					this.$notify.error({
						title: '错误',
						message: '请先上传照片'
					});
				}
      } else if (itemindex == 2) {
        this.step2 = false;
        this.step3 = true;
        this.currentNummer = 3;
        this.currentName = "专业特长";
      } else if (itemindex == 3) {
        this.step3 = false;
        this.step4 = true;
        this.currentNummer = 4;
        this.currentName = "学佛信息";
      }
    },
    // 上一步操作
    goBack(itemindex) {
      if (itemindex == 4) {
        this.step4 = false;
        this.step3 = true;
        this.currentNummer = 3;
        this.currentName = "专业特长";
      } else if (itemindex == 3) {
        this.step3 = false;
        this.step2 = true;
        this.currentNummer = 2;
        this.currentName = "基本资料";
      } else if (itemindex == 2) {
        this.step2 = false;
        this.step1 = true;
        this.currentNummer = 1;
        this.currentName = "拍摄照片";
      }
    },
    submitForm: function(form, itemindex) {
      var Self = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (itemindex != 4) {
            Self.goNext(itemindex);
          } else {
            var formdata = this.form;
            console.log(formdata);
            $.ajax({
              type: "POST",
              url: "/ketang/volunteerController.do?doAddPad",
              data: { idlist: formdata },
              dataType: "json",
              success: function(res) {},
              error: function(res) {}
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.el-main{
	overflow: hidden;
}
.page-field {
  width: 100%;
}
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
  background-color: #fff;
}
.cha > img {
  display: block;
  width: 4.5rem;
}
/* 点击上传 */
.Localalbum {
  position: relative;
}
.Localalbum input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  display: block;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.layui-btn-box {
  margin-top: 0.5rem;
}
.page-title {
  font-size: 0.4rem;
  margin: 0.5rem auto;
  text-align: center;
  display: block;
  line-height: 1;
}
.Medium {
  text-align: left;
  font-size: 18px;
  padding-top: 0.3rem;
  padding-bottom: 0.15rem;
}
.rowcenter {
  text-align: center;
}
.layui-field-title{
	margin: 10px 0 20px;
	padding: 0;
	border-width:1px 0 0;
	border-style: solid;
	border-color: #e6e6e6;
	margin-top: .3rem;
	text-align: center;
}
.layui-field-title legend{
	margin-left: 20px;
	padding: 0 10px;
	font-size: .6rem;
	font-weight: 400;
}
</style>