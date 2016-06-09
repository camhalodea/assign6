  var config = {
    apiKey: "AIzaSyBD_IoLW7IPWNp8ZbEx21gMxE0ts0ons2Q",
    authDomain: "assign06-45e45.firebaseapp.com",
    databaseURL: "https://assign06-45e45.firebaseio.com",
    storageBucket: "assign06-45e45.appspot.com",
  };
  firebase.initializeApp(config);
  ImageDealer.REF = firebase;
var currentUser = firebase.auth().currentUser;
var fbProvider = new firebase.auth.FacebookAuthProvider();
var uploadMo = new uploadModal($(#upload-modal));
var viewMo = new viewModal($(#view-modal));
/*
    分為三種使用情形：
    1. 初次登入，改變成登入狀態
    2. 已為登入狀態，reload 網站照樣顯示登入狀態
    3. 未登入狀態

    登入/當初狀態顯示可使用下方 logginOption function
*/



function authenticate(){

  firebase.auth().signInWithPopup(fbProvider).then(function
  (result) {
  //登入後頁面行為
    var name = {};
    name["/users/"+result.user.uid+"/name"] = result.user.displayName;
    name["/users/"+result.user.uid+"/photo"] = result.user.photoURL;
    firebase.database().ref().update(name);
  }).catch(function (error) {
  var errorCode = error.code;
  var errorMessa = error.message;
  console.log(errorCode,errorMessa);
  })
}

firebase.auth().onAuthStateChanged(function (user) {
  if(user){
    logginOption(true);
  }else{
    logginOption(false);
  }
})


$("#signin").click(function () {
  // 登入後的頁面行為
  authenticate();
});

$("#signout").click(function () {
    // 登出後的頁面行為
    firebase.auth().signOut().then(function() {
      fbProvider.unAuth();
    },function (error) {
      console.log(error.code);
    });

});

$("#submitData").click(function () {
    // 上傳新商品
    // var itemID = items.push({"title":title, "price":price, "descrip":descrip, "imgD":pic, "seller": user.uid});
    var currentItemKey = firebase.database().ref("items").push({"title":title, "price":price, "descrip":descrip, "imgD":pic, "seller": user.uid}).key;
    uploadMo.submitPic(currentUser.uid);
    uploadModal.itemKey = currentItemKey;

    firebase.database().ref("items").once("value",function(data){
      Var allItems= data.value} }
});

$("#editData").click(function () {
    // 編輯商品資訊
    if($("#picData")[0].file[0]){
      uploadModal.submitPuc(currentUser.uid);
    }else{
      $("#upload-modal").modal("hide");
    }
    
});

$("#removeData").click(function () {
    //刪除商品
    firebase.database().ref(“items”).remove();
});


/*
    商品按鈕在dropdown-menu中
    三種商品篩選方式：
    1. 顯示所有商品
    2. 顯示價格高於 NT$10000 的商品
    3. 顯示價格低於 NT$9999 的商品

*/


function logginOption(isLoggin) {
  if (isLoggin) {
    $("#upload").css("display","block");
    $("#signin").css("display","none");
    $("#signout").css("display","block");
  }else {
    $("#upload").css("display","none");
    $("#signin").css("display","block");
    $("#signout").css("display","none");
  }
}


function reProduceAll(allItems) {
    /*
    清空頁面上 (#item)內容上的東西。
    讀取爬回來的每一個商品
    */

  /*
    利用for in存取
  */
  for(var itemKey in allItems){
    allItem.[itemKey]
  };
  var sinItem=allItem[itemKey];
  sinItem.itemKey=itemKey;
  produceSingleItem(sinItem);
  var tempItem= new Item(sinItem);
  firebase.database().ref("Item").append(tempItem.dom);

}
// 每點開一次就註冊一次
function produceSingleItem(sinItemData){
  /*
    抓取 sinItemData 節點上的資料。
    若你的sinItemData資料欄位中並沒有使用者名稱，請再到user節點存取使用者名稱
    資料齊全後塞進item中，創建 Item 物件，並顯示到頁面上。
  */

  firebase.database().ref().once("",function () {
    $("#items").append();

      /*
        用 ViewModal 填入這筆 item 的資料
        呼叫 ViewModal callImage打開圖片
        創建一個 MessageBox 物件，將 Message 的結構顯示上 #message 裡。
      */
      viewModal.writeData(sinItem);
      viewModal.callImage(itemKey,sellerKey);
      viewModal.editData();

      $("#message").append();

      /*
        判斷使用者是否有登入，如果有登入就讓 #message 容器顯示輸入框。
        在 MessageBox 上面註冊事件，當 submit 時將資料上傳。
      */
      if (currentUser) {
        $("#message").append(messBox.inputBox);

        messBox.inputBox.keypress(function (e) {
          if (e.which == 13) {
            e.preventDefault();

            /*
            取得input的內容 $(this).find("#dialog").val();
            清空input的內容 $(this).find("#dialog").val("");
            */
          }
        });
      }

    /*
    從資料庫中抓出message資料，並將資料填入MessageBox
    */
      firebase.database().ref().orderBy.("",function(data) {

      });
    });

    /*
    如果使用者有登入，替 editBtn 監聽事件，當使用者點選編輯按鈕時，將資料顯示上 uploadModal。
    */

  })
}

function generateDialog(diaData, messageBox) {


}
