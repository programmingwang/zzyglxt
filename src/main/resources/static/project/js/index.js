(function () {
    require(['jquery', 'urlUtil', 'stringUtil', 'alertUtil', 'ajaxUtil', 'modalUtil'],
        function (jquery, urlUtil, stringUtil, alertUtil, ajaxUtil, modalUtil) {

            var roleName = sessionStorage.getItem("rolename");
            var currentUrlHash = window.location.hash.replace("#", "");

            if (roleName === '文化宣传处长'||roleName === '文化宣传科员'||roleName === '文化宣传综合处处长') {
                var menu_list = [
                    {
                        menu_name: "文化资源",
                        menu_url: "",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "中医医史",
                        menu_url: "/chineseCultural/resource/traditionalCultural",
                        id: "1-1",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "中医流派",
                        menu_url: "/chineseCultural/resource/traditionalSchool",
                        id: "1-2",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "历代名家",
                        menu_url: "/chineseCultural/resource/traditionalDoctor",
                        id: "1-3",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "文化设施",
                        menu_url: "",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "文化古迹",
                        menu_url: "/chineseCultural/facility/culturalRelics",
                        id: "2-1",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "非物质文化遗产",
                        menu_url: "/chineseCultural/facility/intangibleCulturalHeritage",
                        id: "2-2",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "文化场馆",
                        menu_url: "/chineseCultural/facility/culturalVenues",
                        id: "2-3",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "文创产品",
                        menu_url: "",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "电视电影",
                        menu_url: "/chineseCultural/production/movieTV",
                        id: "3-1",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "动漫游戏",
                        menu_url: "/chineseCultural/production/comicGame",
                        id: "3-2",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "漫画典故",
                        menu_url: "/chineseCultural/production/cartoonAllusions",
                        id: "3-3",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "健康旅游",
                        menu_url: "/chineseCultural/travel/travel",
                        id: "4",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "养生保健",
                        menu_url: "",
                        id: "5",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "科普知识",
                        menu_url: "/healthCare/healthsciKnow",
                        id: "5-1",
                        level: "2",
                        pid: "5"
                    },
                    {
                        menu_name: "中药常识",
                        menu_url: "/healthCare/healthcarechineseMedicine",
                        id: "5-2",
                        level: "2",
                        pid: "5"
                    },
                    {
                        menu_name: "历史名方",
                        menu_url: "/healthCare/famPre",
                        id: "5-3",
                        level: "2",
                        pid: "5"
                    },
                    {
                        menu_name: "国医话健康",
                        menu_url: "/healthCare/healthcarefamPre",
                        id: "5-4",
                        level: "2",
                        pid: "5"
                    },
                    {

                        menu_name: "中医名院",
                        menu_url: "/medicalService/hosp",
                        id: "6",
                        level: "1",
                        pid: ""
                    },
                    {

                        menu_name: "中医名科",
                        menu_url: "/medicalService/specialty",
                        id: "7",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "名老中医",
                        menu_url: "/medicalService/chineseMedicine",
                        id: "8",
                        level: "1",
                        pid: ""
                    },
                    // {
                    //     menu_name: "中医药名校",
                    //     menu_url: "/knowledgeDb/dataBack",
                    //     id: "11",
                    //     level: "1",
                    //     pid: ""
                    // },
                    // {
                    //     menu_name: "中医药名企",
                    //     menu_url: "/knowledgeDb/dataBack",
                    //     id: "12",
                    //     level: "1",
                    //     pid: ""
                    // }
                ];
                $(".tTile").css("display","none");
                $("#xczy").css("display","block");
            }
            else if (roleName === '政务资源处长'||roleName === '政务资源科员'){
                var menu_list = [
                    {
                        menu_name: "首页",
                        menu_url: "/data/mainPage",
                        id: "12",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息发布",
                        menu_url: "/data/dataNewsRotations",
                        id: "13",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "新闻轮播图",
                        menu_url: "/data/dataNewsRotations",
                        id: "13-1",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "新闻管理",
                        menu_url: "/data/dataNewsInf",
                        id: "13-2",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "通知公告",
                        menu_url: "/data/dataAnnouncement",
                        id: "13-3",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "政策法规",
                        menu_url: "/data/dataRegulation",
                        id: "13-4",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "规章制度",
                        menu_url: "/data/dataRules",
                        id: "13-5",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "领导讲话",
                        menu_url: "/data/dataLeader",
                        id: "13-6",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "办事指南",
                        menu_url: "/data/dataProcess",
                        id: "13-7",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "文件流转",
                        menu_url: "",
                        id: "14",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "发文管理",
                        menu_url: "/document/post",
                        id: "14-1",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "收文管理",
                        menu_url: "/document/receipt",
                        id: "14-2",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "内部会签",
                        menu_url: "/document/sign",
                        id: "14-3",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "请示报告",
                        menu_url: "/document/report",
                        id: "14-4",
                        level: "2",
                        pid: "14"
                    }
                ];
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }
            else if (roleName === '政务资源综合处处长'){
                var menu_list = [
                    {
                        menu_name: "首页",
                        menu_url: "/data/mainPage",
                        id: "12",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息发布",
                        menu_url: "/data/dataNewsRotations",
                        id: "13",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "新闻轮播图",
                        menu_url: "/data/dataNewsRotations",
                        id: "13-1",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "新闻管理",
                        menu_url: "/data/dataNewsInf",
                        id: "13-2",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "通知公告",
                        menu_url: "/data/dataAnnouncement",
                        id: "13-3",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "政策法规",
                        menu_url: "/data/dataRegulation",
                        id: "13-4",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "规章制度",
                        menu_url: "/data/dataRules",
                        id: "13-5",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "领导讲话",
                        menu_url: "/data/dataLeader",
                        id: "13-6",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "办事指南",
                        menu_url: "/data/dataProcess",
                        id: "13-7",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "文件流转",
                        menu_url: "",
                        id: "14",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "发文管理",
                        menu_url: "/document/post",
                        id: "14-1",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "收文管理",
                        menu_url: "/document/receipt",
                        id: "14-2",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "内部会签",
                        menu_url: "/document/sign",
                        id: "14-3",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "请示报告",
                        menu_url: "/document/report",
                        id: "14-4",
                        level: "2",
                        pid: "14"
                    },
                    // {
                    //     menu_name: "管理门户",
                    //     menu_url: "",
                    //     id: "15",
                    //     level: "1",
                    //     pid: ""
                    // },
                    // {
                    //     menu_name: "接入系统管理",
                    //     menu_url: "",
                    //     id: "15-1",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "角色管理",
                    //     menu_url: "",
                    //     id: "15-2",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "用户映射",
                    //     menu_url: "",
                    //     id: "15-3",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "系统管理",
                    //     menu_url: "",
                    //     id: "16",
                    //     level: "1",
                    //     pid: ""
                    // },
                    // {
                    //     menu_name: "基本字典信息",
                    //     menu_url: "",
                    //     id: "16-1",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "权限配置",
                    //     menu_url: "",
                    //     id: "16-2",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "系统资料配置",
                    //     menu_url: "",
                    //     id: "16-3",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "系统日志",
                    //     menu_url: "",
                    //     id: "16-4",
                    //     level: "2",
                    //     pid: "16"
                    // },
                ];
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }
            else if (roleName === '政务资源分管局长'||roleName === '中药处分管局长'||roleName === '中医处分管局长'||roleName === '综合处分管局长'||roleName === '法规监督处分管局长'){
                var menu_list = [
                    {
                        menu_name: "首页",
                        menu_url: "/data/mainPage",
                        id: "12",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息发布",
                        menu_url: "/data/dataNewsRotations",
                        id: "13",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "新闻轮播图",
                        menu_url: "/data/dataNewsRotations",
                        id: "13-1",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "新闻管理",
                        menu_url: "/data/dataNewsInf",
                        id: "13-2",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "通知公告",
                        menu_url: "/data/dataAnnouncement",
                        id: "13-3",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "政策法规",
                        menu_url: "/data/dataRegulation",
                        id: "13-4",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "规章制度",
                        menu_url: "/data/dataRules",
                        id: "13-5",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "领导讲话",
                        menu_url: "/data/dataLeader",
                        id: "13-6",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "办事指南",
                        menu_url: "/data/dataProcess",
                        id: "13-7",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "文件流转",
                        menu_url: "",
                        id: "14",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "发文管理",
                        menu_url: "/document/post",
                        id: "14-1",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "收文管理",
                        menu_url: "/document/receipt",
                        id: "14-2",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "内部会签",
                        menu_url: "/document/sign",
                        id: "14-3",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "请示报告",
                        menu_url: "/document/report",
                        id: "14-4",
                        level: "2",
                        pid: "14"
                    }
                    // {
                    //     menu_name: "管理门户",
                    //     menu_url: "",
                    //     id: "15",
                    //     level: "1",
                    //     pid: ""
                    // },
                    // {
                    //     menu_name: "接入系统管理",
                    //     menu_url: "",
                    //     id: "15-1",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "角色管理",
                    //     menu_url: "",
                    //     id: "15-2",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "用户映射",
                    //     menu_url: "",
                    //     id: "15-3",
                    //     level: "2",
                    //     pid: "15"
                    // },
                    // {
                    //     menu_name: "系统管理",
                    //     menu_url: "",
                    //     id: "16",
                    //     level: "1",
                    //     pid: ""
                    // },
                    // {
                    //     menu_name: "基本字典信息",
                    //     menu_url: "",
                    //     id: "16-1",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "权限配置",
                    //     menu_url: "",
                    //     id: "16-2",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "系统资料配置",
                    //     menu_url: "",
                    //     id: "16-3",
                    //     level: "2",
                    //     pid: "16"
                    // },
                    // {
                    //     menu_name: "系统日志",
                    //     menu_url: "",
                    //     id: "16-4",
                    //     level: "2",
                    //     pid: "16"
                    // },
                ];
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }
            else if (roleName === '政务资源局长'){
                var menu_list = [
                    {
                        menu_name: "首页",
                        menu_url: "/data/mainPage",
                        id: "12",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息发布",
                        menu_url: "/data/dataNewsRotations",
                        id: "13",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "新闻轮播图",
                        menu_url: "/data/dataNewsRotations",
                        id: "13-1",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "新闻管理",
                        menu_url: "/data/dataNewsInf",
                        id: "13-2",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "通知公告",
                        menu_url: "/data/dataAnnouncement",
                        id: "13-3",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "政策法规",
                        menu_url: "/data/dataRegulation",
                        id: "13-4",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "规章制度",
                        menu_url: "/data/dataRules",
                        id: "13-5",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "领导讲话",
                        menu_url: "/data/dataLeader",
                        id: "13-6",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "办事指南",
                        menu_url: "/data/dataProcess",
                        id: "13-7",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "文件流转",
                        menu_url: "",
                        id: "14",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "发文管理",
                        menu_url: "/document/post",
                        id: "14-1",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "收文管理",
                        menu_url: "/document/receipt",
                        id: "14-2",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "内部会签",
                        menu_url: "/document/sign",
                        id: "14-3",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "请示报告",
                        menu_url: "/document/report",
                        id: "14-4",
                        level: "2",
                        pid: "14"
                    },
                    {
                        menu_name: "管理门户",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "接入系统管理",
                        menu_url: "",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "角色管理",
                        menu_url: "",
                        id: "15-2",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "用户映射",
                        menu_url: "",
                        id: "15-3",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "系统管理",
                        menu_url: "",
                        id: "16",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "基本字典信息",
                        menu_url: "",
                        id: "16-1",
                        level: "2",
                        pid: "16"
                    },
                    {
                        menu_name: "权限配置",
                        menu_url: "",
                        id: "16-2",
                        level: "2",
                        pid: "16"
                    },
                    {
                        menu_name: "系统资料配置",
                        menu_url: "",
                        id: "16-3",
                        level: "2",
                        pid: "16"
                    },
                    {
                        menu_name: "系统日志",
                        menu_url: "",
                        id: "16-4",
                        level: "2",
                        pid: "16"
                    },
                ];
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }
            else if (roleName === '主研人'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    },
                    // {
                    //     menu_name: "账号管理",
                    //     menu_url: "/scientificProject/accountManagement",
                    //     id: "15-2",
                    //     level: "2",
                    //     pid: "15"
                    // },
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '科研项目申报单位'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "账号管理",
                        menu_url: "/scientificProject/accountManagement",
                        id: "15-2",
                        level: "2",
                        pid: "15"
                    },
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '科研项目-省级'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "设置填报时间",
                        menu_url: "/industrialdevelop/chinesemed/timerecord",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "账号管理",
                        menu_url: "/scientificProject/accountManagement",
                        id: "15-2",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-3",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "专家管理",
                        menu_url: "/scientificProject/expert",
                        id: "15-4",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "分配专家",
                        menu_url: "/scientificProject/distributionExpert",
                        id: "15-5",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "集中评审",
                        menu_url: "/scientificProject/centralizedReview",
                        id: "15-6",
                        level: "2",
                        pid: "15"
                    }
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '科研项目-市级'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    }
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '专家'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "集中评审",
                        menu_url: "/scientificProject/centralizedReview",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    }
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '中药材种植园'){
                var menu_list = [
                    {
                        menu_name: "在售药材",
                        menu_url: "/industrialdevelop/medMat/medMat",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/chinesemed/plantation_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '中药材加工企业'){
                var menu_list = [
                    {
                        menu_name: "在售药材",
                        menu_url: "/industrialdevelop/medMat/medMat",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/chinesemed/chinesemed-process_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '中药材制药企业'){
                var menu_list = [
                    {
                        menu_name: "在售药品",
                        menu_url: "/industrialdevelop/chinesemed/saledrug",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/chinesemed/chinesemed-produce_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '中药材销售企业'){
                var menu_list = [
                    {
                        menu_name: "在售药品",
                        menu_url: "/industrialdevelop/chinesemed/saledrug",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/chinesemed/chinesemed-sale_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '中医医疗机构'){
                var menu_list = [
                    {
                        menu_name: "科研成果",
                        menu_url: "/industrialdevelop/achievement",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/organization/hosp_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '高等医学院校'){
                var menu_list = [
                    {
                        menu_name: "科研成果",
                        menu_url: "/industrialdevelop/achievement",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/school/school_msg",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '科研院所'){
                var menu_list = [
                    {
                        menu_name: "科研成果",
                        menu_url: "/industrialdevelop/achievement",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/organization/lab_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '技术服务机构'){
                var menu_list = [
                    {
                        menu_name: "服务项目",
                        menu_url: "/serviceItems/tecserviceorg",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/serviceItems/tecserviceorg_msg",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '旅游康养机构'){
                var menu_list = [
                    {
                        menu_name: "基地风采",
                        menu_url: "/industrialdevelop/organization/tour",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "信息维护",
                        menu_url: "/industrialdevelop/organization/tour_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            else if (roleName === '产业发展-市级' || roleName === '产业发展-省级'){
                var menu_list = [
                    {
                        menu_name: "机构审核",
                        menu_url: "/industrialdevelop/audit",
                        id: "1",
                        level: "1",
                        pid: ""
                    }
                ];
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            else if (roleName === '政务资源市部门'||roleName === '政务资源县部门'){
                var menu_list = [
                    {
                        menu_name: "首页",
                        menu_url: "/data/mainPage",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "文件流转",
                        menu_url: "",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "发文管理",
                        menu_url: "/document/post",
                        id: "2-1",
                        level: "2",
                        pid: "2"
                    },
                    {
                        menu_name: "收文管理",
                        menu_url: "/document/receipt",
                        id: "2-2",
                        level: "2",
                        pid: "2"
                    },
                ];
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }

            function getHTML_dropdown_menu_item(astr, aurl, show_active) {
                var str = "<a class=\"dropdown-item  " + (show_active ? "active" : "") + " \" url=\"" + aurl + "\">" + astr + "</a>\n" +
                    "<hr size=\"1\" style=\"color: #E8E8E8;border-style:dashed;width:90%\">";
                return str;
            }

            function getHTML_dropdown_menu(itemStr) {
                var str = "<div class=\"dropdown-menu left-menu-dropdown-menu\">\n" +
                    itemStr +
                    "</div>";
                return str;
            }

            function getHTML(item, dropdownStr, show_active) {
                var uuid = stringUtil.getUUID();
                var header = item.menu_name;
                var furl = item.menu_url;
                var str = "<div class=\"card\">\n" +
                    "                    <div class=\"\" id=\"headingOne\">\n" +
                    "                        <button class=\"collapse-btn btn btn-link btn-block \" type=\"button\" data-toggle=\"collapse\" data-target=\"#" + uuid + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                    "                            <h4>" + header + "</h4>\n" +
                    "                        </button>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div id=\"" + uuid + "\" class=\"collapse " + (show_active ? "show" : "") + " \" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\n" +
                    dropdownStr +
                    "                    </div>\n" +
                    "                </div>";
                var str1 = "<div class=\"card\">\n" +
                    "                    <div class=\"aaaa\" id=\"headingOne\">\n" +
                    "                    <a  class=\"AFirstMenu\" url=\"" + furl + "\">" + header + "</a>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                    <div id=\"" + uuid + "\" class=\"nullmenu " + (show_active ? "show" : "") + " \" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\n" +
                    dropdownStr +
                    "                    </div>\n" +
                    "                </div>";

                if (dropdownStr == "<div class=\"dropdown-menu left-menu-dropdown-menu\">\n" +
                    "</div>") {
                    return str1;
                } else {
                    return str;
                }
            }

            function getMenuStr(menuList) {
                if (stringUtil.isBlank(menuList)) {
                    return "";
                }
                ;
                var topMenu = [];
                $.each(menuList, function (i, item) {
                    if (item.level == 1) {
                        topMenu.push(item);
                    }
                });

                var htmlStr = "";
                $.each(topMenu, function (i, tm_item) {
                    var dropdowStr = "";
                    var show = false;
                    $.each(menuList, function (j, item) {
                        var active = false;
                        if (item.pid == tm_item.id) {
                            if (!stringUtil.isBlank(currentUrlHash) && currentUrlHash == item.menu_url) {
                                active = true;
                                show = true;
                            }
                            dropdowStr = dropdowStr + getHTML_dropdown_menu_item(item.menu_name, item.menu_url, active);
                        }
                    });
                    dropdowStr = getHTML_dropdown_menu(dropdowStr);
                    htmlStr = htmlStr + getHTML(tm_item, dropdowStr, show);
                });
                return htmlStr;
            }

            $("#left_menu").html(getMenuStr(menu_list));

            sessionStorage.setItem('aNumber', '1')

            $(".collapse-btn").unbind().on("click",function () {
                $(".collapse").removeClass("show");
                var a=sessionStorage.getItem('aNumber');
                if(a==1){
                    $($(this).attr("data-target")).addClass("show");
                    sessionStorage.setItem('aNumber', '2')
                }else {
                    $($(this).attr("data-target")).removeClass("show");
                    sessionStorage.setItem('aNumber', '1')
                }
            });

            $(".dropdown-item").unbind().on("click", function () {
                localStorage.removeItem("comeFromMain");
                $(".dropdown-item").removeClass("active");
                $(".aaaa").removeClass("active");
                $(this).addClass("active");
                loadPage($(this).attr("url"));
            });

            $(".AFirstMenu").unbind().on("click", function () {
                localStorage.removeItem("comeFromMain");
                $(".aaaa").removeClass("active");
                $(".dropdown-item").removeClass("active");
                $(".collapse").removeClass("show");
                $(this).parent(".aaaa").addClass("active");
                loadPage($(this).attr("url"));
            });

            function loadPage(url) {
                orange.loadPage({
                    url: url, target: 'main_body', selector: '#fir_body', success: function (data) {
                        if (typeof data == "string") {
                            $("#main_body").html(data);
                        } else {
                            alertUtil.error(url + '加载失败');
                        }
                    }
                })
            }

            $("#usermsg").on("click", function () {
                var myChangePasswordModalData = {
                    modalBodyID: "myChangePasswordModal",
                    modalTitle: "修改密码",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        var isSuccess = false;
                        var password = $("#oldPwd").val();
                        var mobilePhone = $("#phone").val();
                        var newPassword = $("#newPwd").val();
                        var checkNewPassword = $("#checkPwd").val();
                        if (!stringUtil.isBlank(password) && !stringUtil.isBlank(mobilePhone) &&
                            !stringUtil.isBlank(newPassword) && !stringUtil.isBlank(checkNewPassword)) {
                            var pwd = {
                                "password": password,
                                "mobilePhone": mobilePhone,
                                "newPassword": newPassword,
                                "checkNewPassword": checkNewPassword
                            };
                            ajaxUtil.myAjax(null, "/user/updatepwd", pwd, function (data) {
                                if (data && data.code == 88888) {
                                    // alertUtil.success('修改成功');
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            // window.location.href = '/userLogin';//密码修改成功后重新登陆
                                            // orange.redirect('/userLogin');
                                            $('#logout').click();
                                            return true;
                                        },
                                        onModalHidden:function () {
                                            $('#logout').click();
                                            return true;
                                        }
                                    };
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                } else {
                                    alertUtil.error(data.msg)
                                }
                            }, false, "", "put")
                        } else {
                            alertUtil.info('输入不能为空')
                        }
                        return isSuccess;
                    }

                };
                var myChangePasswordModal = modalUtil.init(myChangePasswordModalData);
                myChangePasswordModal.show();
            });

            $("#logout").on("click", function () {
                ajaxUtil.myAjax(null, "/logout", null, function (data) {
                    if (data && data.code === 88888) {
                        sessionStorage.clear();
                        localStorage.clear();
                        window.location.href = "/userLogin";
                    } else {
                        alertUtil.alert(data.msg);
                    }
                }, false)
            });

            if (!stringUtil.isBlank(currentUrlHash)) {
                loadPage(currentUrlHash);
            }

            $("#userName").text(sessionStorage.getItem('name'))
        })
})();
