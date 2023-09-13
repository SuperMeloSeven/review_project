// 单文件上传
const uploadFileEle = document.querySelector("#uploadFile");

const request = axios.create({
  baseURL: "http://localhost:3000/upload",
  timeout: 60000,
});

async function uploadFile() {
  if (!uploadFileEle.files.length) return;
  const file = uploadFileEle.files[0]; // 获取单个文件
  // 省略文件的校验过程，比如文件类型、大小校验
  upload({
    url: "/single",
    file,
  });
}

function upload({ url, file, fieldName = "file" }) {
  let formData = new FormData();
  formData.set(fieldName, file);
  request.post(url, formData, {
    // 监听上传进度
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  });
}
