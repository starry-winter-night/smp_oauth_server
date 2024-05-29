$('#oauthInputId').keydown(function (e) {
  if (e.keyCode == 13) {
    oauthLoginCheck();
  }
});
$('#oauthInputPassword').keydown(function (e) {
  if (e.keyCode == 13) {
    oauthLoginCheck();
  }
});
$('#oauthLoginButton').on('click', function (e) {
  e.preventDefault();
  // 폼 데이터를 배열로 직렬화
  const formArray = $('#oauthForm').serializeArray();

  // 배열을 객체로 변환
  let formDataObj = {};
  $.map(formArray, function (item) {
    formDataObj[item.name] = item.value;
  });
  oauthLoginCheck(formDataObj);
});

$('.noAgreeButton').on('click', function (e) {
  window.close();
});

function oauthLoginCheck(formDataObj) {
  let id = $('#oauthInputId').val();
  let pw = $('#oauthInputPassword').val();
  // 로그인 폼 빈칸 검사
  if (id.replace(/\s/g, '').length == 0) {
    alert('아이디를 입력해주세요.');
    $('#oauthInputId').val('');
    $('#oauthInputId').focus();
    return false;
  }
  if (pw.replace(/\s/g, '').length == 0) {
    alert('패스워드를 입력해주세요.');
    $('#oauthInputPassword').val('');
    $('#oauthInputPassword').focus();
    return false;
  }

  //로그인 폼 공백 검사
  let id_check = checkSpace(id);
  let pw_check = checkSpace(pw);
  if (id_check == true || pw_check == true) {
    alert('공백은 사용하실 수 없습니다.');
    $('#oauthInputId').val('');
    $('#oauthInputPassword').val('');
    $('#oauthInputId').focus();
    return false;
  } else {
    //로그인 아이디 특수문자 검사
    id_check = checkSpecial(id);
    if (id_check == true) {
      alert('특수문자는 사용하실 수 없습니다.');
      $('#oauthInputId').val('');
      $('#oauthInputPassword').val('');
      $('#oauthInputId').focus();
      return false;
    } else {
      $.ajax({
        url: '/oauth/authorize',
        dataType: 'json',
        type: 'POST',
        data: {
          username: id,
          password: pw,
          client_id: formDataObj.client_id,
          redirect_uri: formDataObj.redirect_uri,
          state: formDataObj.state,
        },
        success: function (result) {
          if (result.message) {
            alert(result.message);
            return;
          }
          if (result.redirect) {
            window.location.replace(result.redirect);
          }
        },
      });
    }
  }
}
