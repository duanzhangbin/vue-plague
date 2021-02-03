<template>

    <el-form label-position='left' hide-required-asterisk :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-divider></el-divider>
        <div class="block">
            <el-image :src="require('../assets/header.png')"></el-image>
        </div>
        <el-divider></el-divider>
        <el-form-item label="工号" prop="workCode">
        </el-form-item>
        <el-autocomplete
                v-model="ruleForm.workCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入您的工号"
                @select="handleWorkCode" style="width: 100%"
        ></el-autocomplete>
        <el-form-item label="姓名" prop="name">
        </el-form-item>
        <el-input v-model="ruleForm.name" placeholder="请输入您的姓名" style="width: 100%" clearable></el-input>
        <div v-show="false">
            <el-form-item label="部门" prop="depart">
            </el-form-item>
            <el-input v-model="ruleForm.depart" placeholder="请选择您所在部门" style="width: 100%" clearable readonly></el-input>
        </div>
        <el-form-item label="手机" prop="mobile">
        </el-form-item>
        <el-input v-model="ruleForm.mobile" placeholder="请输入您的手机号" style="width: 100%" clearable></el-input>
        <el-form-item label="籍贯" prop="regionChoose">
        </el-form-item>
        <el-cascader
                v-model="ruleForm.regionChoose"
                :options="regionOptions"
                @change="regionChange" style="width: 100%"></el-cascader>
        <el-form-item label="过年地与籍贯是否一致" prop="regionState">
        </el-form-item>
        <el-radio-group v-model="ruleForm.regionState">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
        </el-radio-group>
        <div v-if="ruleForm.regionState == '否'">
            <el-form-item label="过年所在地" prop="livePlaceChoose" >
            </el-form-item>
            <el-cascader
                    v-model="ruleForm.livePlaceChoose"
                    :options="regionOptions"
                    @change="livePlaceChange" style="width: 100%"></el-cascader>
        </div>
        <el-form-item label="假期行程" prop="travelPlan">
        </el-form-item>
        <el-input v-model="ruleForm.travelPlan" style="width: 100%"></el-input>
        <el-form-item label="身体状态" prop="status">
        </el-form-item>
        <el-radio-group v-model="ruleForm.status">
            <el-radio label="正常"></el-radio>
            <el-radio label="异常"></el-radio>
        </el-radio-group>
        <div v-if="ruleForm.status == '异常'">
            <el-form-item label="身体状态" prop="health">
            </el-form-item>
            <el-checkbox-group v-model="ruleForm.healthGroup" @change="handleHealth">
                <el-checkbox label="咳嗽" name="health"></el-checkbox>
                <el-checkbox label="感冒" name="health"></el-checkbox>
                <el-checkbox label="发烧" name="health"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div v-if="ruleForm.status == '异常'">
            <el-form-item label="是否途径或接触过中高风险地区" prop="isHighPass">
            </el-form-item>
            <el-radio-group v-model="ruleForm.isHighPass">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
            </el-radio-group>
        </div>
        <div v-if="ruleForm.status == '异常'">
            <el-form-item label="是否居家观察\隔离" prop="isolation">
            </el-form-item>
            <el-radio-group v-model="ruleForm.isolation">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
            </el-radio-group>
        </div>
        <el-form-item label="返厂日期" prop="returnDate">
        </el-form-item>
        <el-date-picker type="date" placeholder="选择返厂日期" v-model="ruleForm.returnDate" style="width: 100%;"></el-date-picker>
        <el-form-item label="返厂方式" prop="transport">
        </el-form-item>
        <el-radio-group v-model="ruleForm.transport">
            <el-radio label="自驾"></el-radio>
            <el-radio label="公共交通"></el-radio>
        </el-radio-group>
        <el-form-item label="备注" prop="remark">
        </el-form-item>
        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        <el-form-item label="填写日期" prop="fillDate">
        </el-form-item>
        <el-date-picker type="date" placeholder="选择填写日期" v-model="ruleForm.fillDate" style="width: 100%;"></el-date-picker>
        <el-form-item></el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
</template>

<script>
    export default {
        name: "main",
        data() {
            return {
                ruleForm: {
                    workCode: '',
                    name: '',
                    depart: '',
                    mobile: '',
                    regionChoose: [],
                    region: '',
                    regionState: '',
                    livePlaceChoose: [],
                    livePlace: '',
                    travelPlan: '',
                    status: '',
                    healthGroup: [],
                    health: '',
                    isHighPass: '',
                    isolation: '',
                    returnDate: '',
                    transport: '',
                    remark: '',
                    fillDate: new Date(),
                },
                rules: {
                    workCode: [
                        { required: true, message: '请输入工号', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
/*                    depart: [
                        { required: true, message: '请选择所在部门', trigger: 'blur' }
                    ],*/
                    /*mobile: [
                        {min:11, max: 11, required: true, message: '请输入手机号', trigger: 'blur' }
                    ],*/
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
/*                        {
                            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                            message: '请输入正确的手机号码'
                        }*/
                    ],
                    regionChoose: [
                        { type: 'array', required: true, message: '请选择籍贯', trigger: 'change' }
                    ],
                    regionState: [
                        { required: true, message: '请选择过年所在地是否与籍贯一致', trigger: 'change' }
                    ],
                    travelPlan: [
                        { required: true, message: '请输入假期行程', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择身体是否异常', trigger: 'change' }
                    ],
                    returnDate: [
                        { type: 'date', required: true, message: '请选择返厂日期', trigger: 'change' }
                    ],
                    transport: [
                        { required: true, message: '请选择返厂方式', trigger: 'change' }
                    ],
                    fillDate: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    healthGroup: [
                        { type: 'array', required: true, message: '请至少选择一个身体状态', trigger: 'change' }
                    ]
                },
                regionOptions: [],
                users: [],
                state: '',
                timeout:  null,
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm);
                        this.$http({
                            method: 'post',
                            url: '/addYqDataRecord',
                            data: this.ruleForm,
                        }).then(({ data }) => {
                            console.log(data)
                            if (data.code == 0 ){
                                this.$message({
                                    message: '上报成功!',
                                    type: 'success'
                                });
                                this.$refs[formName].resetFields();
                                this.$router.push({
                                    path: '/success'
                                })
                            } else {
                                this.$alert(data.msg, '提示');
                            }
                        }).catch(({ error }) => {
                            this.$alert('网络请求错误' + error, '提示');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            regionChange(item) {
                this.ruleForm.region = item.join("-");
            },
            querySearchAsync(queryString, cb) {
                let users = this.users;
                let results = queryString ? users.filter(this.createStateFilter(queryString)) : users;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                };
            },
            handleWorkCode(item) {
                console.log(item);
                this.ruleForm.name = item.name;
                this.ruleForm.depart = item.depart;
                this.ruleForm.mobile = item.mobile;
            },
            handleHealth(val) {
                console.log(val);
                this.ruleForm.health = val.join("-");
            },
            livePlaceChange(item) {
                this.ruleForm.livePlace = item.join("-");
            },
            //处理默认选中当前日期
            getNowTime() {
                let now = new Date();
                let year = now.getFullYear(); //得到年份
                let month = now.getMonth(); //得到月份
                let date = now.getDate(); //得到日期
                let hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
                month = month + 1;
                month = month.toString().padStart(2, "0");
                date = date.toString().padStart(2, "0");
                let defaultDate = `${year}-${month}-${date}${hour}`;
                console.log(defaultDate);
                return defaultDate;
            },
        },
        created() {
            document.title = '大丰疫情防控填报登记表';
            this.regionOptions = this.$store.state.regions;
            this.$http.get('/getUserInfos').then(({ data }) => {
                this.users = data.list;
            }).catch(function (error) {
                alert(error);
            });
/*            this.$http({
                method: 'get',
                url: '/getUserInfos',
            }).then(({ data }) => {
                this.users = data.list;
            }).catch(function (error) {
                alert(error);
            });*/
        }
    }
</script>

<style scoped>
</style>
