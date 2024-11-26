document.addEventListener('DOMContentLoaded', function () {
    const bankSelect = document.querySelector('select[name="bank"]');
    const accountInput = document.querySelector('input[name="account"]');
    const submitBtn = document.querySelector('.submit_btn');
    const popup = document.querySelector('.layer_pop');
    const message = popup.querySelector('.pop_contents p');

    // 은행 선택과 계좌번호 입력 시 버튼 활성화 체크
    function checkFormValidity() {
        const bankSelected = bankSelect.value !== "";
        const accountEntered = accountInput.value.trim() !== "";

        // 두 조건이 모두 충족되면 버튼 활성화, 그렇지 않으면 비활성화
        submitBtn.disabled = !(bankSelected && accountEntered);
    }

    // 계좌 검증 규칙
    const rules = {
        // 국민: 25자리, 5~6번째 자리 03, 23, 26
        kb: /^\d{4}(03|23|26)\d{19}$/,
        // 신한: 12자리, 1~3번째 자리 230, 223
        shinhan: /^(230|223)\d{9}$/,
        // 우리: 13자리, 2~4번째 자리 040
        woori: /^\d(040)\d{8}$/,
        // 하나: 14자리, 13~14번째 자리 21, 25
        hn: /^\d{12}(21|25)$/,
        // 농협:
        nh: /^((\d{3}(04|34|47|49|59)\d{6})|(\d{4}(04|34|47|49|59)\d{6})|((304|334|347|349|359|004|034|047|049|059)\d{10}))$/,
        // 수협: 12자리, 1~4번째 자리 1400, 1410
        sh: /^(1400|1410)\d{7}$/,
        // 기업: 14자리, 10~11번째 자리 14
        ibk: /^\d{9}(14)\d{2}$/,
        // 산업: 14자리, 1~3번째 자리 031, 032, 037
        kdb: /^(031|032|037)\d{11}$/,
        // 카카오: 13자리, 2~4번째 자리 355
        kakao: /^\d(355)\d{8}$/,
        // 케이: 12자리, 1~4번째 자리 1102
        k: /^1102\d{8}$/,
        // 토스: 12자리, 1~3번째 자리 300
        toss: /^300\d{9}$/,
        // 경남: 13자리, 1~3번째 자리 225, 229, 231, 241
        bnk: /^(225|229|231|241)\d{10}$/,
        // 광주: 12자리, 4~6번째 자리 133
        kj: /^((\d{3}133\d{5})|(\d{1}133\d{8}))$/,
        // 대구: 12자리, 1~3번째 자리 521, 527
        im: /^(521|527)\d{9}$/,
        // 부산: 13자리, 1~3번째 자리 104
        bs: /^104\d{10}$/,
        // 전북: 13자리, 1~4번째 자리 1031
        jb: /^1031\d{9}$/,
        // 제주: 10자리 2~3번째 자리 07, 20 또는 12자리 1~3번째 자리 730, 740
        jeju: /^((\d(07|20)\d{7})|((730|740)\d{9}))$/,
        // 시티: 11자리 또는 13자리, 9~10번째 자리 16, 18, 19, 20, 37, 38, 39
        city: /^\d{8}(16|18|19|20|37|38|39)\d{2}$/,
        // SC: 11자리, 4~5번째 자리 90
        sc: /^\d{3}90\d{6}$/
    };

    // 유효성 검사 및 결과 메시지 설정
    function validateAccount() {
        const bank = bankSelect.value;
        let accountNumber = accountInput.value.replace(/[-\s]/g, ""); // 공백과 - 제거

        if (!rules[bank]) {
            message.innerHTML  = '은행을 선택해주세요.';
        } else if (!rules[bank].test(accountNumber)) {
            if (accountNumber.length !== 12 && accountNumber.length !== 14) {
                message.innerHTML  = '올바른 형식의 계좌가 아닙니다.<br>계좌번호를 확인해주세요.😯';
            } else {
                message.innerHTML  = '해당 계좌는 적금 계좌가 아닙니다.👌';
            }
        } else {
            message.innerHTML  = '🚨적금계좌입니다. 사기에 주의하세요.🚨';
        }

        // 팝업 표시
        popup.classList.add('show');
    }

    // 팝업 닫기 버튼
    document.querySelector('.close_btn').addEventListener('click', function () {
        popup.classList.remove('show');
    });

    // 계좌 조회 버튼 클릭 시 검증
    submitBtn.addEventListener('click', function () {
        validateAccount();
    });

    // 계좌 입력 및 은행 선택 시 버튼 활성화 체크
    bankSelect.addEventListener('change', checkFormValidity);
    accountInput.addEventListener('input', checkFormValidity);
});
