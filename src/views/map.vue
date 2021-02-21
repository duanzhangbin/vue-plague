<template>
    <div>
        <div class="amap-page-container">
            <el-amap-search-box
                    class="search-box"
                    :search-option="searchOption"
            :on-search-result="onSearchResult"
            ></el-amap-search-box>
            <el-amap
            ref="map"
            vid="amapDemo"
            :amap-manager="amapManager"
            :center="center"
            :zoom="zoom"
            :plugin="plugin"
            :events="events"
            class="amap-demo"
            >
            <el-amap-marker :position="center"></el-amap-marker>
            </el-amap>
        </div>
    </div>
</template>
<script>
    //引入 获取实例
    import { AMapManager } from "vue-amap";
    let amapManager = new AMapManager();
    let Geocoder; //先声明变量，
    export default {
        data() {
            let self = this;
            return {
                amapManager,
                zoom: 12,
                input: "",
                markers: [],
                searchOption: {
                    city: "杭州",
                    citylimit: false,
                },
                center: [120.19, 30.26],
                events: {
/*                    init: (o) => {
                        o.getCity((result) => {
                            console.log(result);
                        });
                    },*/
                    moveend: () => {},
                    zoomchange: () => {},
                    click: (e) => {
                        self.center = [e.lnglat.lng, e.lnglat.lat];
                        Geocoder.getAddress(self.center, function (status, result) { //根据坐标获取位置
                            if (status === "complete" && result.info === "OK") {
                                self.input = result.regeocode.formattedAddress;
                                document.querySelector(".search-box-wrapper input").value =
                                    self.input;
                            }
                        });
                    },
                },
                plugin: [
                    {
                        pName: "Geocoder", //使用AMap.Geocoder插件
                        events: {
                            init(o) {
                                Geocoder = o; // o 则是AMap.Geocoder的实例 对外部的Geocoder变量进行赋值，在任何地方就都可以使用了
                                //self.center 具体坐标 （数组格式） ，function 回调函数
                                o.getAddress(self.center, function (status, result) {
                                    if (status === "complete" && result.info === "OK") {
                                        //result.regeocode.formattedAddress就是具体位置
                                        self.input = result.regeocode.formattedAddress;
                                        //对搜索组件的input进行赋值
                                        document.querySelector(".search-box-wrapper input").value =
                                            self.input;
                                    }
                                });
                            },
                        },
                    },
                    {
                        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                        pName: "Geolocation", // AMap-Geolocation 定位插件
                        events: {
                            init(o) {
                                //getCurrentPosition 获取当前位置的方法
                                //注意 虽然进页面就会调用这个方法，但是data()中center要有默认值，不然会报错
                                o.getCurrentPosition((status, result) => {
                                    console.log('..........result:' + result.addressComponent.province);
                                    console.log('..........result:' + result.addressComponent.city);
                                    console.log('..........result:' + result.addressComponent.district);
                                    console.log(result.formattedAddress)
                                    if (result && result.position) {
                                        let lng = result.position.lng;
                                        let lat = result.position.lat;
                                        self.center = [lng, lat];
                                        self.loaded = true;
                                        self.zoom = 14;
                                        self.$nextTick();
                                    }
                                });
                            },
                        },
                    },
                ],
            };
        },
        methods: {
            //点击搜索后触发的事件
            onSearchResult(pois) {
                this.input = document.querySelector(".search-box-wrapper input").value
                //这边类似模糊查询 会返回一个数组，我就直接取第一个值了。
                this.center = [pois[0].lng, pois[0].lat];
            },
        },
    };
</script>
<style scoped>
    .amap-page-container {
        width: 100%;
        height: 400px;
        margin-bottom: 20px;
    }
</style>
<style>
    .el-vue-search-box-container {
        width: 100% !important;
        margin-bottom: 10px;
    }
</style>
