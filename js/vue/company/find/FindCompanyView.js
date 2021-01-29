new Vue({
    el: "#wrap",
    data: {
        title:"업체 아이디/비밀번호 찾기",
        isActive: true,
        companyCode: "",
        companyNumber: "",
        companyId: ""
    },
    created: function() {
        let params = this.queryParams;
        if(params && params.flag) {
            this.isActive = params.flag != "pw";
        }
    },
    methods: {
        activeTab: function(isActive) {
            this.isActive = isActive;
            this.commpanyNumber = "";
            this.companyId = "";
        },
        findCompany(canFindId) {
            if(canFindId) {
                this.getCompanyId();
            } else {
                this.getCompanyPwd();
            }
        },
        getCompanyId: function() {
            if(!this.companyCode) {
                alert("기존 업체코드를 입력하세요.");
                this.$refs.code.focus();
                return;
            }

            if(!this.companyNumber || !/^d+$/.test(this.companyNumber)) {
                alert("사업자 번호를 정확히 입력하세요.");
                this.$refs.number.focus();
                return;
            }
            let url = "/member/company/find/findCompanyId.asp";
            this.sendData("POST", url, this.findIdData, function(response) {
                alert("해당 업체 정보를 찾을수 없습니다.");
            }) 
        },
        getCompanyPwd: function() {
            if(!this.companyCode) {
                alert("기존 업체코드를 입력하세요.");
                this.$refs.code.focus();
                return;
            }

            if(!this.companyId) {
                alert("업체 아이디를 입력하세요.");
                this.$refs.id.focus();
                return;
            }

            let url = "/member/company/find/findCompanyPwd.asp";
            this.sendData("POST", url, this.findPwData, function(response) {
                alert("해당 업체 정보를 찾을수 없습니다.");
            });
        },
        sendData: function(method, url, data, callback) {
            
            $.ajax({
                type: method,
                url: url,
                data: data,
                dataType: "json",
                success: function (response) {
                    callback(response);
                },
                error: function(error) {
                    callback(error);
                }
            });
        }
    },
    computed: {
        name: function() {
            return this.isActive ? "아이디 찾기" : "비밀번호 찾기"
        },
        notice: function() {
            if(this.isActive) {
                return `회원님의 기존 업체 코드와 사업자번호로<br>
                아이디를 확인 하실 수 있습니다.`
            } else {
                return `회원님의 기존 업체 코드와 업체 아이디로<br>
                비밀번호를 확인 하실 수 있습니다.`
            }
        },
        queryParams: function() {
            let params = {};
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
            return params;
        },
        findIdData: function() {
            return {
                companyCode: this.companyCode,
                commpanyNumber: this.companyNumber
            }
        },
        findPwData: function() {
            return {
                companyCode: this.companyCode,
                commpanyId: this.companyId
            }
        }
    }
});