<template>
    <el-container>
        <el-form label-position='left' hide-required-asterisk :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <div class="block">
                <el-image :src="require('../assets/title.png')"></el-image>
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
            <el-radio-group v-model="ruleForm.travelPlan">
                <el-radio label="在家"></el-radio>
                <el-radio label="外地"></el-radio>
            </el-radio-group>
            <div v-if="ruleForm.travelPlan == '外地'">
                <el-form-item label="是否途径中高风险地区" prop="highRiskAreaPass">
                </el-form-item>
                <el-radio-group v-model="ruleForm.highRiskAreaPass">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </div>
            <!--<el-input v-model="ruleForm.travelPlan" style="width: 100%"></el-input>-->
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
                <el-form-item label="是否接触过中高风险地区人员" prop="isHighPass">
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
            <el-date-picker type="date" placeholder="选择返厂日期" v-model="ruleForm.returnDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            <el-form-item label="返厂方式" prop="transport">
            </el-form-item>
            <el-radio-group v-model="ruleForm.transport">
                <el-radio label="自驾(含搭车)"></el-radio>
                <el-radio label="公共交通"></el-radio>
            </el-radio-group>
            <el-form-item label="备注" prop="remark">
            </el-form-item>
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            <el-form-item label="填写日期" prop="fillDate">
            </el-form-item>
            <el-date-picker type="date" placeholder="选择填写日期" value-format="yyyy-MM-dd" v-model="ruleForm.fillDate" style="width: 100%;"></el-date-picker>
            <el-form-item></el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>
    </el-container>

</template>

<script>

    export default {
        name: "main",
        data() {
            let checkReturnDate = (rule, value, callback) => {
                if (value < this.ruleForm.fillDate) {
                    return callback(new Error('返厂日期不得晚于当前日期！'))
                }
                callback();
            };
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
                    highRiskAreaPass: '',
                    status: '',
                    healthGroup: [],
                    health: '',
                    isHighPass: '',
                    isolation: '',
                    returnDate: '',
                    transport: '',
                    remark: '',
                    fillDate: this.formatDate(new Date()),
                },
                rules: {
                    workCode: [
                        { required: true, message: '请输入工号', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
                    ],
                    regionChoose: [
                        { type: 'array', required: true, message: '请选择籍贯', trigger: 'change' }
                    ],
                    regionState: [
                        { required: true, message: '请选择过年所在地是否与籍贯一致', trigger: 'change' }
                    ],
                    travelPlan: [
                        { required: true, message: '请选择假期行程', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择身体是否异常', trigger: 'change' }
                    ],
                    returnDate: [
                        { required: true, message: '请选择返厂日期', trigger: 'change' },
                        { validator: checkReturnDate, trigger: "change"}
                    ],
                    transport: [
                        { required: true, message: '请选择返厂方式', trigger: 'change' }
                    ],
                    fillDate: [
                        {required: true, message: '请选择时间', trigger: 'change' }
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
                        this.formatData();
                        console.log(this.ruleForm);
                        this.$http({
                            method: 'post',
                            url: '/addYqDataRecord',
                            data: this.ruleForm,
                        }).then(({ data }) => {
                            console.log(data);
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
                }, 1500 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                };
            },
            handleWorkCode(item) {
                this.ruleForm.name = item.name;
                this.ruleForm.depart = item.depart;
                this.ruleForm.mobile = item.mobile;
            },
            handleHealth(val) {
                this.ruleForm.health = val.join("-");
            },
            livePlaceChange(item) {
                this.ruleForm.livePlace = item.join("-");
            },
            formatData() {
                this.ruleForm.workCode = this.ruleForm.workCode.toUpperCase();
            },
            formatDate(formatDate) {
                let y = formatDate.getFullYear();
                let m = formatDate.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = formatDate.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        },
        created() {
            document.title = '大丰防疫信息系统';
            this.regionOptions = this.$store.state.regions;
            this.$http.get('/getUserInfos').then(({ data }) => {
                this.users = data.list;
            }).catch(function (error) {
                alert(error);
            });
        }
    }
</script>

<style scoped>
</style>
