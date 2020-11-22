(function () {
    require(['jquery', 'urlUtil', 'stringUtil', 'alertUtil', 'ajaxUtil'],
        function (jquery, urlUtil, stringUtil, alertUtil, ajaxUtil) {

            var roleName = sessionStorage.getItem("rolename");
            var currentUrlHash = window.location.hash.replace("#", "");

            if (roleName === '文化宣传处长'||roleName === '文化宣传科员'||roleName === '文化宣传综合处处长') {
                var menu_list = [
                    {
                        menu_name: "文创产品",
                        menu_url: "",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞电视电影",
                        menu_url: "/chineseCultural/production/movieTV",
                        id: "1-1",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "＞动漫游戏",
                        menu_url: "/chineseCultural/production/comicGame",
                        id: "1-2",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "＞漫画典故",
                        menu_url: "/chineseCultural/production/cartoonAllusions",
                        id: "1-3",
                        level: "2",
                        pid: "1"
                    },
                    {
                        menu_name: "文化科普",
                        menu_url: "/chineseCultural/production/movieTV",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "文化资源",
                        menu_url: "",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞中医医史",
                        menu_url: "/chineseCultural/resource/traditionalCultural",
                        id: "3-1",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "＞中医流派",
                        menu_url: "/chineseCultural/resource/traditionalSchool",
                        id: "3-2",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "＞历代名家",
                        menu_url: "/chineseCultural/resource/traditionalDoctor",
                        id: "3-3",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "＞文化古迹",
                        menu_url: "/chineseCultural/facility/culturalRelics",
                        id: "3-4",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "＞非物质文化遗产",
                        menu_url: "/chineseCultural/facility/intangibleCulturalHeritage",
                        id: "3-5",
                        level: "2",
                        pid: "3"
                    },
                    {
                        menu_name: "＞文化场馆",
                        menu_url: "/chineseCultural/facility/culturalVenues",
                        id: "3-6",
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
                        menu_name: "中药常识",
                        menu_url: "/healthCare/healthcarechineseMedicine",
                        id: "5",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "治未病理念",
                        menu_url: "",
                        id: "6",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞科普知识",
                        menu_url: "/healthCare/healthsciKnow",
                        id: "6-1",
                        level: "2",
                        pid: "6"
                    },
                    {
                        menu_name: "＞国医话健康",
                        menu_url: "/healthCare/healthcarefamPre",
                        id: "6-3",
                        level: "2",
                        pid: "6"
                    },
                    {
                        menu_name: "名老中医",
                        menu_url: "/medicalService/chineseMedicine",
                        id: "7",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞历史名方",
                        menu_url: "/healthCare/famPre",
                        id: "8",
                        level: "1",
                        pid: ""
                    },
                    {

                        menu_name: "中医药名院",
                        menu_url: "/medicalService/hosp",
                        id: "9",
                        level: "1",
                        pid: ""
                    },
                    {

                        menu_name: "中医药名科",
                        menu_url: "/medicalService/specialty",
                        id: "10",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "中医药名校",
                        menu_url: "/knowledgeDb/dataBack",
                        id: "11",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "中医药名企",
                        menu_url: "/knowledgeDb/dataBack",
                        id: "12",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '政务资源处长'||roleName === '政务资源科员'||roleName === '政务资源综合处处长'){
                var menu_list = [
                    {
                        menu_name: "信息发布",
                        menu_url: "/data/dataNewsRotations",
                        id: "13",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞新闻轮播图",
                        menu_url: "/data/dataNewsRotations",
                        id: "13-1",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "＞新闻管理",
                        menu_url: "/data/dataNewsInf",
                        id: "13-2",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "＞通知公告",
                        menu_url: "/data/dataAnnouncement",
                        id: "13-3",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "＞政策法规",
                        menu_url: "/data/dataRegulation",
                        id: "13-4",
                        level: "2",
                        pid: "13"
                    },
                    {
                        menu_name: "＞办事流程",
                        menu_url: "/data/dataProcess",
                        id: "13-5",
                        level: "2",
                        pid: "13"
                    }
                ];
            }
            if (roleName === '主研人'||roleName === '科研项目申报单位'||roleName === '市级中医药管理部门'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    }
                ];
            }
            if (roleName === '省局中医药管理部门'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞设置填报时间",
                        menu_url: "/industrialdevelop/chinesemed/timerecord",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "＞账号管理",
                        menu_url: "/scientificProject/accountManagement",
                        id: "15-2",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "＞课题管理",
                        menu_url: "/scientificProject/topicManagement",
                        id: "15-3",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "＞专家管理",
                        menu_url: "/industrialdevelop/expert",
                        id: "15-4",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "＞分配专家",
                        menu_url: "/scientificProject/distributionExpert",
                        id: "15-5",
                        level: "2",
                        pid: "15"
                    },
                    {
                        menu_name: "＞集中评审",
                        menu_url: "/scientificProject/centralizedReview",
                        id: "15-6",
                        level: "2",
                        pid: "15"
                    }
                ];
            }
            if (roleName === '专家'){
                var menu_list = [
                    {
                        menu_name: "科研项目管理",
                        menu_url: "",
                        id: "15",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞集中评审",
                        menu_url: "/scientificProject/centralizedReview",
                        id: "15-1",
                        level: "2",
                        pid: "15"
                    }
                ];
            }
            if (roleName === '中药材种植园'){
                var menu_list = [
                    {
                        menu_name: "在售药材",
                        menu_url: "/industrialdevelop/medMat/medMat",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
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
            }
            if (roleName === '中药材加工企业'){
                var menu_list = [
                    {
                        menu_name: "在售药材",
                        menu_url: "/industrialdevelop/medMat/medMat",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
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
            }
            if (roleName === '中药材制药企业'){
                var menu_list = [
                    {
                        menu_name: "＞在售药品",
                        menu_url: "/industrialdevelop/chinesemed/saledrug",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/industrialdevelop/chinesemed/chinesemed-produce_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '中药材销售企业'){
                var menu_list = [
                    {
                        menu_name: "＞在售药品",
                        menu_url: "/industrialdevelop/chinesemed/saledrug",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/industrialdevelop/chinesemed/chinesemed-produce_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '中医医疗机构'){
                var menu_list = [
                    {
                        menu_name: "＞科研成果",
                        menu_url: "/industrialdevelop/achievement",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/industrialdevelop/organization/lab_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '高等医学院校'){
                var menu_list = [
                    {
                        menu_name: "服务项目",
                        menu_url: "/school/school",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
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
            }
            if (roleName === '科研院所'){
                var menu_list = [
                    {
                        menu_name: "＞科研成果",
                        menu_url: "/industrialdevelop/achievement",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/industrialdevelop/organization/lab_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '技术服务机构'){
                var menu_list = [
                    {
                        menu_name: "＞服务项目",
                        menu_url: "/serviceItems/tecserviceorg",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/serviceItems/tecserviceorg_msg",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
            }
            if (roleName === '旅游康养机构'){
                var menu_list = [
                    {
                        menu_name: "＞基地风采",
                        menu_url: "/industrialdevelop/style",
                        id: "1",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞合作交流",
                        menu_url: "/industrialdevelop/cooperation",
                        id: "2",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞人才招募",
                        menu_url: "/industrialdevelop/recruit",
                        id: "3",
                        level: "1",
                        pid: ""
                    },
                    {
                        menu_name: "＞信息维护",
                        menu_url: "/industrialdevelop/organization/tour_add",
                        id: "4",
                        level: "1",
                        pid: ""
                    }
                ];
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
                    "                        <button class=\"collapse-btn btn btn-link btn-block text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#" + uuid + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
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
                $(".dropdown-item").removeClass("active");
                $(".aaaa").removeClass("active");
                $(this).addClass("active");
                loadPage($(this).attr("url"));
            });

            $(".AFirstMenu").unbind().on("click", function () {
                $(".aaaa").removeClass("active");
                $(".dropdown-item").removeClass("active");
                $(".collapse").removeClass("show");
                $(this).parent(".aaaa").addClass("active");
                loadPage($(this).attr("url"));
            });

            function loadPage(url) {
                orange.loadPage({
                    url: url, target: 'main_body', selector: '#fir_body', success: function (data) {
                        console.log(typeof data);
                        if (typeof data == "string") {
                            $("#main_body").html(data);
                            console.log(url + "加载")
                        } else {
                            alertUtil.error(url + '加载失败');
                        }
                    }
                })
            }

            $("#logout").on("click", function () {
                ajaxUtil.myAjax(null, "/logout", null, function (data) {
                    if (data && data.code === 88888) {
                        sessionStorage.removeItem('username');
                        sessionStorage.removeItem('rolename');
                        sessionStorage.removeItem('orgCode');
                        window.location.href = "/userLogin";
                    } else {
                        alertUtil.alert(data.msg);
                    }
                }, false)
            });

            if (!stringUtil.isBlank(currentUrlHash)) {
                loadPage(currentUrlHash);
            }

            $("#userName").text(sessionStorage.getItem('username'))
        })
})();
